import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Route,
  Security,
  Tags,
  Request,
} from "tsoa";
import { Request as ExRequest } from "express";
import {
  findOrCreateFromOidc,
  getByAuth0Id,
  updateUser,
} from "../services/users.service";

export interface UserDto {
  id: string;
  auth0Id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface UpdateUserBody {
  name?: string;
  email?: string;
}

@Route("api/users")
@Tags("Users")
export class UsersController extends Controller {
  /** Sync / create the user from the Auth0 session. No DB user required yet. */
  @Post("me")
  public async sync(@Request() req: ExRequest): Promise<UserDto> {
    const oidcUser = req.oidc.user;
    if (!oidcUser?.sub) {
      this.setStatus(401);
      throw { status: 401, message: "Unauthorized" };
    }
    const user = await findOrCreateFromOidc({
      sub: oidcUser.sub,
      email: oidcUser.email,
      name: oidcUser.name,
    });
    return user as unknown as UserDto;
  }

  @Get("me")
  @Security("sessionCookie")
  public async getMe(@Request() req: ExRequest): Promise<UserDto> {
    return req.dbUser as unknown as UserDto;
  }

  @Put("me")
  @Security("sessionCookie")
  public async updateMe(
    @Body() body: UpdateUserBody,
    @Request() req: ExRequest
  ): Promise<UserDto> {
    const user = await updateUser(req.dbUser!.auth0Id, body);
    if (!user) {
      this.setStatus(404);
      throw { status: 404, message: "User not found. Call POST /me first." };
    }
    return user as unknown as UserDto;
  }
}

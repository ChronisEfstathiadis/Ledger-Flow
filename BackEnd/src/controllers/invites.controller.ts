import {
  Controller,
  Get,
  Path,
  Post,
  Route,
  Security,
  Tags,
  Request,
} from "tsoa";
import { Request as ExRequest } from "express";
import {
  acceptInvite,
  rejectInvite,
  listInvitesForEmail,
} from "../services/wallet-invites.service";
import {
  WalletInviteDto,
  WalletMemberLinkDto,
} from "../dto/wallet-invites.dto";

@Route("api/invites")
@Tags("Invites")
@Security("sessionCookie")
export class InvitesController extends Controller {
  @Get("mine")
  public async listMyInvites(
    @Request() req: ExRequest
  ): Promise<WalletInviteDto[]> {
    const invites = await listInvitesForEmail(req.dbUser!.email);
    return invites as unknown as WalletInviteDto[];
  }

  @Post("{token}/accept")
  public async acceptWalletInvite(
    @Path() token: string,
    @Request() req: ExRequest
  ): Promise<WalletMemberLinkDto> {
    const member = await acceptInvite(token, req.dbUser!.id, req.dbUser!.email);
    return member as unknown as WalletMemberLinkDto;
  }

  @Post("{token}/decline")
  public async declineWalletInvite(
    @Path() token: string,
    @Request() req: ExRequest
  ): Promise<void> {
    await rejectInvite(token, req.dbUser!.id, req.dbUser!.email);
    this.setStatus(204);
  }
}

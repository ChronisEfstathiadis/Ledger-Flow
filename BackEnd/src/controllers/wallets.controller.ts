import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Security,
  Tags,
  Request,
} from "tsoa";
import { Request as ExRequest } from "express";
import {
  createWallet,
  getWalletById,
  updateWallet,
  deleteWallet,
  getAllWalletsByUserId,
} from "../services/wallets.service";
import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { usersToWallets } from "../db/schemas/users-to-wallets";

export interface WalletDto {
  id: string;
  name: string;
  currency: string;
  createdAt: string;
}

export interface CreateWalletBody {
  name: string;
  currency: string;
}

export type UpdateWalletBody = Partial<CreateWalletBody>;

async function assertWalletAccess(userId: string, walletId: string) {
  const link = await db.query.usersToWallets.findFirst({
    where: and(
      eq(usersToWallets.userId, userId),
      eq(usersToWallets.walletId, walletId)
    ),
  });
  if (!link) {
    throw { status: 403, message: "User does not have access to this wallet" };
  }
}

@Route("api/wallets")
@Tags("Wallets")
@Security("sessionCookie")
export class WalletsController extends Controller {
  @Post()
  public async create(
    @Body() body: CreateWalletBody,
    @Request() req: ExRequest
  ): Promise<WalletDto> {
    const [wallet] = await createWallet(body);
    this.setStatus(201);
    return wallet as unknown as WalletDto;
  }

  @Get("{walletId}")
  public async getById(
    @Path() walletId: string,
    @Request() req: ExRequest
  ): Promise<WalletDto> {
    await assertWalletAccess(req.dbUser!.id, walletId);
    const wallet = await getWalletById(walletId);
    if (!wallet) {
      this.setStatus(404);
      throw { status: 404, message: "Wallet not found" };
    }
    return wallet as unknown as WalletDto;
  }

  @Put("{walletId}")
  public async update(
    @Path() walletId: string,
    @Body() body: UpdateWalletBody,
    @Request() req: ExRequest
  ): Promise<WalletDto> {
    await assertWalletAccess(req.dbUser!.id, walletId);
    const [wallet] = await updateWallet(walletId, body as any);
    return wallet as unknown as WalletDto;
  }

  @Delete("{walletId}")
  public async remove(
    @Path() walletId: string,
    @Request() req: ExRequest
  ): Promise<WalletDto> {
    await assertWalletAccess(req.dbUser!.id, walletId);
    const [wallet] = await deleteWallet(walletId);
    return wallet as unknown as WalletDto;
  }

  @Get()
  public async list(@Request() req: ExRequest): Promise<WalletDto[]> {
    return (await getAllWalletsByUserId(
      req.dbUser!.id
    )) as unknown as WalletDto[];
  }
}

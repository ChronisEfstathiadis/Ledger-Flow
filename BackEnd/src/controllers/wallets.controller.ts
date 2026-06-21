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
import { assertWalletAccess } from "../services/wallet-access.service";
import { WalletDto, CreateWalletBody } from "../dto/wallets.dto";

export type UpdateWalletBody = Partial<CreateWalletBody>;

@Route("api/wallets")
@Tags("Wallets")
@Security("sessionCookie")
export class WalletsController extends Controller {
  @Post()
  public async create(
    @Body() body: CreateWalletBody,
    @Request() req: ExRequest
  ): Promise<WalletDto> {
    const wallet = await createWallet(req.dbUser!.id, body);
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

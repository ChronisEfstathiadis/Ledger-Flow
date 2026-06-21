import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Route,
  Security,
  Tags,
  Request,
} from "tsoa";
import { Request as ExRequest } from "express";
import { listMembers, removeMember } from "../services/wallet-members.service";
import {
  createInvite,
  listPendingInvitesForWallet,
  revokeInvite,
} from "../services/wallet-invites.service";
import {
  assertWalletAccess,
  assertWalletOwner,
} from "../services/wallet-access.service";
import {
  WalletInviteDto,
  CreateInviteBody,
  WalletMemberDto,
} from "../dto/wallet-invites.dto";

@Route("api/wallets/{walletId}")
@Tags("Wallet Members")
@Security("sessionCookie")
export class WalletMembersController extends Controller {
  @Get("members")
  public async listMembers(
    @Path() walletId: string,
    @Request() req: ExRequest
  ): Promise<WalletMemberDto[]> {
    await assertWalletAccess(req.dbUser!.id, walletId);
    const members = await listMembers(walletId);
    return members as unknown as WalletMemberDto[];
  }

  @Post("invites")
  public async createWalletInvite(
    @Path() walletId: string,
    @Body() body: CreateInviteBody,
    @Request() req: ExRequest
  ): Promise<WalletInviteDto> {
    await assertWalletOwner(req.dbUser!.id, walletId);
    const invite = await createInvite(
      walletId,
      req.dbUser!.id,
      body.inviteeEmail
    );
    this.setStatus(201);
    return invite as unknown as WalletInviteDto;
  }

  @Get("invites")
  public async listWalletInvites(
    @Path() walletId: string,
    @Request() req: ExRequest
  ): Promise<WalletInviteDto[]> {
    await assertWalletOwner(req.dbUser!.id, walletId);
    const invites = await listPendingInvitesForWallet(walletId);
    return invites as unknown as WalletInviteDto[];
  }

  @Delete("invites/{inviteId}")
  public async revokeWalletInvite(
    @Path() walletId: string,
    @Path() inviteId: string,
    @Request() req: ExRequest
  ): Promise<void> {
    await assertWalletOwner(req.dbUser!.id, walletId);
    await revokeInvite(walletId, inviteId);
    this.setStatus(204);
  }

  @Delete("members/{userId}")
  public async removeWalletMember(
    @Path() walletId: string,
    @Path() userId: string,
    @Request() req: ExRequest
  ): Promise<void> {
    await assertWalletOwner(req.dbUser!.id, walletId);

    if (userId === req.dbUser!.id) {
      throw {
        status: 400,
        message: "You cannot remove yourself from the wallet",
      };
    }

    await removeMember(walletId, userId);
    this.setStatus(204);
  }
}

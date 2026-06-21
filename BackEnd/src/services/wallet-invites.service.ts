import { countMembers } from "./wallet-members.service";
import { findByEmail } from "./users.service";
import { db } from "../db";
import { walletInvites } from "../db/schemas/wallet-invites";
import { and, eq } from "drizzle-orm";
import { wallets } from "../db/schemas/wallets";
import { usersToWallets } from "../db/schemas/users-to-wallets";

export async function createInvite(
  walletId: string,
  inviterId: string,
  inviteeEmail: string
) {
  const user = await findByEmail(inviteeEmail);
  if (!user) {
    throw new Error("User not found");
  }
  if ((await countMembers(walletId))[0].count === 2) {
    throw new Error("Wallet already has 2 members");
  }
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const status = "pending";
  const [invite] = await db
    .insert(walletInvites)
    .values({
      walletId,
      inviterId,
      inviteeEmail,
      token,
      expiresAt,
      status,
    })
    .returning();
  return invite;
}

export async function assertInviteValid(token: string) {
  const invite = await db.query.walletInvites.findFirst({
    where: eq(walletInvites.token, token),
  });

  if (!invite) {
    throw { status: 404, message: "Invite not found" };
  }

  if (new Date() > invite.expiresAt) {
    await db
      .update(walletInvites)
      .set({ status: "expired" })
      .where(eq(walletInvites.id, invite.id));
    throw { status: 410, message: "Invite expired" };
  }

  if (invite.status === "expired") {
    throw { status: 410, message: "Invite expired" };
  }

  if (invite.status !== "pending") {
    throw { status: 409, message: `Invite already ${invite.status}` };
  }

  return invite;
}

export async function listPendingInvitesForWallet(walletId: string) {
  return await db
    .select()
    .from(walletInvites)
    .where(
      and(
        eq(walletInvites.walletId, walletId),
        eq(walletInvites.status, "pending")
      )
    );
}

export async function listInvitesForEmail(email: string) {
  return await db
    .select()
    .from(walletInvites)
    .where(eq(walletInvites.inviteeEmail, email));
}
export async function revokeInvite(walletId: string, inviteId: string) {
  return await db
    .update(walletInvites)
    .set({ status: "revoked" })
    .where(
      and(eq(walletInvites.walletId, walletId), eq(walletInvites.id, inviteId))
    );
}

export async function acceptInvite(
  token: string,
  userId: string,
  userEmail: string
) {
  const invite = await assertInviteValid(token);
  if (invite.inviteeEmail !== userEmail) {
    throw { status: 403, message: "Invitee email does not match" };
  }
  const user = await findByEmail(userEmail);
  if (!user) {
    throw { status: 404, message: "User not found" };
  }
  const [member] = await db
    .insert(usersToWallets)
    .values({
      walletId: invite.walletId,
      userId: userId,
      role: "member",
    })
    .returning();
  await db
    .update(walletInvites)
    .set({ status: "accepted" })
    .where(eq(walletInvites.id, invite.id));
  return member;
}

export async function rejectInvite(
  token: string,
  userId: string,
  userEmail: string
) {
  const invite = await assertInviteValid(token);
  if (invite.inviteeEmail !== userEmail) {
    throw { status: 403, message: "Invitee email does not match" };
  }
  const user = await findByEmail(userEmail);
  if (!user) {
    throw { status: 404, message: "User not found" };
  }
  await db
    .update(walletInvites)
    .set({ status: "rejected" })
    .where(eq(walletInvites.id, invite.id));
  return invite;
}

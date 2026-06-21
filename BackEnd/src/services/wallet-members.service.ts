import { db } from "../db";
import { usersToWallets } from "../db/schemas/users-to-wallets";
import { users } from "../db/schemas/users";
import { and, count, eq } from "drizzle-orm";

export async function listMembers(walletId: string) {
  return await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: usersToWallets.role,
    })
    .from(users)
    .leftJoin(usersToWallets, eq(usersToWallets.userId, users.id))
    .where(eq(usersToWallets.walletId, walletId));
}

export async function removeMember(walletId: string, userId: string) {
  return await db
    .delete(usersToWallets)
    .where(
      and(
        eq(usersToWallets.walletId, walletId),
        eq(usersToWallets.userId, userId)
      )
    );
}

export async function countMembers(walletId: string) {
  return await db
    .select({ count: count() })
    .from(usersToWallets)
    .where(eq(usersToWallets.walletId, walletId));
}

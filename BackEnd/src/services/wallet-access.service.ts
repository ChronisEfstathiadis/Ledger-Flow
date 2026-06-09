import { usersToWallets } from "../db/schemas/users-to-wallets";
import { and, eq } from "drizzle-orm";
import { db } from "../db";

export async function assertWalletAccess(userId: string, walletId: string) {
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

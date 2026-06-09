import { db } from "../db";
import { wallets } from "../db/schemas/wallets";
import { and, eq } from "drizzle-orm";
import { usersToWallets } from "../db/schemas/users-to-wallets";

const walletColumns = {
  id: wallets.id,
  name: wallets.name,
  currency: wallets.currency,
  createdAt: wallets.createdAt,
};

export async function getWalletById(id: string) {
  return db.query.wallets.findFirst({
    where: eq(wallets.id, id),
  });
}
export async function createWallet(
  userId: string,
  data: { name: string; currency: string }
) {
  return db.transaction(async (tx) => {
    const [wallet] = await tx
      .insert(wallets)
      .values(data)
      .returning(walletColumns);
    await tx.insert(usersToWallets).values({
      userId,
      walletId: wallet.id,
      role: "owner",
    });
    return wallet;
  });
}
export async function updateWallet(
  id: string,
  wallet: typeof wallets.$inferInsert
) {
  return db.update(wallets).set(wallet).where(eq(wallets.id, id)).returning({
    id: wallets.id,
    name: wallets.name,
    currency: wallets.currency,
    createdAt: wallets.createdAt,
  });
}
export async function deleteWallet(id: string) {
  return db.delete(wallets).where(eq(wallets.id, id)).returning({
    id: wallets.id,
    name: wallets.name,
    currency: wallets.currency,
    createdAt: wallets.createdAt,
  });
}

export async function getAllWalletsByUserId(userId: string) {
  const rows = await db
    .select({ wallet: wallets })
    .from(wallets)
    .innerJoin(usersToWallets, eq(wallets.id, usersToWallets.walletId))
    .where(eq(usersToWallets.userId, userId));
  return rows.map((r) => r.wallet);
}

import { db } from "../db";
import { wallets } from "../db/schemas/wallets";
import { eq } from "drizzle-orm";
import { usersToWallets } from "../db/schemas/users-to-wallets";

export async function getWalletById(id: string) {
  return db.query.wallets.findFirst({
    where: eq(wallets.id, id),
  });
}
export async function createWallet(wallet: typeof wallets.$inferInsert) {
  return db.insert(wallets).values(wallet).returning({
    id: wallets.id,
    name: wallets.name,
    currency: wallets.currency,
    createdAt: wallets.createdAt,
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
  return db.query.wallets.findMany({
    where: eq(usersToWallets.userId, userId),
  });
}

import { Request, Response, NextFunction } from "express";
import { getWalletById } from "../services/wallets.service";
import { and, eq } from "drizzle-orm";
import { usersToWallets } from "../db/schemas/users-to-wallets";
import { db } from "../db";

export const requireWalletAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.dbUser) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const walletId = req.params.walletId;
  if (!walletId) {
    return res.status(400).json({ error: "Wallet id is required" });
  }

  const wallet = await getWalletById(walletId as string);
  if (!wallet) {
    return res.status(404).json({ error: "Wallet not found" });
  }

  const link = await db.query.usersToWallets.findFirst({
    where: and(
      eq(usersToWallets.userId, req.dbUser.id),
      eq(usersToWallets.walletId, walletId as string)
    ),
  });

  if (!link) {
    return res
      .status(403)
      .json({ error: "User does not have access to this wallet" });
  }

  next();
};

import { Router } from "express";
import { requireUser } from "../../middleware/require-user";
import {
  createWalletController,
  getWalletByIdController,
  updateWalletController,
  deleteWalletController,
  getAllWalletsByUserIdController,
} from "../../controllers/wallets.controller";
import { requireWalletAccess } from "../../middleware/require-wallet-access";

const router = Router();

router.post("/", requireUser, requireWalletAccess, createWalletController);
router.get(
  "/:walletId",
  requireUser,
  requireWalletAccess,
  getWalletByIdController
);
router.put(
  "/:walletId",
  requireUser,
  requireWalletAccess,
  updateWalletController
);
router.delete(
  "/:walletId",
  requireUser,
  requireWalletAccess,
  deleteWalletController
);
router.get(
  "/",
  requireUser,
  requireWalletAccess,
  getAllWalletsByUserIdController
);
export default router;

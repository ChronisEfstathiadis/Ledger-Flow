import { Router } from "express";
import { checkSession } from "../middleware/auth";
import {
  getUser,
  syncUser,
  updateUserController,
} from "../controllers/users.controller";
import { requireUser } from "../middleware/require-user";

const router = Router();

router.post("/me", checkSession, syncUser);
router.get("/me", checkSession, requireUser, getUser);
router.put("/me", checkSession, requireUser, updateUserController);
export default router;

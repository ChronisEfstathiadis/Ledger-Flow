import { Router } from "express";
import { checkSession } from "../middleware/auth";
import {
  getUser,
  syncUser,
  updateUserController,
} from "../controllers/users.controller";

const router = Router();

router.post("/me", checkSession, syncUser);
router.get("/me", checkSession, getUser);
router.put("/me", checkSession, updateUserController);
export default router;

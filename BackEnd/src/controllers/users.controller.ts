import { Request, Response } from "express";
import {
  findOrCreateFromOidc,
  getByAuth0Id,
  updateUser,
} from "../services/users.service";

export const syncUser = async (req: Request, res: Response) => {
  const oidcUser = req.oidc.user;
  if (!oidcUser?.sub) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await findOrCreateFromOidc({
    sub: oidcUser.sub,
    email: oidcUser.email,
    name: oidcUser.name,
  });

  res.json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const oidcUser = req.oidc.user;
  if (!oidcUser?.sub) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await getByAuth0Id(oidcUser.sub);
  if (!user) {
    return res
      .status(404)
      .json({ error: "User not found. Call POST /me first." });
  }

  res.json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const oidcUser = req.oidc.user;
  if (!oidcUser?.sub) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await updateUser(oidcUser.sub, req.body);
  if (!user) {
    return res
      .status(404)
      .json({ error: "User not found. Call POST /me first." });
  }

  res.json(user);
};

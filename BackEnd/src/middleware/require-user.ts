import { Request, Response, NextFunction } from "express";
import { getByAuth0Id } from "../services/users.service";

export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  req.oidc.user = user;
  next();
};

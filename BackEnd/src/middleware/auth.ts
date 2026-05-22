import { Request, Response, NextFunction } from "express";

export const checkSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

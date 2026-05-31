import { Request } from "express";
import { getByAuth0Id } from "../services/users.service";
import { users } from "../db/schemas/users";

export async function expressAuthentication(
  req: Request,
  securityName: string,
  _scopes?: string[]
): Promise<typeof users.$inferSelect> {
  if (securityName !== "sessionCookie") {
    throw { status: 401, message: "Unsupported security scheme" };
  }

  if (!req.oidc?.isAuthenticated?.() || !req.oidc.user?.sub) {
    throw { status: 401, message: "Unauthorized" };
  }

  const dbUser = await getByAuth0Id(req.oidc.user.sub);
  if (!dbUser) {
    throw { status: 404, message: "User not found. Call POST /me first." };
  }

  req.dbUser = dbUser;
  return dbUser;
}

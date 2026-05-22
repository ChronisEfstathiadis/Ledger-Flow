import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schemas/users";
import { checkSession } from "../middleware/auth";

const router = Router();

router.post("/me", checkSession, async (req, res) => {
  const oidcUser = req.oidc.user;
  if (!oidcUser) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const sub = oidcUser.sub;
  const email = oidcUser.email ?? `${sub}@no-email.local`;
  const name = oidcUser.name ?? "Unnamed";

  let user = await db.query.users.findFirst({
    where: eq(users.auth0Id, sub),
  });

  if (!user) {
    [user] = await db
      .insert(users)
      .values({ auth0Id: sub, email, name })
      .returning();
  }

  res.json(user);
});

export default router;

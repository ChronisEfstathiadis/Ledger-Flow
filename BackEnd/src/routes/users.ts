import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schemas/users";
import { checkJwt } from "../middleware/auth";

const router = Router();

router.post("/me", checkJwt, async (req, res) => {
  const payload = req.auth!.payload;
  const sub = payload.sub as string;
  const namespace = "https://ledgerflow/";
  const email =
    (payload[`${namespace}email`] as string) ?? `${sub}@no-email.local`;
  const name = (payload[`${namespace}name`] as string) ?? "Unnamed";

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

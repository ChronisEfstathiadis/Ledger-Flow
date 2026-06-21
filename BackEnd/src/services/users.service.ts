import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schemas/users";

export type OidcProfile = {
  sub: string;
  email?: string;
  name?: string;
};

export async function findByAuth0Id(auth0Id: string) {
  return db.query.users.findFirst({
    where: eq(users.auth0Id, auth0Id),
  });
}

export async function findOrCreateFromOidc(oidcUser: OidcProfile) {
  const auth0Id = oidcUser.sub;
  const email = oidcUser.email ?? `${auth0Id}@no-email.local`;
  const name = oidcUser.name ?? "Unnamed";

  const existing = await findByAuth0Id(auth0Id);
  if (existing) return existing;

  const [created] = await db
    .insert(users)
    .values({ auth0Id, email, name })
    .returning();

  return created;
}

export async function getByAuth0Id(auth0Id: string) {
  return await findByAuth0Id(auth0Id);
}

export async function updateUser(
  auth0Id: string,
  data: Partial<typeof users.$inferSelect>
) {
  const [updated] = await db
    .update(users)
    .set(data)
    .where(eq(users.auth0Id, auth0Id))
    .returning();
  return updated;
}

export async function findByEmail(email: string) {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

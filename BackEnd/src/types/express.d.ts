import type { users } from "../db/schemas/users";

declare global {
  namespace Express {
    interface Request {
      dbUser?: typeof users.$inferSelect;
    }
  }
}

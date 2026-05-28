import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const wallets = pgTable("wallets", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  currency: text("currency").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

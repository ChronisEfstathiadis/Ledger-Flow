import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { SplitEnum } from "./enums";

export const wallets = pgTable("wallets", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  currency: text("currency").notNull(),
  isShared: boolean("is_shared").notNull().default(false),
  splitMode: SplitEnum("split_mode").notNull().default("none"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

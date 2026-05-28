import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { wallets } from "./wallets";

export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  isDefault: boolean("is_default").notNull().default(true),
  walletId: text("wallet_id")
    .references(() => wallets.id)
    .notNull(),
});

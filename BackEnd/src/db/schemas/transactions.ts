import { pgTable, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { wallets } from "./wallets";
import { categories } from "./categories";
import { users } from "./users";
import { TemplateTypeEnum } from "./enums";

export const transactions = pgTable("transactions", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  walletId: text("wallet_id")
    .references(() => wallets.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: text("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
  creatorId: text("creator_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  amount: numeric("amount").notNull(),
  type: TemplateTypeEnum("type").notNull(),
  description: text("description"),
  transactionDate: timestamp("transaction_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

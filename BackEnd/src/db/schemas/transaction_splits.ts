import { pgTable, text, numeric } from "drizzle-orm/pg-core";
import { users } from "./users";
import { transactions } from "./transactions";
import { sql } from "drizzle-orm";

export const transactionSplits = pgTable("transaction_splits", {
  transaction_id: text("transaction_id")
    .notNull()
    .references(() => transactions.id),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  owed_amount: numeric("owed_amount").notNull(),
});

import { pgTable, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { wallets } from "./wallets";
import { users } from "./users";

export const settlements = pgTable("settlements", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  walletId: text("wallet_id")
    .notNull()
    .references(() => wallets.id, { onDelete: "cascade" }),
  payerId: text("payer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  payeeId: text("payee_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  amount: numeric("amount").notNull(),
  settledAt: timestamp("settled_at").notNull().defaultNow(),
});

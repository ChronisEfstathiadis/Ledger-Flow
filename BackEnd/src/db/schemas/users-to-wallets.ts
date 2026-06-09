import { pgTable, text, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { wallets } from "./wallets";

export const usersToWallets = pgTable(
  "users_to_wallets",
  {
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    walletId: text("wallet_id")
      .references(() => wallets.id, { onDelete: "cascade" })
      .notNull(),
    role: text("role").notNull().default("owner"),
  },
  (t) => [primaryKey({ columns: [t.userId, t.walletId] })]
);

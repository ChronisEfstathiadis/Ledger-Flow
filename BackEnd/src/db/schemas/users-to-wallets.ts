import { pgTable, text, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { wallets } from "./wallets";

export const usersToWallets = pgTable(
  "users_to_wallets",
  {
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
    walletId: text("wallet_id")
      .references(() => wallets.id)
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.walletId] })]
);

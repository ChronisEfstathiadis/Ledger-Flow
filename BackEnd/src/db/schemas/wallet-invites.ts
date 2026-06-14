import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { wallets } from "./wallets";
import { users } from "./users";
import { WalletInviteStatusEnum } from "./enums";

export const walletInvites = pgTable(
  "wallet_invites",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    walletId: text("wallet_id")
      .notNull()
      .references(() => wallets.id, { onDelete: "cascade" }),
    inviterId: text("inviter_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    inviteeEmail: text("invitee_email").notNull(),
    token: text("token").notNull().unique(),
    status: WalletInviteStatusEnum("status").notNull().default("pending"),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("wallet_invites_wallet_email_pending")
      .on(t.walletId, t.inviteeEmail)
      .where(sql`${t.status} = 'pending'`),
  ]
);

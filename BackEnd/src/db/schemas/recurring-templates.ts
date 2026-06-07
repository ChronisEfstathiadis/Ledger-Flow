import {
  pgTable,
  text,
  integer,
  numeric,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { wallets } from "./wallets";
import { categories } from "./categories";
import { TemplateTypeEnum } from "./enums";

export const recurringTemplates = pgTable("recurring_templates", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  walletId: text("wallet_id")
    .references(() => wallets.id, { onDelete: "cascade" })
    .notNull(),
  amount: numeric("amount").notNull(),
  type: TemplateTypeEnum("type").notNull(),
  categoryId: text("category_id").references(() => categories.id),
  frequency: text("frequency").notNull().default("monthly"),
  day_of_month: integer("day_of_month").notNull().default(1),
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date"),
});

import { pgEnum } from "drizzle-orm/pg-core";

export const TemplateTypeEnum = pgEnum("template_type", ["income", "expense"]);
export const SplitEnum = pgEnum("split_mode", ["equal", "none"]);
export const WallerRoleEnum = pgEnum("role", ["owner", "member"]);
export const WalletInviteStatusEnum = pgEnum("status", [
  "pending",
  "accepted",
  "rejected",
  "expired",
]);

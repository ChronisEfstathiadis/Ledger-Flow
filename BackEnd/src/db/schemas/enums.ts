import { pgEnum } from "drizzle-orm/pg-core";

export const TemplateTypeEnum = pgEnum("template_type", ["income", "expense"]);

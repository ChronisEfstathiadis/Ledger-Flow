ALTER TABLE "categories" DROP CONSTRAINT "categories_wallet_id_wallets_id_fk";
--> statement-breakpoint
ALTER TABLE "recurring_templates" DROP CONSTRAINT "recurring_templates_wallet_id_wallets_id_fk";
--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recurring_templates" ADD CONSTRAINT "recurring_templates_wallet_id_wallets_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "public"."wallets"("id") ON DELETE cascade ON UPDATE no action;
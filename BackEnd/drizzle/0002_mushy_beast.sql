/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'users_to_wallets'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "users_to_wallets" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "users_to_wallets" ADD CONSTRAINT "users_to_wallets_user_id_wallet_id_pk" PRIMARY KEY("user_id","wallet_id");
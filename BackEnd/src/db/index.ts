import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schemas/index";

export const db = drizzle(process.env.DATABASE_URL!, { schema });

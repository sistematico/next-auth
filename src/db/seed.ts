import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { users } from "./schema";

const db = drizzle(process.env.DB_FILE_NAME!);

async function main() {
  const password = "hashed_password_example";

  const user: typeof users.$inferInsert = {
    name: "John",
    email: "john@example.com",
    password,
  };

  await db.insert(users).values(user).onConflictDoNothing();
}

main();

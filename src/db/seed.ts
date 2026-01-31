import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { users } from "./schema";
import { generateSalt, hashPassword } from "../lib/password";

const db = drizzle(process.env.DB_FILE_NAME!);

async function main() {
  // Criar usuário admin de exemplo
  const adminSalt = generateSalt();
  const adminPassword = await hashPassword("admin123", adminSalt);

  const adminUser: typeof users.$inferInsert = {
    name: "Admin",
    email: "admin@example.com",
    password: adminPassword,
    salt: adminSalt,
    role: "admin",
  };

  // Criar usuário comum de exemplo
  const userSalt = generateSalt();
  const userPassword = await hashPassword("user123", userSalt);

  const normalUser: typeof users.$inferInsert = {
    name: "John",
    email: "john@example.com",
    password: userPassword,
    salt: userSalt,
    role: "user",
  };

  await db.insert(users).values([adminUser, normalUser]).onConflictDoNothing();
  
  console.log("✅ Seed completo!");
  console.log("Admin: admin@example.com / admin123");
  console.log("User: john@example.com / user123");
}

main();

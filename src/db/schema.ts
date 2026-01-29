import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text(),
  salt: text(),
  role: text().notNull().default("user"),
  createdAt: int({ mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: int({ mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => new Date()),
});

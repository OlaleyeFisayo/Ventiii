import {
  int,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const event = sqliteTable("event", {
  id: int().primaryKey({
    autoIncrement: true,
  }),
  name: text().notNull(),
});

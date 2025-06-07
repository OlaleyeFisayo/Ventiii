import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const event = sqliteTable("event", {
  id: text().primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
  startDate: text().notNull(),
  endDate: text(),
  startTime: text().notNull(),
  endTime: text(),
  location: text().notNull(),
  coverPictureUrl: text().notNull(),
  createdAt: integer({
    mode: "timestamp",
  })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer({
    mode: "timestamp",
  })
    .$defaultFn(() => new Date())
    .notNull(),
});

import {
  int,
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
  createdAt: int(
  )
    .$default(() => Date.now())
    .notNull(),
  updatedAt: int(
  )
    .$default(() => Date.now())
    .$onUpdate(() => Date.now())
    .notNull(),
});

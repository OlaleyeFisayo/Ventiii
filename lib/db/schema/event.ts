import {
  int,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import {
  user,
} from "./auth";

export const event = sqliteTable("event", {
  id: text().primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
  startDate: text().notNull(),
  endDate: text().notNull(),
  startTime: text().notNull(),
  endTime: text().notNull(),
  location: text().notNull(),
  coverPictureUrl: text().notNull(),
  userId: int().notNull().references(() => user.id),
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

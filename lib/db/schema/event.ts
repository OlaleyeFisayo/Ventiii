import {
  int,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
} from "drizzle-zod";
import {
  z,
} from "zod/v4";

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

export const InsertEvent = createInsertSchema(event, {
  title: z.string().min(1),
  description: z.string().min(1),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  startTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  endTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  location: z.string().min(1),
  coverPictureUrl: z.url(),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertEvent = z.infer<typeof InsertEvent>;

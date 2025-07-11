import {
  relations,
} from "drizzle-orm";
import {
  int,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import {
  event,
} from "./event";

export const speaker = sqliteTable(
  "speaker",
  {
    id: int().primaryKey({
      autoIncrement: true,
    }),
    eventId: int().notNull().references(
      () => event.id,
      {
        onDelete: "cascade",
      },
    ),
    name: text().notNull(),
    title: text(),
    company: text(),
    bio: text(),
    image: text().notNull(),
    socialLinks: text({
      mode: "json",
    }).$type<Record<string, string>>(),
    createdAt: int()
      .$default(() => Date.now())
      .notNull(),
    updatedAt: int()
      .$default(() => Date.now())
      .$onUpdate(() => Date.now())
      .notNull(),
  },
);

export const speakerRelations = relations(
  speaker,
  ({
    one,
  }) => ({
    event: one(
      event,
      {
        fields: [speaker.eventId],
        references: [event.id],
      },
    ),
  }),
);

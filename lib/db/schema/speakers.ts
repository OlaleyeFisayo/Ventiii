import {
  relations,
} from "drizzle-orm";
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
  event,
} from "./event";

export const speaker = sqliteTable(
  "speaker",
  {
    id: int().primaryKey({
      autoIncrement: true,
    }),
    eventId: text().notNull().references(
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

export const InsertSpeaker = createInsertSchema(
  speaker,
  {
    name: z.string().min(1).transform((val) => {
      return val.trim();
    }),
    title: z.optional(z.string().transform((val) => {
      return val.trim();
    })),
    company: z.optional(z.string().transform((val) => {
      return val.trim();
    })),
    bio: z.optional(z.string().transform((val) => {
      return val.trim();
    })),
    image: z.url(),
  },
).omit({
  id: true,
  eventId: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateSpeaker = createInsertSchema(
  speaker,
  {
    name: z.optional(z.string().min(1).transform((val) => {
      return val.trim();
    })),
    title: z.optional(z.string().transform((val) => {
      return val.trim();
    })),
    company: z.optional(z.string().transform((val) => {
      return val.trim();
    })),
    bio: z.optional(z.string().transform((val) => {
      return val.trim();
    })),
    image: z.optional(z.url()),
  },
).omit({
  id: true,
  eventId: true,
  createdAt: true,
  updatedAt: true,
});

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

export type InsertSpeaker = z.infer<typeof InsertSpeaker>;
export type UpdateSpeaker = z.infer<typeof UpdateSpeaker>;

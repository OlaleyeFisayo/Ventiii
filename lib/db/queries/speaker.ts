import {
  eq,
} from "drizzle-orm";

import type {
  InsertSpeaker,
} from "../schema";

import db from "..";
import {
  speaker,
} from "../schema";

export async function createSpeaker(
  data: InsertSpeaker,
  eventId: string,
) {
  const created = await db.insert(speaker).values({
    ...data,
    eventId,
  }).returning();

  return created;
}

export async function getSpeakers(eventId: string) {
  const result = await db.query.speaker.findMany({
    where: eq(
      speaker.eventId,
      eventId,
    ),
  });

  return result;
}

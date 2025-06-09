import {
  eq,
} from "drizzle-orm";

import type {
  InsertEvent,
} from "../schema";

import db from "..";
import {
  event,
} from "../schema";

export async function createEvent(data: InsertEvent, id: string, userId: number) {
  const created = await db.insert(event).values({
    ...data,
    id,
    userId,
  });

  return created;
}

export async function getEvents(userId: number) {
  return await db.query.event.findMany({
    columns: {
      id: true,
      coverPictureUrl: true,
      title: true,
      startDate: true,
      endDate: true,
    },
    where: eq(event.userId, userId),
  });
}

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

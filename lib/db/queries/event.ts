import {
  and,
  asc,
  desc,
  eq,
  gte,
  lt,
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

export async function getEvents(userId: number, filter: GetEventFilterOptions = "all") {
  const now = new Date();

  // Build conditions array and combine them
  const conditions = [eq(event.userId, userId)];

  if (filter === "upcoming") {
    conditions.push(gte(event.endDate, now));
  }
  else if (filter === "past") {
    conditions.push(lt(event.endDate, now));
  }

  const whereCondition = conditions.length > 1 ? and(...conditions) : conditions[0];

  let orderBy;
  if (filter === "upcoming") {
    orderBy = asc(event.startDate);
  }
  else if (filter === "past") {
    orderBy = desc(event.endDate);
  }
  else {
    orderBy = asc(event.startDate);
  }

  return await db.query.event.findMany({
    columns: {
      id: true,
      coverPictureUrl: true,
      title: true,
      startDate: true,
      endDate: true,
    },
    where: whereCondition,
    orderBy,
  });
}

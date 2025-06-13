import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  like,
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

export async function getEvents(
  userId: number,
  filter: GetEventFilterOptions = "all",
  page: number = 1,
  limit: number = 10,
  searchQuery?: string,
) {
  const now = new Date();
  const offset = (page - 1) * limit;

  const conditions = [eq(event.userId, userId)];
  if (filter === "upcoming") {
    conditions.push(gte(event.endDate, now));
  }
  else if (filter === "past") {
    conditions.push(lt(event.endDate, now));
  }

  if (searchQuery && searchQuery.trim()) {
    const searchTerm = `%${searchQuery.trim()}%`;
    conditions.push(
      like(event.title, searchTerm),
    );
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

  const [events, totalCountResult] = await Promise.all([
    db.query.event.findMany({
      columns: {
        id: true,
        coverPictureUrl: true,
        title: true,
        startDate: true,
        endDate: true,
      },
      where: whereCondition,
      orderBy,
      limit,
      offset,
    }),

    db.select({
      count: count(),
    }).from(event).where(whereCondition),
  ]);

  const total = totalCountResult[0].count;

  return {
    events,
    pagination: {
      total,
    },
  };
}

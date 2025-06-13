import {
  getEvents,
} from "~/lib/db/queries/event";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const query = getQuery(event);
  const filter = query.filter as GetEventFilterOptions || "all";
  const page = Number.parseInt(query.page as string) || 1;
  const limit = Number.parseInt(query.limit as string) || 10;

  try {
    const result = await getEvents(
      event.context.user.id,
      filter,
      page,
      limit,
    );
    return result;
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch events",
    });
  }
});

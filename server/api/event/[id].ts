import {
  getEvent,
} from "~/lib/db/queries/event";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const eventId = event?.context?.params?.id;

  try {
    const result = await getEvent(eventId as string);
    return result;
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch event",
    });
  }
});

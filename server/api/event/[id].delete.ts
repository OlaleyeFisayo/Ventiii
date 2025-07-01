import {
  deleteEvent,
} from "~/lib/db/queries/event";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const eventId = event?.context?.params?.id;

  try {
    await deleteEvent(eventId as string);
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to Delete event, try again",
    });
  }
});

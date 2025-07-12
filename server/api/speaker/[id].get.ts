import {
  getSpeakers,
} from "~/lib/db/queries/speaker";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const eventId = event?.context?.params?.id;

  try {
    const result = await getSpeakers(eventId as string);
    return result;
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch speakers",
    });
  }
});

import {
  deleteSpeakers,
} from "~/lib/db/queries/speaker";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const eventId = event?.context?.params?.id;

  try {
    await deleteSpeakers(eventId as string);

    return {
      message: "Deleted Successfully",
    };
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to Delete speakers, try again",
    });
  }
});

import {
  deleteSpeaker,
} from "~/lib/db/queries/speaker";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const speakerId = event?.context?.params?.id;

  try {
    await deleteSpeaker(Number.parseInt(speakerId as string));
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to Delete speakers, try again",
    });
  }
});

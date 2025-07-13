import type {
  DrizzleError,
} from "drizzle-orm";

import {
  updateSpeaker,
} from "~/lib/db/queries/speaker";
import {
  UpdateSpeaker,
} from "~/lib/db/schema";
import {
  bodyValidator,
} from "~/utils/body-validator";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const speakerId = event?.context?.params?.id;
  const result = await bodyValidator(
    event,
    UpdateSpeaker.safeParse,
  );

  try {
    const data = await updateSpeaker(
      result.data,
      Number.parseInt(speakerId as string),
    );

    return {
      success: true,
      message: "Speaker Details have been updated",
      data,
    };
  }
  catch (e: any) {
    const error = e as DrizzleError;
    return sendError(
      event,
      createError({
        statusCode: 409,
        statusMessage: error.message,
      }),
    );
  }
});

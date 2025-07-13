import type {
  DrizzleError,
} from "drizzle-orm";

import {
  updateEvent,
} from "~/lib/db/queries/event";
import {
  UpdateEvent,
} from "~/lib/db/schema";
import {
  bodyValidator,
} from "~/utils/body-validator";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const eventId = event?.context?.params?.id;
  const result = await bodyValidator(
    event,
    UpdateEvent.safeParse,
  );

  try {
    const data = await updateEvent(
      result.data,
      eventId as string,
    );

    return {
      success: true,
      message: "Event Details have been updated",
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

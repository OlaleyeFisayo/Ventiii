import type {
  DrizzleError,
} from "drizzle-orm";

import {
  updateEvent,
} from "~/lib/db/queries/event";
import {
  UpdateEvent,
} from "~/lib/db/schema";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const eventId = event?.context?.params?.id;
  const result = await readValidatedBody(
    event,
    UpdateEvent.safeParse,
  );

  if (!result?.success) {
    const statusMessage = result
      .error
      .issues
      .map(issue => `${issue.path.join("")}: ${issue.message}`)
      .join(", \n");

    const data = result
      .error
      .issues
      .reduce(
        (
          errors,
          issue,
        ) => {
          errors[issue.path.join("")] = issue.message;
          return errors;
        },
        {} as Record<string, string>,
      );

    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage,
        data,
      }),
    );
  }

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

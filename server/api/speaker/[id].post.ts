import type {
  DrizzleError,
} from "drizzle-orm";

import {
  createSpeaker,
} from "~/lib/db/queries/speaker";
import {
  InsertSpeaker,
} from "~/lib/db/schema";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(
    event,
    InsertSpeaker.safeParse,
  );

  if (!result.success) {
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

  const eventId = event?.context?.params?.id;

  try {
    return createSpeaker(
      result.data,
      eventId,
    );
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

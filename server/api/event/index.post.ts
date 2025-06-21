import type {
  DrizzleError,
} from "drizzle-orm";

import {
  v4 as uuidv4,
} from "uuid";

import {
  createEvent,
} from "~/lib/db/queries/event";
import {
  InsertEvent,
} from "~/lib/db/schema";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(
    event,
    InsertEvent.safeParse,
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

  try {
    const id = uuidv4();
    return createEvent(
      result.data,
      id,
      event.context.user.id,
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

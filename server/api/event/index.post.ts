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
import {
  bodyValidator,
} from "~/utils/body-validator";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await bodyValidator(
    event,
    InsertEvent.safeParse,
  );

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

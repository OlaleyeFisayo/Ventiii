import {
  getEvents,
} from "~/lib/db/queries/event";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  return await getEvents(event.context.user.id);
});

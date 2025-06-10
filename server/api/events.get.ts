import {
  getEvents,
} from "~/lib/db/queries/event";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const query = getQuery(event);
  const filter = query.filter as GetEventFilterOptions || "all";

  const validFilters = ["upcoming", "past", "all"];
  const filtertoUse = validFilters.includes(filter) ? filter : "all";

  return await getEvents(event.context.user.id, filtertoUse);
});

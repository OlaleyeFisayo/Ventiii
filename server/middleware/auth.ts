import {
  auth,
} from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const protectedRoutes = [
    "/dashboard",
    "/new",
    "/event",
  ];

  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user;
  const isProtected = protectedRoutes.some((route: string) => event.path.startsWith(route));
  if (isProtected && !session?.user) {
    await sendRedirect(event, "/log-in", 302);
  }
});

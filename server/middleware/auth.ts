import {
  auth,
} from "~/lib/auth";

const protectedRoutes = [
  "/dashboard",
  "/new",
];

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  const isProtected = protectedRoutes.some((route: string) => event.path.startsWith(route));
  if (isProtected && !session) {
    await sendRedirect(event, "/log-in", 302);
  }
});

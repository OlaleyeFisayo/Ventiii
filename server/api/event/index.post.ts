import {
  z,
} from "zod/v4";

const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.object({
    start: z.iso.date(),
    end: z.iso.date(),
  }),
  time: z.object({
    start: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
    end: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  }),
  location: z.string().min(1),
  coverPictureUrl: z.url(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => createEventSchema.safeParse(body));

  if (!result.success) {
    const statusMessage = result
      .error
      .issues
      .map(issue => `${issue.path.join("")}: ${issue.message}`)
      .join(", \n");

    const data = result
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join("")] = issue.message;
        return errors;
      }, {
      } as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  return result.data;
});

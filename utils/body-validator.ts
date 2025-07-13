export async function bodyValidator(
  event: AuthenticatedEvent,
  validator: any,
) {
  const result = await readValidatedBody(
    event,
    validator,
  );

  if (!result?.success) {
    const statusMessage = result
      .error
      .issues
      .map((issue: any) => `${issue.path.join("")}: ${issue.message}`)
      .join(", \n");

    const data = result
      .error
      .issues
      .reduce(
        (
          errors: any,
          issue: any,
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

  return result;
}

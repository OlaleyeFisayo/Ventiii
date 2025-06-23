import cloudinary from "~/lib/cloudinary";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event);
    const file = form?.find(item => item.name === "file");

    if (!file) {
      throw createError({
        statusCode: 400,
        statusMessage: "No file Provided",
      });
    }

    const base64File = `data:${file.type};base64,${file.data.toString("base64")}`;

    const result = await cloudinary.uploader.upload(
      base64File,
      {
        folder: "ventiii",
        resource_type: "auto",
        quality: "auto:best",
      },
    );

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      bytes: result.bytes,
      format: result.format,
    };
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});

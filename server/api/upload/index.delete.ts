import cloudinary from "~/lib/cloudinary";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    public_id,
  } = body;

  if (!public_id) {
    return;
  }

  const data = await cloudinary.uploader.destroy(public_id);

  if (data.result === "ok") {
    return {
      success: true,
      message: "Image deleted successfully",
    };
  }
});

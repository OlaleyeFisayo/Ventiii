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

  // Delete from Cloudinary
  const result = await cloudinary.uploader.destroy(public_id);

  if (result.result === "ok") {
    return {
      success: true,
      message: "Image deleted successfully",
    };
  }
});

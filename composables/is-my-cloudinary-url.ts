export async function isMyCloudinaryUrl(url: any) {
  const cloudinaryStore = useCloudinaryStore();
  if (!url || typeof url !== "string")
    return false;

  const myCloudPattern = /^https?:\/\/res\.cloudinary\.com\/ventiiistorage\/image\/upload\//;
  const isMyUrl = myCloudPattern.test(url);

  if (isMyUrl) {
    const urlParts = url.split("/");
    const filenameWithExt = urlParts[urlParts.length - 1];
    const filenamewithExtParts = filenameWithExt.split(".");
    const filename = filenamewithExtParts[0];

    await cloudinaryStore.deleteUpload(filename);
  }
}

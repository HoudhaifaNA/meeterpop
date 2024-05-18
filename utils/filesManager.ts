import { v2 as cloudinary } from "cloudinary";

import AppError from "./AppError";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const insertFile = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  const mime = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(buffer).toString("base64");
  const fileUri = `data:${mime};${encoding},${base64Data}`;

  const uploadResult = await cloudinary.uploader
    .upload(fileUri)
    .catch((error) => {
      console.log(error);
      throw new AppError("Error saving files", 403);
    });

  try {
    return uploadResult.secure_url;
  } catch (error: any) {
    return new AppError(error.message || "Error", 500);
  }
};

export const deleteFile = async (fileName: string) => {
  try {
    // Extract id from url
    const paths = fileName.split("/");
    // id ====> ID.png/jpg/jpeg
    const id = paths[paths.length - 1].split(".")[0];

    await cloudinary.api
      .delete_resources([id], { type: "upload", resource_type: "image" })
      .catch((error) => {
        console.log(error);
        throw new AppError("Error deleting files", 403);
      });
  } catch (err) {
    console.log(err);
    throw new AppError("Error deleting files", 403);
  }
};

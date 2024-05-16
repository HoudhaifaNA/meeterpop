import path from "node:path";
import { writeFile, unlink } from "node:fs/promises";
import { nanoid } from "nanoid";

import AppError from "./AppError";

const dirPath = path.join(path.resolve(), "public/assets/");

export const insertFile = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  let filename = file.name.replaceAll(" ", "_");
  filename = `${nanoid()}-${filename}`;

  const pathName = path.join(dirPath, filename);

  try {
    await writeFile(pathName, buffer);

    return filename;
  } catch (error: any) {
    return new AppError(error.message || "Error", 500);
  }
};

export const deleteFile = async (fileName: string) => {
  try {
    const filePath = path.join(dirPath, fileName);
    await unlink(filePath);
  } catch (err) {
    console.log(err);
    throw new AppError("Error deleting files", 403);
  }
};

import { FilterQuery, HydratedDocument, Model } from "mongoose";

import { PopupSchemaDB } from "@/types";
import { deleteFile } from "./filesManager";

const cleanPopups = async (Popup: Model<any>, query: FilterQuery<any>) => {
  const popupsToDelete: HydratedDocument<PopupSchemaDB>[] | null =
    await Popup.find(query);

  await Popup.deleteMany(query);

  if (popupsToDelete) {
    await popupsToDelete.forEach(async ({ icon }) => {
      await deleteFile(icon);
    });
  }
};

export default cleanPopups;

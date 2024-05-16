import { type NextRequest } from "next/server";
import { HydratedDocument } from "mongoose";

import getModels from "@/models";
import withErrorHandler from "@/utils/withErrorHandler";
import { PopupSchemaDB } from "@/types";
import protect from "@/utils/protect";
import { deleteFile } from "@/utils/filesManager";

interface Params {
  params: {
    ids: string;
  };
}

export const DELETE = withErrorHandler(
  async (_req: NextRequest, { params }: Params) => {
    const { ids } = params;
    const { Popup } = await getModels();
    await protect();

    const popupsToDelete: HydratedDocument<PopupSchemaDB>[] | null =
      await Popup.find({ _id: { $in: ids.split(",") } });

    await Popup.deleteMany({ _id: { $in: ids.split(",") } });

    if (popupsToDelete) {
      await popupsToDelete.forEach(async ({ id, icon }) => {
        await deleteFile(icon);
      });
    }

    return new Response(null, { status: 204 });
  }
);

import { type NextRequest } from "next/server";

import getModels from "@/models";
import withErrorHandler from "@/utils/withErrorHandler";
import protect from "@/utils/protect";
import cleanPopups from "@/utils/cleanPopups";

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

    await cleanPopups(Popup, { _id: { $in: ids.split(",") } });

    return new Response(null, { status: 204 });
  }
);

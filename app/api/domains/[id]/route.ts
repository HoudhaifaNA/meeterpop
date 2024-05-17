import { type NextRequest, NextResponse } from "next/server";
import { HydratedDocument } from "mongoose";

import getModels from "@/models";
import withErrorHandler from "@/utils/withErrorHandler";
import { DomainSchemaDB } from "@/types";
import protect from "@/utils/protect";
import cleanPopups from "@/utils/cleanPopups";

interface Params {
  params: { id: string };
}

export const PATCH = withErrorHandler(
  async (req: NextRequest, { params }: Params) => {
    const { id } = params;
    const { name, startingTime, intervalTime, endTime } = await req.json();
    const { Domain } = await getModels();
    const currentUser = await protect();

    const updatedDomain: HydratedDocument<DomainSchemaDB> | null =
      await Domain.findByIdAndUpdate(
        id,
        {
          name,
          startingTime,
          intervalTime,
          endTime,
          owner: currentUser.id,
        },
        { new: true }
      );

    return NextResponse.json(
      { message: "Domain updated successfully", domain: updatedDomain },
      { status: 200 }
    );
  }
);

export const DELETE = withErrorHandler(
  async (_req: NextRequest, { params }: Params) => {
    const { id } = params;
    const { Domain, Popup } = await getModels();
    await protect();

    await Domain.findByIdAndDelete(id);

    await cleanPopups(Popup, { domain: id });

    return new Response(null, { status: 204 });
  }
);

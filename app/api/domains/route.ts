import { type NextRequest, NextResponse } from "next/server";
import mongoose, { HydratedDocument } from "mongoose";

import getModels from "@/models";
import withErrorHandler from "@/utils/withErrorHandler";
import { DomainSchemaDB } from "@/types";
import protect from "@/utils/protect";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { Domain, Popup } = await getModels();
  const currentUser = await protect();
  const groupBy = req.nextUrl.searchParams.get("groupBy") || "domain";

  const domains = await Domain.find({ owner: currentUser.id });
  const popups = await Popup.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(currentUser.id) },
    },
    {
      $group: { _id: `$${groupBy}`, count: { $sum: 1 } },
    },
  ]).exec();

  const items = popups.map((popup) => {
    let groupedItem: any = popup;
    if (groupBy === "domain") {
      const matchedPopup = domains.find(
        (dom) => String(dom.id) === String(popup._id)
      );

      if (matchedPopup) {
        groupedItem = { ...matchedPopup._doc, count: popup.count };
      }
    }
    return groupedItem;
  });

  return NextResponse.json({ results: items.length, items }, { status: 200 });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { name } = await req.json();
  const { Domain } = await getModels();
  const currentUser = await protect();

  let newDomain: HydratedDocument<DomainSchemaDB> = await Domain.create({
    name,
    owner: currentUser.id,
  });

  return NextResponse.json(
    { message: "Domain created successfully", domain: newDomain },
    { status: 201 }
  );
});

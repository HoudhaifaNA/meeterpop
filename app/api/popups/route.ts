import { type NextRequest, NextResponse } from "next/server";
import { HydratedDocument } from "mongoose";

import getModels from "@/models";
import withErrorHandler from "@/utils/withErrorHandler";
import { DomainSchemaDB, PopupSchemaDB } from "@/types";
import protect from "@/utils/protect";
import AppError from "@/utils/AppError";
import { deleteFile, insertFile } from "@/utils/filesManager";

function isFile(value: any): value is File {
  return Object.prototype.toString.call(value) === "[object File]";
}

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { Popup, Domain } = await getModels();
  let type = req.nextUrl.searchParams.get("type");
  let value = req.nextUrl.searchParams.get("value");
  let query: Record<string, string> = {};

  if (type === "domain") {
    const domain: HydratedDocument<DomainSchemaDB>[] = await Domain.find({
      name: value,
    });

    // Avoiding ObjectId error
    if (!domain.length) {
      return NextResponse.json({ results: 0, popups: [] }, { status: 200 });
    }

    if (domain.length) value = domain[0].id;
  }

  if (type && value) query = { [type]: value };

  const popups = await Popup.find(query).populate("domain");

  return NextResponse.json({ results: popups.length, popups }, { status: 200 });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { Popup, Domain } = await getModels();
  const form = await req.formData();
  const domainName = form.get("domain");
  const currentUser = await protect();

  const domainsList: HydratedDocument<DomainSchemaDB>[] = await Domain.find({
    name: domainName,
    owner: currentUser.id,
  });
  if (domainsList.length === 0) {
    throw new AppError("Invalid domain", 403);
  }
  const domain = domainsList[0].id;

  // Extract and organize data because it is an array inside form-data
  // Edge case isDisabled string to boolean and uploads managment
  // We put any because we have mongoose validation
  const popups: any = [];

  for (let [key, value] of form.entries()) {
    const match = key.match(/popups\[(\d+)]\[(.+)]/);
    let updatedValue: any = value;

    if (match) {
      const index = parseInt(match[1], 10);
      const field = match[2];

      if (!popups[index]) {
        popups[index] = {};
      }

      if (field === "isDisabled") {
        updatedValue = value === "true";
      } else if (field === "icon" && isFile(value)) {
        const isValidImage = value.type.split("/")[0] === "image";

        if (!isValidImage) {
          throw new AppError("Invalid image type", 403);
        }

        updatedValue = await insertFile(value);
      }
      popups[index][field] = updatedValue;
    }
  }

  // Attach the owner and the domain to every popup
  const ownedPopups = popups.map((popup: any) => {
    return { ...popup, owner: currentUser.id, domain };
  });

  let popupsList: HydratedDocument<PopupSchemaDB>[] =
    await Popup.create(ownedPopups);

  return NextResponse.json(
    {
      results: popupsList.length,
      message: "Popups saved successfully",
      popups: popupsList,
    },
    { status: 201 }
  );
});

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  const { Popup } = await getModels();
  const form = await req.formData();
  await protect();

  const popups: any[] = [];

  for (let [key, value] of form.entries()) {
    const match = key.match(/popups\[(\d+)]\[(.+)]/);
    let updatedValue: any = value;

    if (match) {
      const index = parseInt(match[1], 10);
      const field = match[2];

      if (!popups[index]) {
        popups[index] = {};
      }

      if (field === "isDisabled") {
        updatedValue = value === "true";
      } else if (field === "icon" && isFile(value)) {
        const isValidImage = value.type.split("/")[0] === "image";
        if (!isValidImage) {
          throw new AppError("Invalid image type", 403);
        }
      }
      popups[index][field] = updatedValue;
    }
  }

  const idsToModify = popups.map((p) => p.id);
  const prevPopups = await Popup.find({ _id: { $in: idsToModify } });

  // Check if there is new icon if no then keep the last one
  const updatedPopups = await Promise.all(
    popups.map(async (popup: any) => {
      const oldPopup = prevPopups.find((p) => p.id === popup.id);
      if (oldPopup) {
        const { icon, domain } = oldPopup;
        const isNewIcon = popup.icon && icon !== popup.icon.name;

        if (isNewIcon) {
          await deleteFile(icon);
          const newIconFileName = await insertFile(popup.icon);
          popup.icon = newIconFileName;
        } else {
          popup.icon = icon; // Keep the old icon if no new icon is provided
        }
        popup.domain = domain;

        // Update and return the modified popup
        return await Popup.findByIdAndUpdate(popup.id, popup, { new: true });
      }
      return null; // Explicitly return null if no oldPopup is found
    })
  );

  return NextResponse.json(
    {
      results: updatedPopups.length,
      message: "Popups saved successfully",
      popups: updatedPopups,
    },
    { status: 200 }
  );
});

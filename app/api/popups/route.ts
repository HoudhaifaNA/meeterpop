import { type NextRequest, NextResponse } from 'next/server';
import { HydratedDocument } from 'mongoose';

import getModels from '@/models';
import withErrorHandler from '@/utils/withErrorHandler';
import protect from '@/utils/protect';
import AppError from '@/utils/AppError';
import { deleteFile, insertFile } from '@/utils/filesManager';
import managePopupsFormData from '@/utils/managePopupsForm';
import { DomainQueriedItem, PopupSchemaDB } from '@/types';

export const GET = withErrorHandler(async (req: NextRequest) => {
  const currentUser = await protect();
  const { Popup, Domain } = await getModels();

  const { searchParams } = req.nextUrl;
  let type = searchParams.get('type');
  let value = searchParams.get('value');
  let query: Record<string, string> = { owner: currentUser.id };

  if (type === 'domain') {
    // value will be www.example.com
    const domain: DomainQueriedItem | null = await Domain.findOne({ name: value });

    // Avoiding ObjectId error so if there is domain attach the id instead of the name
    if (!domain) {
      throw new AppError("Domain doesn't exist", 404);
    }

    // Convert value: www.example.com to Mongodb ObjectId
    value = domain.id;
  }

  if (type && value) {
    query = { [type]: value };
  }

  const popups = await Popup.find(query).populate('domain');

  return NextResponse.json({ results: popups.length, popups }, { status: 200 });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const currentUser = await protect();
  const { Popup, Domain } = await getModels();

  const form = await req.formData();
  const domainName = form.get('domain');

  const domain: DomainQueriedItem | null = await Domain.findOne({ name: domainName, owner: currentUser.id });

  if (!domain) {
    throw new AppError("Domain doesn't exist", 404);
  }

  const domainId = domain.id;

  // Extract and organize data because it is an array inside form-data
  // Edge case isDisabled string to boolean and uploads managment
  const popups = await managePopupsFormData(form, true);

  // Attach the owner and the domain to every popup
  const newPopupsBody = popups.map((popup) => {
    return { ...popup, owner: currentUser.id, domain: domainId };
  });

  const newPopups: HydratedDocument<PopupSchemaDB>[] = await Popup.create(newPopupsBody);

  return NextResponse.json(
    { results: newPopups.length, message: 'Popups saved successfully', popups: newPopups },
    { status: 201 }
  );
});

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  await protect();
  const { Popup } = await getModels();

  const form = await req.formData();

  const popups = await managePopupsFormData(form, false);

  const idsToModify = popups.map(({ id }) => id);
  const oldPopups = await Popup.find({ _id: { $in: idsToModify } });

  // Check if there is new icon if no then keep the last one
  const updatedPopups = await Promise.all(
    popups.map(async (popup) => {
      const oldPopup = oldPopups.find((p) => p.id === popup.id);

      if (oldPopup) {
        const { icon, domain } = oldPopup;
        const isNewIcon = icon !== popup.icon.name;

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
    { results: updatedPopups.length, message: 'Popups saved successfully', popups: updatedPopups },
    { status: 200 }
  );
});

import { type NextRequest, NextResponse } from 'next/server';
import mongoose, { HydratedDocument } from 'mongoose';

import getModels from '@/models';
import withErrorHandler from '@/utils/withErrorHandler';
import protect from '@/utils/protect';
import { DomainQueriedItem, DomainSchemaDB, GetCategoryGrouped } from '@/types';

export const GET = withErrorHandler(async (req: NextRequest) => {
  const currentUser = await protect();
  const { Domain, Popup } = await getModels();

  const { searchParams } = req.nextUrl;
  const groupBy = searchParams.get('groupBy') || 'domain';

  const domains: DomainQueriedItem[] = await Domain.find({ owner: currentUser.id });

  // Group popups
  const popups: GetCategoryGrouped[] = await Popup.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(currentUser.id) },
    },
    {
      $group: { _id: `$${groupBy}`, count: { $sum: 1 } },
    },
    {
      $addFields: { groupBy: '$_id' },
    },
  ]).exec();

  // We will take another approach for domain grouped by because
  //if there is no popup with that domain we want to show it anyway
  const items: any[] = [];

  if (groupBy === 'domain') {
    let groupedItem: any = {};

    domains.forEach((domain) => {
      const matchedPopup = popups.find((popup) => String(popup._id) === String(domain.id));
      const count = matchedPopup ? matchedPopup.count : 0;

      groupedItem = { ...domain.toObject(), count };
      items.push(groupedItem);
    });
  } else {
    popups.forEach((popup) => {
      items.push(popup);
    });
  }

  return NextResponse.json({ results: items.length, items }, { status: 200 });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const currentUser = await protect();
  const { Domain } = await getModels();

  const { name } = await req.json();

  const newDomain: DomainQueriedItem = await Domain.create({ name, owner: currentUser.id });

  return NextResponse.json({ message: 'Domain created successfully', domain: newDomain }, { status: 201 });
});

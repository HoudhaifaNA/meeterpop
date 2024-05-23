import { type NextRequest, NextResponse } from 'next/server';

import getModels from '@/models';
import withErrorHandler from '@/utils/withErrorHandler';
import cleanPopups from '@/utils/cleanPopups';
import protect from '@/utils/protect';
import AppError from '@/utils/AppError';
import { DomainQueriedItem, DomainSchemaDB } from '@/types';
import { DOMAIN_REGEX } from '@/constants';

interface Params {
  params: { id: string };
}

export const GET = withErrorHandler(async (_req: NextRequest, { params }: Params) => {
  const { Domain } = await getModels();

  const { id } = params;

  const domains: DomainQueriedItem[] = await Domain.find({ name: id });

  return NextResponse.json({ domains }, { status: 200 });
});

export const PATCH = withErrorHandler(async (req: NextRequest, { params }: Params) => {
  const currentUser = await protect();
  const { Domain } = await getModels();

  const { name, startingTime, intervalTime, endTime } = await req.json();
  // Mask name as id ===> /api/domains/www.meetergo.com
  const { id } = params;
  const query: Record<string, any> = { owner: currentUser.id };

  // If id is domain or ObjectID we will attach it to the query
  if (DOMAIN_REGEX.test(id)) {
    query.name = id;
  } else {
    query._id = id;
  }

  const domainBody: Partial<DomainSchemaDB> = {
    name,
    startingTime,
    intervalTime,
    endTime,
    owner: currentUser.id,
  };

  const updatedDomain: DomainQueriedItem | null = await Domain.findOneAndUpdate(query, domainBody, {
    new: true,
  });

  if (!updatedDomain) {
    throw new AppError("Domain doesn't exist", 404);
  }

  return NextResponse.json({ message: 'Domain updated successfully', domain: updatedDomain }, { status: 200 });
});

export const DELETE = withErrorHandler(async (_req: NextRequest, { params }: Params) => {
  await protect();
  const { Domain, Popup } = await getModels();

  const { id } = params;

  await Domain.findByIdAndDelete(id);

  await cleanPopups(Popup, { domain: id });

  return new Response(null, { status: 204 });
});

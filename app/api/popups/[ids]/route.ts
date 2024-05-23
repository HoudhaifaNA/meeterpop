import { type NextRequest } from 'next/server';

import getModels from '@/models';
import withErrorHandler from '@/utils/withErrorHandler';
import protect from '@/utils/protect';
import cleanPopups from '@/utils/cleanPopups';

interface Params {
  params: {
    ids: string;
  };
}

export const DELETE = withErrorHandler(async (_req: NextRequest, { params }: Params) => {
  await protect();
  const { Popup } = await getModels();

  const { ids } = params;

  // ids will be in form 664cd3e623e312d36b2f4746,664cd3e623e312d36b2f4796,664cd3e623e312d36b2f4746
  const idsList = ids.split(',');

  await cleanPopups(Popup, { _id: { $in: idsList } });

  return new Response(null, { status: 204 });
});

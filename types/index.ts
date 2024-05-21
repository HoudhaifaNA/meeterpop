import { z } from 'zod';
import { HydratedDocument, Types } from 'mongoose';

import { domainFormSchema, loginFormSchema, popupFormSchema, timingFormSchema } from '@/schemas';
import { GROUP_BY_ITEMS, POPUP_PLACES, STATUS } from '@/constants';

type PlaceItem = (typeof POPUP_PLACES)[number];
type StatusItem = (typeof STATUS)[number];
export interface LinkItem {
  link: string;
  title: string;
}

export type NotificationType = 'success' | 'warn' | 'error' | 'info';

export type GroupByType = (typeof GROUP_BY_ITEMS)[number];

export type PopupType = 'toCreate' | 'toModify' | 'toDelete';

export interface DomainSchemaDB {
  _id: string;
  name: string;
  startingTime: number;
  intervalTime: number;
  endTime: number;
  owner: Types.ObjectId;
}

export interface PopupSchemaDB {
  category: string;
  sender: string;
  title: string;
  message: string;
  icon: string;
  time: string;
  place: PlaceItem;
  status: StatusItem;
  isDisabled: boolean;
  domain: Types.ObjectId;
  owner: Types.ObjectId;
}

export interface UserSchemaDB {
  email: string;
  token?: string;
  tokenExpires?: Date;
}

export interface GetDomainGrouped extends DomainSchemaDB {
  count: number;
}
export interface GetCategoryGrouped {
  _id: string;
  count: number;
  groupBy: string;
}

export interface GetGroupedPopups {
  items: GetDomainGrouped[] | GetCategoryGrouped[];
}

export interface PopulatedPopup extends Omit<PopupSchemaDB, 'domain'> {
  id: string;
  domain: DomainSchemaDB;
}

export interface GetUserPopups {
  popups: PopulatedPopup[];
}

export interface GetDomain {
  domains: DomainSchemaDB[];
}

type User = Pick<HydratedDocument<UserSchemaDB>, 'id' | 'email'>;

export interface GetLoggedInUser {
  user: User;
}

export type GroupedItem = GetGroupedPopups['items'][number];

export type DomainQueriedItem = HydratedDocument<DomainSchemaDB>;

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type DomainFormValues = z.infer<typeof domainFormSchema>;
export type PopupFormValues = z.infer<typeof popupFormSchema>;
export type TimingFormValues = z.infer<typeof timingFormSchema>;
export type PopupItem = PopupFormValues['popups'][number];

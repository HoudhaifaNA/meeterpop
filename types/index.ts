import { z } from "zod";
import { HydratedDocument, Types } from "mongoose";

import {
  domainFormSchema,
  loginFormSchema,
  popupFormSchema,
  timingFormSchema,
} from "@/schemas";
import { POPUP_PLACES, STATUS } from "@/constants";

type PlaceItem = (typeof POPUP_PLACES)[number];
type StatusItem = (typeof STATUS)[number];
export interface LinkItem {
  link: string;
  title: string;
}

export type GroupByType = "status" | "domain" | "category";

export interface DomainSchemaDB {
  _id: string;
  name: string;
  popups: Types.ObjectId[];
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

export interface PopulatedPopup extends Omit<PopupSchemaDB, "domain"> {
  id: string;
  domain: DomainSchemaDB;
}

export interface GetUserPopups {
  popups: PopulatedPopup[];
}

export interface GetDomain {
  domains: DomainSchemaDB[];
}

export type GroupedItem = GetGroupedPopups["items"][number];

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type DomainFormValues = z.infer<typeof domainFormSchema>;
export type PopupFormValues = z.infer<typeof popupFormSchema>;
export type TimingFormValues = z.infer<typeof timingFormSchema>;
export type PopupItem = PopupFormValues["popups"][number];

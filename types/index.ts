import { z } from "zod";
import { Types } from "mongoose";

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

export interface DomainGroupedItem {
  domains: string[];
  status: string[];
  categories: string[];
}

export interface DomainSchemaDB {
  name: string;
  icon: string;
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

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type DomainFormValues = z.infer<typeof domainFormSchema>;
export type PopupFormValues = z.infer<typeof popupFormSchema>;
export type TimingFormValues = z.infer<typeof timingFormSchema>;
export type PopupItem = PopupFormValues["popups"][number];

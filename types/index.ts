import { domainFormSchema, loginFormSchema, popupFormSchema } from "@/schemas";
import { z } from "zod";

export interface LinkItem {
  link: string;
  title: string;
}

export interface DomainGroupedItem {
  domains: string[];
  status: string[];
  categories: string[];
}

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type DomainFormValues = z.infer<typeof domainFormSchema>;
export type PopupFormValues = z.infer<typeof popupFormSchema>;
export type PopupItem = PopupFormValues["popups"][number];

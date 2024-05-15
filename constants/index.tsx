import {
  DomainFormValues,
  LinkItem,
  LoginFormValues,
  PopupFormValues,
} from "@/types";
import { nanoid } from "nanoid";

export const MAIN_LINKS: LinkItem[] = [
  { link: "#", title: "Pricing" },
  { link: "#", title: "How to use" },
  { link: "#", title: "FAQ" },
];

export const CLIENT_LINKS: LinkItem[] = [
  { link: "/dashboard", title: "Dashboard" },
];

export const GROUP_BY_ITEMS = ["domain", "category", "status"] as const;

export const LOGIN_DEFAULT_VALUES: LoginFormValues = {
  email: "",
};

export const DOMAIN_FORM_DEFAULT_VALUES: DomainFormValues = {
  domain: "",
};

export const POPUP_PLACES = [
  "top_right",
  "bottom_right",
  "top_left",
  "bottom_left",
] as const;

export const POPUPS_FORM_DEFAULT_VALUES: PopupFormValues = {
  popups: [
    {
      id: nanoid(),
      isOpen: true,
      category: "General",
      icon: "",
      sender: "",
      title: "",
      message: "",
      place: "top_right",
      status: "default",
    },
  ],
};

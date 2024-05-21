import {
  DomainFormValues,
  LinkItem,
  LoginFormValues,
  TimingFormValues,
} from "@/types";

export const DOMAIN_REGEX =
  /^www\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

export const MAIN_LINKS: LinkItem[] = [
  { link: "#", title: "Pricing" },
  { link: "#", title: "How to use" },
  { link: "#", title: "FAQ" },
];

export const LOGGED_IN_LINKS: LinkItem[] = [
  { link: "/dashboard", title: "Dashboard" },
];

export const GROUP_BY_ITEMS = ["domain", "category", "status"] as const;

export const LOGIN_DEFAULT_VALUES: LoginFormValues = {
  email: "",
};

export const DOMAIN_FORM_DEFAULT_VALUES: DomainFormValues = {
  name: "",
};

export const POPUP_PLACES = [
  "top_right",
  "bottom_right",
  "top_left",
  "bottom_left",
] as const;

export const STATUS = ["default", "worrying", "dangerous"] as const;

export const TIMING_FORM_DEFAULT_VALUES: TimingFormValues = {
  startingTime: 1000,
  intervalTime: 1000,
  endTime: 4000,
};

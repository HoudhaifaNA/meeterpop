import { LinkItem } from "@/types";

export const LINKS: LinkItem[] = [
  { link: "#", title: "Pricing" },
  { link: "#", title: "How to use" },
  { link: "#", title: "FAQ" },
];

export const GROUP_BY_ITEMS = ["domain", "category", "status"] as const;

export const LOGIN_DEFAULT_VALUES = {
  email: "",
};
export const DOMAIN_FORM_DEFAULT_VALUES = {
  domain: "",
};

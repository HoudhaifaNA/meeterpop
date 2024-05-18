import { isAxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

import { GetDomainGrouped, PopupFormValues, PopupItem } from "@/types";
import notify from "./notify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePopupItem = (domain: string): PopupItem => {
  return {
    id: nanoid(),
    isOpen: true,
    isDisabled: false,
    domain,
    time: "",
    category: "General",
    sender: "",
    title: "",
    message: "",
    place: "top_right",
    status: "default",
  };
};

export const togglePopupByIndex = (
  popups: PopupFormValues["popups"],
  id: string,
  state: boolean
) => {
  return popups.map((popup) => {
    if (popup.id === id) {
      popup.isOpen = state;
    }
    return popup;
  });
};

export const handleRequestError = (err: unknown) => {
  console.log(err);

  let message = "Error";
  if (isAxiosError(err)) {
    message = err.response?.data.message;
  } else if (err instanceof Error) {
    message = err.message;
  }
  notify("error", message);
};

export const isDomainGrouped = (item: any): item is GetDomainGrouped => {
  return item.name && item.startingTime;
};

export const copyScript = () => {
  navigator.clipboard.writeText(
    `<script src="${location.origin}/js/script.js"></script>`
  );
  return true;
};

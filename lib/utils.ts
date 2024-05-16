import { PopupFormValues, PopupItem } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePopupItem = (): PopupItem => {
  return {
    id: nanoid(),
    isOpen: true,
    isDisabled: false,
    domain: "",
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

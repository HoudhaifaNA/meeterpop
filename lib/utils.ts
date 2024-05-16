import { PopupFormValues } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import { fetcher } from "@/lib/API";
import { GetUserPopups, PopupFormValues, PopupItem } from "@/types";
import { generatePopupItem } from "@/lib/utils";
import { usePopupManager } from "@/store";

const usePopupsSetter = (setValue: UseFormSetValue<PopupFormValues>) => {
  const { insertPopup } = usePopupManager();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const value = searchParams.get("value");
  const endpoint = `/popups?type=${type}&value=${value}`;
  const { data, isLoading, error } = useSWR<GetUserPopups>(endpoint, fetcher);

  useEffect(() => {
    const isDomainGrouped = type === "domain" && value;
    const haveNoPopups = data?.popups.length === 0;
    if (isDomainGrouped && haveNoPopups) {
      const newPopup = generatePopupItem(value);
      insertPopup("toCreate", newPopup.id);
      setValue("popups", [newPopup]);
    } else if (data?.popups) {
      const popupsList = data.popups.map((pop) => {
        const {
          id,
          category,
          time,
          title,
          message,
          icon,
          domain,
          isDisabled,
          place,
          sender,
          status,
        } = pop;
        insertPopup("toModify", id);

        const modifiablePopup: PopupItem = {
          id,
          category,
          title,
          time,
          isOpen: true,
          icon,
          domain: domain.name,
          isDisabled,
          message,
          place,
          sender,
          status,
        };
        return modifiablePopup;
      });

      setValue("popups", popupsList);
    }
  }, [JSON.stringify(data)]);

  return { data, isLoading, error };
};

export default usePopupsSetter;

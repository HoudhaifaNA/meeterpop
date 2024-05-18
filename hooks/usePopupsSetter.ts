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
    if (type === "domain" && value && data?.popups.length === 0) {
      const newPopup = generatePopupItem(value);
      insertPopup("toCreate", newPopup.id);
      setValue("popups", [newPopup]);
    } else if (data?.popups) {
      const popupsList = data.popups.map((pop) => {
        insertPopup("toModify", pop.id);
        const modifiablePopup: PopupItem = {
          id: pop.id,
          category: pop.category,
          title: pop.title,
          time: pop.time,
          isOpen: true,
          icon: pop.icon,
          domain: pop.domain.name,
          isDisabled: pop.isDisabled,
          message: pop.message,
          place: pop.place,
          sender: pop.sender,
          status: pop.status,
        };
        return modifiablePopup;
      });
      setValue("popups", popupsList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  return { data, isLoading, error };
};

export default usePopupsSetter;

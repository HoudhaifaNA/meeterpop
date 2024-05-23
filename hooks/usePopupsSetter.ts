/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import useSWR from 'swr';

import { fetcher } from '@/lib/API';
import { GetUserPopups, PopupFormValues, PopupItem } from '@/types';
import { generatePopupItem } from '@/lib/utils';
import { usePopupManager } from '@/store';
import useGroupedParams from './useGroupedParams';

const usePopupsSetter = (setValue: UseFormSetValue<PopupFormValues>) => {
  const { insertPopup } = usePopupManager();
  const { type, value, isDomain } = useGroupedParams();

  const endpoint = `/popups?type=${type}&value=${value}`;
  const { data, isLoading, error } = useSWR<GetUserPopups>(endpoint, fetcher);

  useEffect(() => {
    const haveNoPopups = data?.popups.length === 0;
    if (isDomain && haveNoPopups) {
      const newPopup = generatePopupItem(value!);
      setValue('popups', [newPopup]);
      insertPopup('toCreate', newPopup.id);
    } else if (data?.popups) {
      const popupsList = data.popups.map((pop) => {
        const { id, category, time, title, message, icon, domain, isDisabled, place, sender, status } = pop;

        insertPopup('toModify', id);

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

      setValue('popups', popupsList);
    }
  }, [JSON.stringify(data)]);

  return { data, isLoading, error };
};

export default usePopupsSetter;

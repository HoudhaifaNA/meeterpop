/* eslint-disable react-hooks/exhaustive-deps */
import { UseFormSetValue } from 'react-hook-form';
import { useEffect } from 'react';
import useSWR from 'swr';

import { fetcher } from '@/lib/API';
import useGroupedParams from './useGroupedParams';
import { GetDomain, TimingFormValues } from '@/types';

const useTimingSetter = (setValue: UseFormSetValue<TimingFormValues>) => {
  const { isDomain, value } = useGroupedParams();
  const endpoint = isDomain ? `/domains/${value}` : null;
  const { data, isLoading, error } = useSWR<GetDomain>(endpoint, fetcher);

  useEffect(() => {
    if (data && data?.domains.length > 0) {
      const { domains } = data;
      const { intervalTime, startingTime, endTime } = domains[0];

      setValue('intervalTime', intervalTime);
      setValue('startingTime', startingTime);
      setValue('endTime', endTime);
    }
  }, [JSON.stringify(data)]);

  return { data, isLoading, error };
};

export default useTimingSetter;

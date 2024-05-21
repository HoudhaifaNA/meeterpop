/* eslint-disable react-hooks/exhaustive-deps */
import { UseFormSetValue } from "react-hook-form";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import { fetcher } from "@/lib/API";
import { GetDomain, TimingFormValues } from "@/types";

const useTimingSetter = (setValue: UseFormSetValue<TimingFormValues>) => {
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const value = searchParams.get("value");
  const endpoint = type === "domain" ? `/domains/${value}` : null;
  const { data, isLoading, error } = useSWR<GetDomain>(endpoint, fetcher);

  useEffect(() => {
    if (data && data?.domains.length > 0) {
      const { domains } = data;
      const { intervalTime, startingTime, endTime } = domains[0];

      setValue("intervalTime", intervalTime);
      setValue("startingTime", startingTime);
      setValue("endTime", endTime);
    }
  }, [JSON.stringify(data)]);

  return { data, isLoading, error };
};

export default useTimingSetter;

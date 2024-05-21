/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useSWR from "swr";

import { fetcher } from "@/lib/API";
import useMutate from "./useMutate";
import { GetLoggedInUser } from "@/types";

const useLoggedIn = () => {
  const pathname = usePathname();
  const [redirectPath, setRedirectPath] = useState<string>();
  const [url, setUrl] = useState<string | null>("/auth/login");
  const { data, error, isLoading } = useSWR<GetLoggedInUser>(url, fetcher);
  const { refresh } = useMutate();

  useEffect(() => {
    if (error && !isLoading) {
      if (pathname.startsWith("/dashboard")) {
        setRedirectPath("/login");
      }
      return setUrl(null);
    } else if (data?.user) {
      if (pathname === "/login") {
        setRedirectPath("/dashboard");
      }
    }

    refresh(/^\/auth/);
  }, [pathname, error, isLoading, data]);

  return { error, isLoading, data, redirectPath };
};

export default useLoggedIn;

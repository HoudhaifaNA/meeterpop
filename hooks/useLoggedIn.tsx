import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useSWR from "swr";

import { fetcher } from "@/lib/API";
import useMutate from "./useMutate";

const useLoggedIn = () => {
  const pathname = usePathname();
  const [url, setUrl] = useState<string | null>("/auth/login");
  const { data, error, isLoading } = useSWR<{ user: any }>(url, fetcher);
  const [redirectPath, setRedirectPath] = useState<string>();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, error, isLoading, data]);

  return { error, isLoading, data, redirectPath };
};

export default useLoggedIn;

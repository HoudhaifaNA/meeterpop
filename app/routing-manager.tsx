"use client";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import useLoggedIn from "@/hooks/useLoggedIn";

const RoutingManager = ({ children }: { children: ReactNode }) => {
  const { redirectPath, isLoading } = useLoggedIn();

  const renderPage = () => {
    if (!isLoading) {
      if (redirectPath) {
        redirect(redirectPath);
      } else {
        return <>{children}</>;
      }
    }
  };

  return renderPage();
};

export default RoutingManager;

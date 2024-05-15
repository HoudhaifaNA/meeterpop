"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeaderList from "./header-list";
import { usePathname } from "next/navigation";

const Header = () => {
  const hasRendered = useRef(false);
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState<number>();
  const isSmallDevice = windowWidth && windowWidth < 400;
  const isLoginPage = pathname === "/login";

  const logoImgProps = {
    src: "/logo" + (isSmallDevice ? "-icon.png" : ".png"),
    width: isSmallDevice ? 50 : 164,
    height: isSmallDevice ? 50 : 32,
  };

  useEffect(() => {
    hasRendered.current = true;
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const onWindowWidthChange = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", onWindowWidthChange);

    return () => window.removeEventListener("resize", onWindowWidthChange);
  }, [hasRendered]);

  return (
    <>
      {!isLoginPage && (
        <header className="fixed top-0 left-0 w-full z-50 bg-cyan-50 h-24 flex items-center justify-between border-b p-child border-black/15">
          <Image {...logoImgProps} alt="meeterpop logo" />
          <HeaderList />
        </header>
      )}
    </>
  );
};

export default Header;

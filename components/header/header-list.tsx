import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "../ui/button";
import { MAIN_LINKS, LOGGED_IN_LINKS } from "@/constants";
import useLoggedIn from "@/hooks/useLoggedIn";

const HeaderList = () => {
  const { data } = useLoggedIn();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isAuthenticated = data?.user;
  const headerLinks = isAuthenticated ? LOGGED_IN_LINKS : MAIN_LINKS;
  const btnLink = isAuthenticated ? "/api/auth/logout" : "/login";
  const btnText = isAuthenticated ? "Logout" : "Start poping";

  useEffect(() => {
    const bodyStyle = document.body.style;
    if (isMenuOpen && document) {
      bodyStyle.overflow = "hidden";
    } else {
      bodyStyle.overflow = "auto";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const renderBurgerMenu = () => {
    const generatedLines = Array.from({ length: 3 });

    return (
      <button
        onClick={toggleMenu}
        className="absolute right-4 top-8 z-50 h-6 w-6 cursor-pointer space-y-1 md:hidden focus:outline-none"
      >
        {generatedLines.map((_, index) => {
          const style = {
            "h-1 w-[100%] cursor-pointer space-x-4 bg-black transition-all":
              true,
            "translate-y-[7px] rotate-45": index == 0 && isMenuOpen,
            "opacity-0": index == 1 && isMenuOpen,
            "translate-y-[-9px] -rotate-45": index == 2 && isMenuOpen,
          };

          return <div key={index} className={clsx(style)} />;
        })}
      </button>
    );
  };

  return (
    <div className="flex-1">
      {renderBurgerMenu()}
      <ul
        className={clsx(
          "md:flex-row gap-8 bg-cyan-50 pb-40 overflow-y-auto items-center md:flex md:relative md:top-0 md:justify-end md:h-auto md:w-auto md:p-0",
          isMenuOpen
            ? "flex fixed top-24 pt-8 left-0 w-full h-full flex-col"
            : "hidden"
        )}
      >
        {headerLinks.map(({ link, title }, ind) => {
          const isActiveLink = link === pathname;

          return (
            <li
              className={clsx(
                "font-medium py-2",
                isActiveLink && "border-b-2 border-b-cyan-600"
              )}
              key={ind}
            >
              <Link href={link}>{title}</Link>
            </li>
          );
        })}

        <Button asChild>
          <li>
            <Link href={btnLink}>{btnText}</Link>
          </li>
        </Button>
      </ul>
    </div>
  );
};

export default HeaderList;

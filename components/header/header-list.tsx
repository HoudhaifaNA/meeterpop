import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import { Button } from "../ui/button";
import { LINKS } from "@/constants";

const HeaderList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (isMenuOpen && document) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

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
        {LINKS.map(({ link, title }, ind) => {
          return (
            <li className="font-medium" key={ind}>
              <Link href={link}>{title}</Link>
            </li>
          );
        })}

        <Button asChild>
          <li>
            <Link href="/login">Start poping</Link>
          </li>
        </Button>
      </ul>
    </div>
  );
};

export default HeaderList;

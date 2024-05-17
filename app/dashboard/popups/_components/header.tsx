"use client";
import { useSearchParams } from "next/navigation";

const Header = () => {
  const searchParams = useSearchParams();
  const value = searchParams.get("value");

  return (
    <h1 className="text-2xl font-semibold">
      Popup editor : <span className="text-base">( {value} )</span>
    </h1>
  );
};

export default Header;

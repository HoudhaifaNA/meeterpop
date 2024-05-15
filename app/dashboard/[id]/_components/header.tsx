"use client";
import { useParams } from "next/navigation";

const Header = () => {
  const { id } = useParams();

  return (
    <h1 className="text-2xl font-semibold">
      Popup editor : <span className="text-base">( {id} )</span>
    </h1>
  );
};

export default Header;

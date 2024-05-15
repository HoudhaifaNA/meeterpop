import Link from "next/link";
import Image from "next/image";
import { EllipsisVertical, Pen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CardItem = () => {
  return (
    <Link href="/">
      <div className="p-4 bg-white shadow-md rounded flex gap-4 h-32 col-span-1">
        <div className="relative w-8 h-8">
          <Image
            src="https://meetergo.com/flowty/img/633713e3363a5bfb9aa4e88e_favicon.png"
            fill
            alt="logo"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <h4 className="text-base font-semibold">figma.com</h4>
          <span className="font-light text-sm"> 14 popups</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-black/500">
              <Pen className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
};

export default CardItem;

"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DomainForm from "./_components/domain-form";
import { useState } from "react";
import { GROUP_BY_ITEMS } from "@/constants";
import { Check, ChevronDown } from "lucide-react";

type GroupByOption = (typeof GROUP_BY_ITEMS)[number];

const DashboardPage = () => {
  const [groupBy, setGroupBy] = useState<GroupByOption>("domain");

  const renderGroupByOptions = () => {
    return GROUP_BY_ITEMS.map((it) => {
      const isSelected = it === groupBy;
      const selectCategory = () => setGroupBy(it);
      return (
        <DropdownMenuItem
          className="capitalize flex items-center justify-between"
          onClick={selectCategory}
          key={it}
        >
          <span>{it}</span>
          {isSelected && <Check className="w-4 h-4" />}
        </DropdownMenuItem>
      );
    });
  };

  return (
    <main className="bg-gray-50">
      <div className="p-child py-12">
        <div className="flex items-center justify-between">
          <DomainForm />
          <DropdownMenu>
            <DropdownMenuTrigger className=" flex items-center gap-3 bg-white border border-black/20 px-4 py-2 rounded">
              <span>Group by</span>
              <ChevronDown className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>{renderGroupByOptions()}</DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;

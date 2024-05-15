"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DomainForm from "./_components/domain-form";
import { GROUP_BY_ITEMS } from "@/constants";
import { Button } from "@/components/ui/button";
import CardsList from "./_components/cards-list";

type GroupByOption = (typeof GROUP_BY_ITEMS)[number];

const DashboardPage = () => {
  const [groupBy, setGroupBy] = useState<GroupByOption>("domain");

  const renderGroupByOptions = () => {
    return GROUP_BY_ITEMS.map((it) => {
      const isSelected = it === groupBy;
      const selectCategory = () => setGroupBy(it);

      return (
        <DropdownMenuCheckboxItem
          className="capitalize flex items-center justify-between"
          onCheckedChange={selectCategory}
          checked={isSelected}
          key={it}
        >
          <span className="text-sm">{it}</span>
        </DropdownMenuCheckboxItem>
      );
    });
  };

  return (
    <main className="bg-gray-50">
      <div className="p-child py-12 space-y-6">
        <div className="flex sm:items-end  gap-8 justify-between flex-col sm:flex-row">
          <DomainForm />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto sm:ml-0">
                Group by
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>{renderGroupByOptions()}</DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardsList />
      </div>
    </main>
  );
};

export default DashboardPage;

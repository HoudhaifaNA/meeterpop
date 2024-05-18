"use client";
import { ChevronDown } from "lucide-react";
import useSWR from "swr";

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
import { GetGroupedPopups } from "@/types";
import { fetcher } from "@/lib/API";
import ErrorMessage from "./_components/error-message";
import Loading from "./_components/loading";
import { useGroupBy } from "@/store";

const DashboardPage = () => {
  const { groupBy, setGroupBy } = useGroupBy();
  const endpoint = `/domains?groupBy=${groupBy}`;
  const { data, isLoading, error } = useSWR<GetGroupedPopups>(
    endpoint,
    fetcher
  );

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

  const renderData = () => {
    if (error) {
      return (
        <ErrorMessage message={error.response?.data?.message || "Error"} />
      );
    } else if (isLoading) {
      return <Loading />;
    } else if (data?.items) {
      return (
        <>
          <div className="flex sm:items-end  gap-8 justify-between flex-col sm:flex-row">
            <DomainForm />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto sm:ml-0">
                  Group by
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {renderGroupByOptions()}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardsList items={data.items} />
        </>
      );
    }
  };

  return (
    <main className="bg-orange-50">
      <div className="p-child py-12 space-y-6">{renderData()}</div>
    </main>
  );
};

export default DashboardPage;

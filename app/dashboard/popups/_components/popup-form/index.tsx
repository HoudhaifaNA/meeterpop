"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

import { Form } from "@/components/ui/form";
import { popupFormSchema } from "@/schemas";

import PopupsList from "./popups-list";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/API";
import { GetUserPopups, PopupFormValues, PopupItem } from "@/types";
import ErrorMessage from "@/app/dashboard/_components/error-message";
import Loading from "@/app/dashboard/_components/loading";
import { generatePopupItem } from "@/lib/utils";
import { useEffect, useState } from "react";

const PopupForm = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const value = searchParams.get("value");
  const isDomain = type === "domain";
  const { data, isLoading, error } = useSWR<GetUserPopups>(
    `/popups?type=${type}&value=${value}`,
    fetcher
  );

  const form = useForm<z.infer<typeof popupFormSchema>>({
    resolver: zodResolver(popupFormSchema),
    defaultValues: { popups: [] },
  });

  useEffect(() => {
    if (type === "domain" && value && data?.popups.length === 0) {
      form.setValue("popups", [generatePopupItem(value)]);
    } else if (data?.popups) {
      const popupsList = data.popups.map((pop) => {
        const modifiablePopup: PopupItem = {
          id: pop.id,
          category: pop.category,
          title: pop.title,
          isOpen: false,
          domain: pop.domain.name,
          isDisabled: pop.isDisabled,
          message: pop.message,
          place: pop.place,
          sender: pop.sender,
          status: pop.status,
        };
        return modifiablePopup;
      });
      form.setValue("popups", popupsList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);

  function onSubmit(values: z.infer<typeof popupFormSchema>) {
    console.log(values);
  }

  const renderForm = () => {
    if (error) {
      return (
        <ErrorMessage message={error.response?.data?.message || "Error"} />
      );
    } else if (isLoading) {
      return <Loading />;
    } else if (data?.popups) {
      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex px-2 flex-col gap-4 basis-3/5 overflow-y-auto"
          >
            <PopupsList />

            <div className="flex items-center gap-4">
              <Button variant="outline">Test</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      );
    }
  };

  return <>{renderForm()}</>;
};

export default PopupForm;

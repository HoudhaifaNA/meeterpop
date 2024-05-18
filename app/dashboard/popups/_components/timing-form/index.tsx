"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TIMING_FORM_DEFAULT_VALUES } from "@/constants";
import { timingFormSchema } from "@/schemas";
import { TimingFormValues } from "@/types";
import API from "@/lib/API";
import notify from "@/lib/notify";
import useMutate from "@/hooks/useMutate";
import { copyScript, handleRequestError } from "@/lib/utils";
import useTimingSetter from "@/hooks/useTimingSetter";

const TimingForm = () => {
  const { refresh } = useMutate();
  const searchParams = useSearchParams();
  const [isCoppied, setCoppied] = useState(false);
  const type = searchParams.get("type");
  const value = searchParams.get("value");
  const isDomain = type === "domain";

  const form = useForm<TimingFormValues>({
    resolver: zodResolver(timingFormSchema),
    defaultValues: TIMING_FORM_DEFAULT_VALUES,
    disabled: !isDomain,
  });

  useTimingSetter(form.setValue);

  useEffect(() => {
    setTimeout(() => {
      setCoppied(false);
    }, 1000);
  }, [isCoppied]);

  async function onSubmit(values: TimingFormValues) {
    if (isDomain) {
      try {
        const res = await API.patch(`/domains/${value}`, values);

        notify("success", res.data.message);
        refresh(/^\/domains/);
        refresh(/^\/popups/);
      } catch (err) {
        handleRequestError(err);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx(
          "bg-white rounded flex flex-1 flex-col gap-4 px-6 py-4",
          !isDomain && "opacity-80"
        )}
      >
        <h4 className="font-semibold text-xl">Time settings :</h4>
        <FormField
          control={form.control}
          name="startingTime"
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>Start popup after (ms) :</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1000"
                  onChange={(e) => onChange(e.target.valueAsNumber)}
                  {...restField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="intervalTime"
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>Show another popup every (ms) :</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1000"
                  onChange={(e) => onChange(e.target.valueAsNumber)}
                  {...restField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field: { onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>Hide popup after (ms) :</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="4000"
                  onChange={(e) => onChange(e.target.valueAsNumber)}
                  {...restField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isDomain}>
          Save
        </Button>

        {isDomain && (
          <div className="flex flex-col gap-4 max-w-full">
            <span className="text-base font-semibold">
              Click to copy to clipboard
            </span>
            <code
              className="bg-blue-950 max-w-full overflow-x-auto rounded h-32 text-white p-4 cursor-pointer"
              onClick={() => {
                if (!isCoppied) {
                  setCoppied(copyScript());
                }
              }}
            >
              {isCoppied
                ? "Copied"
                : `<script src="${location.origin}/js/script.js"></script>`}
            </code>
          </div>
        )}
      </form>
    </Form>
  );
};

export default TimingForm;

"use client";

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
import { handleRequestError } from "@/lib/utils";
import useTimingSetter from "@/hooks/useTimingSetter";

const TimingForm = () => {
  const { refresh } = useMutate();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const value = searchParams.get("value");
  const isDomain = type === "domain";
  const form = useForm<TimingFormValues>({
    resolver: zodResolver(timingFormSchema),
    defaultValues: TIMING_FORM_DEFAULT_VALUES,
    disabled: !isDomain,
  });

  useTimingSetter(form.setValue);

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
      </form>
    </Form>
  );
};

export default TimingForm;

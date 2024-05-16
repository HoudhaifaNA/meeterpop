"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TIMING_FORM_DEFAULT_VALUES } from "@/constants";
import { timingFormSchema } from "@/schemas";
import { TimingFormValues } from "@/types";

const TImingForm = () => {
  const form = useForm<TimingFormValues>({
    resolver: zodResolver(timingFormSchema),
    defaultValues: TIMING_FORM_DEFAULT_VALUES,
  });

  function onSubmit(values: TimingFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white rounded flex flex-1 flex-col gap-4 px-6 py-4"
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
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default TImingForm;

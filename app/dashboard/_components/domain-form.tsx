"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { DOMAIN_FORM_DEFAULT_VALUES } from "@/constants";
import { domainFormSchema } from "@/schemas";
import { DomainFormValues } from "@/types";

const DomainForm = () => {
  const form = useForm<DomainFormValues>({
    resolver: zodResolver(domainFormSchema),
    defaultValues: DOMAIN_FORM_DEFAULT_VALUES,
  });

  function onSubmit(values: DomainFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-4"
      >
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem className="max-h-[72px] w-full sm:w-96">
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="ex: www.meetergo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-auto">
          Add
        </Button>
      </form>
    </Form>
  );
};

export default DomainForm;

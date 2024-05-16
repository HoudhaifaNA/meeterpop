"use client";

import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
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

interface DomainFormProps {
  isEdit?: boolean;
  defaultValues?: DomainFormValues;
  toggleEditIntent?: Dispatch<SetStateAction<boolean>>;
}

const DomainForm = ({
  isEdit = false,
  defaultValues = DOMAIN_FORM_DEFAULT_VALUES,
  toggleEditIntent,
}: DomainFormProps) => {
  const form = useForm<DomainFormValues>({
    resolver: zodResolver(domainFormSchema),
    defaultValues: defaultValues,
  });

  const validEditableAction = isEdit && toggleEditIntent;

  const closeEditIntent = () => validEditableAction && toggleEditIntent(false);

  function onSubmit(values: DomainFormValues) {
    console.log(values);
    closeEditIntent();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx("flex gap-4", isEdit ? "flex-col" : "items-end")}
      >
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem
              className={clsx(!isEdit && "max-h-[72px] w-full sm:w-96")}
            >
              {!isEdit && <FormLabel>Domain</FormLabel>}
              <FormControl>
                <Input placeholder="ex: www.meetergo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          {validEditableAction && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={closeEditIntent}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            className={clsx(isEdit ? "max-w-max" : "mt-auto")}
            size={isEdit ? "sm" : "default"}
          >
            {isEdit ? "Edit" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DomainForm;

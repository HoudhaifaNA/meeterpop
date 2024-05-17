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
import notify from "@/lib/notify";
import API from "@/lib/API";
import { handleRequestError } from "@/lib/utils";
import useMutate from "@/hooks/useMutate";

interface DomainFormProps {
  isEdit?: boolean;
  id?: string;
  defaultValues?: DomainFormValues;
  toggleEditIntent?: Dispatch<SetStateAction<boolean>>;
}

const DomainForm = ({
  isEdit = false,
  id,
  defaultValues = DOMAIN_FORM_DEFAULT_VALUES,
  toggleEditIntent,
}: DomainFormProps) => {
  const { refresh } = useMutate();
  const form = useForm<DomainFormValues>({
    resolver: zodResolver(domainFormSchema),
    defaultValues: defaultValues,
  });

  const validEditableAction = isEdit && toggleEditIntent;

  const closeEditIntent = () => validEditableAction && toggleEditIntent(false);

  async function onSubmit({ name }: DomainFormValues) {
    try {
      const method = isEdit && id ? "patch" : "post";
      const url = isEdit && id ? `/domains/${id}` : "/domains";

      const res = await API[method](url, {
        name,
      });

      notify("success", res.data.message);
      form.reset();
      closeEditIntent();
      refresh(/^\/domains/);
      refresh(/^\/popups/);
    } catch (err) {
      handleRequestError(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx("flex gap-4", isEdit ? "flex-col" : "items-end")}
      >
        <FormField
          control={form.control}
          name="name"
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
            disabled={form.formState.isSubmitting}
          >
            {isEdit ? "Edit" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DomainForm;

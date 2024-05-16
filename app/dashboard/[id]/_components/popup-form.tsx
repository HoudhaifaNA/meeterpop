"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { POPUPS_FORM_DEFAULT_VALUES } from "@/constants";
import { popupFormSchema } from "@/schemas";

import PopupsList from "./popups-list";

const PopupForm = () => {
  const form = useForm<z.infer<typeof popupFormSchema>>({
    resolver: zodResolver(popupFormSchema),
    defaultValues: POPUPS_FORM_DEFAULT_VALUES,
  });

  function onSubmit(values: z.infer<typeof popupFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex px-2 flex-col gap-4 basis-3/5 overflow-y-auto"
      >
        <PopupsList />
      </form>
    </Form>
  );
};

export default PopupForm;
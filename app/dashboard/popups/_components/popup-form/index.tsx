"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { popupFormSchema } from "@/schemas";

import PopupsList from "./popups-list";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/app/dashboard/_components/error-message";
import Loading from "@/app/dashboard/_components/loading";
import { usePopupManager } from "@/store";
import usePopupsSetter from "@/hooks/usePopupsSetter";
import handleKeptPopups from "./handleKeptPopups";
import { handleRequestError } from "@/lib/utils";
import notify from "@/lib/notify";
import API from "@/lib/API";
import usePopupsTesting from "@/store/usePopupsTesting";
import usePopupScript from "@/hooks/usePopupScript";
import { useSearchParams } from "next/navigation";

const PopupForm = () => {
  const searchParams = useSearchParams();
  const { toCreate, toModify, toDelete } = usePopupManager();
  const { toggleTesting } = usePopupsTesting();
  usePopupScript();

  const type = searchParams.get("type");
  const isDomain = type === "domain";

  const form = useForm<z.infer<typeof popupFormSchema>>({
    resolver: zodResolver(popupFormSchema),
    defaultValues: { popups: [] },
  });

  const { isLoading, error, data } = usePopupsSetter(form.setValue);

  async function onSubmit(values: z.infer<typeof popupFormSchema>) {
    try {
      const newPopups = values.popups.filter((p) => {
        return toCreate.includes(p.id);
      });
      const updatedPopups = values.popups.filter((p) => {
        return toModify.includes(p.id);
      });

      if (newPopups.length > 0) {
        await handleKeptPopups(newPopups, "new");
      }
      if (updatedPopups.length > 0) {
        await handleKeptPopups(updatedPopups, "update");
      }
      if (toDelete.length > 0) {
        await API.delete(`/popups/${toDelete.join(",")}`);
      }
      notify("success", "Popups updated successfully");
    } catch (err) {
      handleRequestError(err);
    }
  }

  const onTest = () => {
    toggleTesting(false);
    setTimeout(() => {
      toggleTesting(true);
    }, 100);
  };

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
            {isDomain && (
              <p className="text-sm font-semibold">
                Please, save before and testing
              </p>
            )}
            <div className="flex items-center gap-4">
              {isDomain && (
                <Button type="button" variant="outline" onClick={onTest}>
                  Test
                </Button>
              )}
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

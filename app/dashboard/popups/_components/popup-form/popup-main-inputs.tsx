import { useFormContext } from "react-hook-form";
import clsx from "clsx";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PopupFormValues } from "@/types";
import { Input } from "@/components/ui/input";
import DropzoneSpace from "./dropezone-space";

interface PopupMainInputsProps {
  index: number;
}
const PopupMainInputs = ({ index }: PopupMainInputsProps) => {
  const form = useFormContext<PopupFormValues>();
  const popups = form.watch("popups");

  const currentPopup = popups[index];
  const { id, status } = currentPopup;

  const popupBg = {
    "bg-gray-50": status === "default",
    "bg-orange-100": status === "worrying",
    "bg-red-100": status === "dangerous",
  };

  return (
    <>
      <FormField
        control={form.control}
        name={`popups.${index}.category`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category :</FormLabel>
            <FormControl>
              <Input placeholder="Tech" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className={clsx("rounded  p-2 space-y-2 border-2", popupBg)}>
        <div className="flex  sm:items-center flex-col sm:flex-row gap-4">
          <DropzoneSpace index={index} id={id} />
          <FormField
            control={form.control}
            name={`popups.${index}.sender`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Sender (source)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`popups.${index}.time`}
            render={({ field }) => (
              <FormItem className="sm:basis-28">
                <FormControl>
                  <Input placeholder="now" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={`popups.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`popups.${index}.message`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default PopupMainInputs;

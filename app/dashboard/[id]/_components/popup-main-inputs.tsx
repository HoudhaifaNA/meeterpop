import { useFormContext } from "react-hook-form";
import Image from "next/image";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PopupFormValues } from "@/types";
import { Input } from "@/components/ui/input";

interface PopupMainInputsProps {
  index: number;
}
const PopupMainInputs = ({ index }: PopupMainInputsProps) => {
  const form = useFormContext<PopupFormValues>();

  return (
    <>
      <FormField
        control={form.control}
        name={`popups.${index}.category`}
        render={({ field }) => (
          <FormItem className="max-h-[72px] w-full">
            <FormLabel>Category :</FormLabel>
            <FormControl>
              <Input placeholder="Tech" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="rounded bg-white p-2 space-y-2 border-2">
        <div className="flex items-center gap-4">
          <div className="relative min-w-16 min-h-16 cursor-pointer border-2 rounded border-black/20">
            <Image src="/placeholder.png" fill alt="a" />
          </div>
          <FormField
            control={form.control}
            name={`popups.${index}.sender`}
            render={({ field }) => (
              <FormItem className="max-h-[72px] w-full">
                <FormControl>
                  <Input placeholder="Sender (source)" {...field} />
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
            <FormItem className="max-h-[72px] w-full">
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
            <FormItem className="max-h-[72px] w-full">
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

import { useFormContext } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PopupFormValues } from "@/types";

interface StatusFieldProps {
  index: number;
}

const STATUS = ["default", "worrying", "dangerous"] as const;

const StatusField = ({ index }: StatusFieldProps) => {
  const form = useFormContext<PopupFormValues>();

  return (
    <FormField
      control={form.control}
      name={`popups.${index}.status`}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Status :</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-6 flex-col sm:flex-row"
            >
              {STATUS.map((status) => {
                return (
                  <FormItem
                    className="flex items-center space-x-3 space-y-0"
                    key={status}
                  >
                    <FormControl>
                      <RadioGroupItem value={status} />
                    </FormControl>
                    <FormLabel className="font-normal capitalize">
                      {status}
                    </FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StatusField;

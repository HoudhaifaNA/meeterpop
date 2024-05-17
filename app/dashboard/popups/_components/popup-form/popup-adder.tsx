import { useFormContext } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { generatePopupItem, togglePopupByIndex } from "@/lib/utils";
import { PopupFormValues, PopupItem } from "@/types";
import { usePopupManager } from "@/store";

interface PopupAdderProps extends Pick<PopupItem, "id"> {}

const PopupAdder = ({ id }: PopupAdderProps) => {
  const searchParams = useSearchParams();
  const { insertPopup } = usePopupManager();
  const form = useFormContext<PopupFormValues>();

  const popups = form.watch("popups");
  const type = searchParams.get("type");
  const value = searchParams.get("value");
  const isDomain = type === "domain";

  const addPopup = () => {
    if (isDomain && value) {
      const prevPopups = togglePopupByIndex(popups, id, false);
      const newPopup = generatePopupItem(value);
      insertPopup("toCreate", newPopup.id);
      form.setValue("popups", [...prevPopups, newPopup]);
    }
  };

  return (
    <>
      {isDomain && (
        <Button
          variant="outline"
          type="button"
          className="max-w-max"
          onClick={addPopup}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add another one
        </Button>
      )}
    </>
  );
};

export default PopupAdder;

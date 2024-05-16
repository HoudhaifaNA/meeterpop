import { useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { generatePopupItem, togglePopupByIndex } from "@/lib/utils";
import { PopupFormValues, PopupItem } from "@/types";

interface PopupAdderProps extends Pick<PopupItem, "id"> {}

const PopupAdder = ({ id }: PopupAdderProps) => {
  const form = useFormContext<PopupFormValues>();
  const popups = form.watch("popups");

  const addPopup = () => {
    const prevPopups = togglePopupByIndex(popups, id, false);
    form.setValue("popups", [...prevPopups, generatePopupItem()]);
  };

  return (
    <Button variant="outline" className="max-w-max" onClick={addPopup}>
      <Plus className="w-4 h-4 mr-2" />
      Add another one
    </Button>
  );
};

export default PopupAdder;
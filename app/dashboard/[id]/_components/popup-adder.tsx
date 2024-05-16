import { useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";
import { togglePopupByIndex } from "@/lib/utils";
import { PopupFormValues, PopupItem } from "@/types";

interface PopupAdderProps extends Pick<PopupItem, "id"> {}

const PopupAdder = ({ id }: PopupAdderProps) => {
  const form = useFormContext<PopupFormValues>();
  const popups = form.watch("popups");

  // We add a popup and close the last one to let user see the new one
  // We put the new popup object without using NEW_POPUP, because it will have the same id as the one before
  const addPopup = () => {
    const prevPopups = togglePopupByIndex(popups, id, false);
    form.setValue("popups", [
      ...prevPopups,
      {
        id: nanoid(),
        isOpen: true,
        category: "General",
        icon: "",
        sender: "",
        title: "",
        message: "",
        place: "top_right",
        status: "default",
      },
    ]);
  };
  return (
    <Button variant="outline" className="max-w-max" onClick={addPopup}>
      <Plus className="w-4 h-4 mr-2" />
      Add another one
    </Button>
  );
};

export default PopupAdder;

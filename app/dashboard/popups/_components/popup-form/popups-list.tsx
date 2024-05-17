"use client";
import { useFormContext } from "react-hook-form";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { PopupFormValues } from "@/types";
import PopupPlaceSelector from "./popup-place-selector";
import StatusField from "./status-field";
import PopupItemActions from "./popup-item-actions";
import PopupMainInputs from "./popup-main-inputs";
import PopupAdder from "./popup-adder";
import { togglePopupByIndex } from "@/lib/utils";

const PopupsList = () => {
  const form = useFormContext<PopupFormValues>();
  const popups = form.watch("popups");

  const renderPopups = () => {
    return popups.map(({ id, isOpen, place }, index) => {
      const popupNumber = index + 1;

      const onOpenChange = (state: boolean) => {
        const updatedPopups = togglePopupByIndex(popups, id, state);
        form.setValue("popups", updatedPopups);
      };

      return (
        <Collapsible
          open={isOpen}
          onOpenChange={onOpenChange}
          className="flex flex-col gap-8 bg-white rounded border-2 border-black/15 p-4 w-full"
          key={id}
        >
          <PopupItemActions {...{ popupNumber }} />
          <CollapsibleContent className="space-y-4">
            <PopupMainInputs index={index} />
            <PopupPlaceSelector {...{ id, place }} />
            <StatusField index={index} />
          </CollapsibleContent>
          {popups.length === popupNumber && <PopupAdder id={id} />}
        </Collapsible>
      );
    });
  };

  return (
    <div className="border-b-2 border-b-black/35  pb-4 space-y-4">
      {renderPopups()}
    </div>
  );
};

export default PopupsList;

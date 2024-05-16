import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { ChevronDown, Eye, EyeOff, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { PopupFormValues, PopupItem } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PopupItemActionsProps extends Pick<PopupItem, "id" | "isOpen"> {
  popupNumber: number;
}

const PopupItemActions = ({
  popupNumber,
  id,
  isOpen,
}: PopupItemActionsProps) => {
  const form = useFormContext<PopupFormValues>();
  const popups = form.watch("popups");
  const currentPopup = popups[popupNumber - 1];

  const deletePopup = () => {
    if (popups.length > 1) {
      const filteredPopups = popups.filter((popup) => popup.id !== id);
      form.setValue("popups", filteredPopups);
    }
  };

  return (
    <div className="flex sm:items-center gap-4 justify-between flex-col sm:flex-row">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium">Notification {popupNumber} : </h2>
        <span className="text-sm">( {currentPopup.domain} )</span>
      </div>
      <div className="flex items-center ml-auto sm:ml-0 gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CollapsibleTrigger asChild>
                <Button type="button" variant="outline" size="icon">
                  <ChevronDown
                    className={clsx("h-4 w-4", isOpen && "rotate-180")}
                  />
                </Button>
              </CollapsibleTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Expand</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="outline" size="icon">
                <EyeOff className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Disable</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={deletePopup}
              >
                <Trash2 className="h-4 w-4 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PopupItemActions;

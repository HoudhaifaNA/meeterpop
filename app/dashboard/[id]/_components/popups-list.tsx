"use client";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { ChevronDown, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PopupFormValues } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PopupPlaceSelector from "./popup-place-selector";
import StatusField from "./status-field";

const togglePopupByIndex = (
  popups: PopupFormValues["popups"],
  id: string,
  state: boolean
) => {
  return popups.map((popup) => {
    if (popup.id === id) {
      popup.isOpen = state;
    }
    return popup;
  });
};

const PopupsList = () => {
  const form = useFormContext<PopupFormValues>();
  const popups = form.watch("popups");

  const renderPopups = () => {
    return popups.map(({ id, isOpen, place, status }, index) => {
      const popupNumber = index + 1;
      const onOpenChange = (state: boolean) => {
        const updatedPopups = togglePopupByIndex(popups, id, state);
        form.setValue("popups", updatedPopups);
      };

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

      const deletePopup = () => {
        if (popups.length > 1) {
          const filteredPopups = popups.filter((popup) => popup.id !== id);
          form.setValue("popups", filteredPopups);
        }
      };

      return (
        <Collapsible
          open={isOpen}
          onOpenChange={onOpenChange}
          className="flex flex-col gap-4  bg-white rounded border-2 border-black/15 p-4 w-full"
          key={id}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-medium">
                Notification {popupNumber} :{" "}
              </h2>
              <span className="text-sm">(www.figma.com)</span>
            </div>
            <div className="flex items-center gap-4">
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
          <CollapsibleContent className="space-y-4">
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
            <PopupPlaceSelector {...{ id, place }} />
            <StatusField index={index} />
          </CollapsibleContent>
          {popups.length === popupNumber && (
            <Button variant="outline" className="max-w-max" onClick={addPopup}>
              <Plus className="w-4 h-4 mr-2" />
              Add another one
            </Button>
          )}
        </Collapsible>
      );
    });
  };

  return <>{renderPopups()}</>;
};

export default PopupsList;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import { PopupFormValues, PopupItem } from "@/types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import clsx from "clsx";

interface DropzoneProps extends Pick<PopupItem, "id"> {
  index: number;
}

const DropzoneSpace = ({ index, id }: DropzoneProps) => {
  const form = useFormContext<PopupFormValues>();
  const [file, setFile] = useState<File>();
  const [base64, setBase64] = useState<string>();
  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".webp"] },
    multiple: false,
  });

  const popups = form.watch("popups");
  const currentPopup = popups[index];
  const { icon } = currentPopup;

  const setIcon = (icon: File) => {
    const updatedPopups = popups.map((popup) => {
      if (popup.id === id) {
        popup.icon = icon;
      }
      return popup;
    });

    form.setValue("popups", updatedPopups);
  };

  const resetFile = () => {
    setFile(undefined);
  };

  // Set Icon anyway, if undefined form schema will throw the error
  useEffect(() => {
    setIcon(file!);
  }, [file, JSON.stringify(popups)]);

  // Add icon on normal use case
  useEffect(() => {
    setFile(acceptedFiles[0]);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        if (typeof reader.result === "string") {
          setBase64(reader.result);
        }
      };
    });
  }, [acceptedFiles]);

  // Add icon on (edit) use case it will be string from attachments before ex: /attachments/gmail-2323941sdaad23.png
  // So we will send it to the server always as a file
  useEffect(() => {
    if (typeof icon === "string") {
      fetch(`/assets/${icon}`)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();

          reader.onload = function () {
            if (typeof reader.result === "string") {
              const base64Data = reader.result;

              const [, contentType, data] =
                /^data:(.*);base64,(.*)$/.exec(base64Data) || [];

              if (contentType && data) {
                const byteCharacters = atob(data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                const blob = new Blob([byteArray], { type: contentType });

                const file = new File([blob], icon, { type: contentType });

                setBase64(base64Data);
                setFile(file);
              }
            }
          };

          reader.readAsDataURL(blob);
        })
        .catch((error) => {
          console.error("Error fetching the image:", error);
        });
    }
  }, [icon, JSON.stringify(popups)]);

  return (
    <FormField
      control={form.control}
      name={`popups.${index}.icon`}
      render={({ fieldState }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <div
              className={clsx(
                "relative min-w-16 min-h-16 max-w-16 max-h-16 cursor-pointer border-2 rounded",
                fieldState.error ? "border-red-500" : "border-black/20"
              )}
              onClick={resetFile}
              {...getRootProps()}
            >
              <input {...getInputProps()} className="hidden" />
              <Image
                src={file && base64 ? base64 : "/placeholder.png"}
                fill
                alt={file?.name || `Popup Icon`}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default DropzoneSpace;

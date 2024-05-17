import { Dispatch, SetStateAction } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useMutate from "@/hooks/useMutate";
import API from "@/lib/API";
import notify from "@/lib/notify";
import { handleRequestError } from "@/lib/utils";

interface DeleteDialogProps {
  name: string;
  id: string;
  isOpen: boolean;
  toggleDialog: Dispatch<SetStateAction<boolean>>;
}

const DeleteDialog = ({ isOpen, id, name }: DeleteDialogProps) => {
  const { refresh } = useMutate();

  const onDelete = async () => {
    try {
      await API.delete(`/domains/${id}`);

      notify("success", `${name} delete successfully`);
      refresh(/^\/domains/);
      refresh(/^\/popups/);
    } catch (err) {
      handleRequestError(err);
    }
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete popups with the {name}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;

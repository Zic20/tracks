import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

function DialogBox({ triggerTitle, title, description, actionTitle, action }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-500 p-2 rounded text-white w-max">
        {triggerTitle}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-100 text-black">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-500 text-white">
            Cancel
          </AlertDialogCancel>

          <Button onClick={action} className="bg-green-300">
            {actionTitle}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DialogBox;

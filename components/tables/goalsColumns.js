import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import GoalsForm from "../forms/GoalsForm";

export default function activitiesColumns({
  onSubmitHandler,
  onDeleteHandler,
}) {
  return [
    {
      id: "Goal",
      accessorKey: "Goal",
      header: "Goal",
    },

    {
      id: "StartDate",
      accessorKey: "StartDate",
      header: "Start Date",
      cell: ({ row }) => {
        const goal = row.original;
        return <p>{goal.StartDate}</p>;
      },
    },

    {
      id: "EndDate",
      accessorKey: "EndDate",
      header: "End Date",
      cell: ({ row }) => {
        const goal = row.original;
        return <p>{goal.EndDate}</p>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const goal = row.original;
        function deleteGoal() {
          onDeleteHandler(goal.id);
        }
        return (
          <div className="flex gap-2">
            <Sheet className="p-1">
              <SheetTrigger className="bg-black text-white py-1 px-2 rounded">
                Edit
              </SheetTrigger>
              <SheetContent className="px-5">
                <SheetHeader>
                  <SheetTitle>Edit task</SheetTitle>
                </SheetHeader>
                <SheetDescription></SheetDescription>
                <GoalsForm
                  method="PATCH"
                  goal={goal}
                  onSubmit={onSubmitHandler}
                />
              </SheetContent>
            </Sheet>

            <AlertDialog>
              <AlertDialogTrigger className="bg-red-500 p-2 rounded text-white">
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-slate-100 text-black">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this goal.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-red-500 text-white">
                    Cancel
                  </AlertDialogCancel>

                  <Button onClick={deleteGoal} className="bg-green-300">
                    Continue
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];
}

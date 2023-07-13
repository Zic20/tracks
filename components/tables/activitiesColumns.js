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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ActivityForm from "@/components/forms/ActivityForm";

import { convertTime } from "@/modules/timecalculation";
export default function activitiesColumns({
  activitytypes,
  agencies,
  onSubmitHandler,
  onDeleteHandler,
}) {
  return [
    {
      id: "Date",
      accessorKey: "Date",
      header: ({ column }) => {
        return (
          <div className="text-left p-0">
            Date
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
    {
      id: "Activity",
      accessorKey: "Activity",
      header: "Task",
    },

    {
      id: "StartTime",
      accessorKey: "StartTime",
      header: "Start Time",
      cell: ({ row }) => {
        const activity = row.original;
        return <p>{activity.StartTime}</p>;
      },
    },

    {
      id: "EndTime",
      accessorKey: "EndTime",
      header: "End Time",
      cell: ({ row }) => {
        const activity = row.original;
        return <p>{activity.EndTime}</p>;
        // return <p>{convertTime(activity.EndTime)}</p>;
      },
    },
    {
      id: "TimeInput",
      accessorKey: "TimeInput",
      header: "Time Input",
      cell: ({ row }) => {
        const activity = row.original;
        return <p>{activity.TimeInput}</p>;
      },
    },
    {
      id: "agencies_id",
      accessorKey: "agencies_id",
      header: "Location",
      cell: ({ row }) => {
        const location = agencies.filter(
          (agency) => +agency.id === +row.original.agencies_id
        );

        return <p>{location[0] ? location[0].Name : ""}</p>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const activity = row.original;
        function deleteActivity() {
          onDeleteHandler(activity.id);
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
                <ActivityForm
                  activitytypes={activitytypes}
                  agencies={agencies}
                  onSubmit={onSubmitHandler}
                  activity={activity}
                  method="PATCH"
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
                    this task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-red-500 text-white">
                    Cancel
                  </AlertDialogCancel>

                  <Button onClick={deleteActivity} className="bg-green-300">
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

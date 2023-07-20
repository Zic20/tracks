import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import ActivityForm from "@/components/forms/ActivityForm";
import DialogBox from "../utilities/DialogBox";
import SideSheet from "../SideSheet";
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
            <SideSheet triggerTitle="Edit" title="Edit task">
              <ActivityForm
                activitytypes={activitytypes}
                agencies={agencies}
                onSubmit={onSubmitHandler}
                activity={activity}
                method="PATCH"
              />
            </SideSheet>

            <DialogBox
              triggerTitle={"Delete"}
              title={"Delete Task"}
              description={"Are you sure you want to delete this task?"}
              actionTitle={"Delete"}
              action={deleteActivity}
            />
          </div>
        );
      },
    },
  ];
}

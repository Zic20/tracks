import GoalsForm from "../forms/GoalsForm";
import SideSheet from "../SideSheet";
import DialogBox from "../utilities/DialogBox";

// import { DataTableRowActions } from "./DatableRowActions";
import { DataTableColumnHeader } from "./DataTableHeader";

export default function activitiesColumns({
  onSubmitHandler,
  onDeleteHandler,
  hasAction = true,
}) {
  if (!hasAction) {
    return [
      {
        id: "Goal",
        accessorKey: "Goal",
        header: "Goal",
        enableSorting: true,
        enableHiding: true,
        filterEnabled: false,
      },

      {
        id: "StartDate",
        accessorKey: "StartDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={"Start Date"} />
        ),
        cell: ({ row }) => {
          const goal = row.original;
          return <p>{goal.StartDate}</p>;
        },
        filterEnabled: false,
      },

      {
        id: "EndDate",
        accessorKey: "EndDate",
        header: "End Date",
        cell: ({ row }) => {
          const goal = row.original;
          return <p>{goal.EndDate}</p>;
        },
        filterEnabled: false,
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
              <SideSheet triggerTitle="Edit" title="Edit goal">
                <GoalsForm
                  method="PATCH"
                  goal={goal}
                  onSubmit={onSubmitHandler}
                />
              </SideSheet>
              <DialogBox
                triggerTitle={"Delete"}
                title={"Are you absolutely sure?"}
                description={
                  "This action cannot be undone. This will permenently delete this goal."
                }
                action={deleteGoal}
                actionTitle={"Delete"}
              />
            </div>
          );
        },
      },
    ];
  } else {
    return [
      {
        id: "Goal",
        accessorKey: "Goal",
        header: "Goal",
        enableSorting: true,
        enableHiding: true,
        filterEnabled: false,
      },

      {
        id: "StartDate",
        accessorKey: "StartDate",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="bg-white text-black"
            column={column}
            title="Start Date"
          />
        ),
        cell: ({ row }) => {
          const goal = row.original;
          return <p>{goal.StartDate}</p>;
        },
        filterEnabled: false,
      },

      {
        id: "EndDate",
        accessorKey: "EndDate",
        header: ({ column }) => (
          <DataTableColumnHeader
            className="bg-white text-black"
            column={column}
            title="End Date"
          />
        ),
        cell: ({ row }) => {
          const goal = row.original;
          return <p>{goal.EndDate}</p>;
        },
        filterEnabled: false,
      },
    ];
  }
}

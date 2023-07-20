import GoalsForm from "../forms/GoalsForm";
import SideSheet from "../SideSheet";
import DialogBox from "../utilities/DialogBox";

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
}

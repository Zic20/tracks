import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { MyDialog } from "../utilities/MyDialog";
import DialogBox from "../utilities/DialogBox";
import { useToast } from "../ui/use-toast";
import TeamForm from "../forms/TeamForm";

export const teamColumns = (onDelete, onSubmit) => {
  return [
    {
      id: "StaffName",
      accessorKey: "StaffName",
      header: ({ column }) => {
        return (
          <div className="text-left p-0">
            Name
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
      id: "Role",
      accessorKey: "Role",
      header: ({ column }) => {
        return (
          <div className="text-left p-0">
            Role
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
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const teamMember = row.original;
        function handleDelete() {
          onDelete(teamMember.id);
        }

        function handleSubmit(data, action) {
          onSubmit(data, action);
        }
        return (
          <div className="flex gap-2">
            <MyDialog title={"Edit"}>
              <TeamForm
                member={teamMember}
                method="update"
                onSubmit={handleSubmit}
              />
            </MyDialog>
            <DialogBox
              triggerTitle={"Delete"}
              title={"Are you absolutely sure?"}
              description={
                "This action cannot be undone. This will permenently remove the staff from this project"
              }
              actionTitle={"Delete"}
              action={handleDelete}
            />
          </div>
        );
      },
    },
  ];
};

import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import DialogBox from "../utilities/DialogBox";
import SideSheet from "../SideSheet";
import TeamForm from "../forms/TeamForm";
import TasksForm from "../forms/TasksForm";

export const tasksColumns = (
  onDelete,
  onSubmit,
  isAdmin,
  { project, stafflist, projectTasks }
) => {
  if (isAdmin) {
    return [
      {
        id: "Task",
        accessorKey: "Task",
        header: ({ column }) => {
          return (
            <div className="text-left p-0">
              Task
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
        id: "Status",
        accessorKey: "Status",
        header: ({ column }) => {
          return (
            <div className="text-left p-0">
              Status
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
        id: "Priority",
        accessorKey: "Priority",
        header: ({ column }) => {
          return (
            <div className="text-left p-0">
              Priority
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
        id: "Deadline",
        accessorKey: "Deadline",
        header: ({ column }) => {
          return (
            <div className="text-left p-0">
              Due Date
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
        id: "StaffName",
        accessorKey: "StaffName",
        header: ({ column }) => {
          return (
            <div className="text-left p-0">
              Assigned To
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
        header: "Actions",
        cell: ({ row }) => {
          const task = row.original;
          function deleteGoal() {
            onDelete(task.id);
          }

          function handleSubmit(data, action) {
            onSubmit(data, action);
          }
          return (
            <div className="flex gap-2">
              <SideSheet triggerTitle="Edit" title="Edit Task">
                <TasksForm
                  projectTasks={projectTasks}
                  stafflist={stafflist}
                  project={project}
                  task={task}
                  method="PATCH"
                  onSubmit={handleSubmit}
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
        id: "Task",
        accessorKey: "Task",
        header: ({ column }) => {
          return (
            <div className="text-left p-0">
              Task
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
        id: "Status",
        accessorKey: "Status",
        header: ({ column }) => {
          return (
            <div className="text-left p-0">
              Status
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
        id: "Priority",
        accessorKey: "Priority",
        header: ({ column }) => {
          return (
            <div className="text-left p-0">
              Priority
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
        id: "Deadline",
        accessorKey: "Deadline",
        header: ({ column }) => {
          return (
            <div className="text-left p-0">
              Due Date
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
        id: "StaffName",
        accessorKey: "StaffName",
        header: ({ column }) => {
          return (
            <div className="text-left p-0">
              Assigned To
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
    ];
  }
};

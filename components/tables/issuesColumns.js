import { ArrowUpDown, EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { getDateString } from "@/modules/timecalculation";

export const issuesColumns = (usertype) => {
  return [
    {
      id: "Title",
      accessorKey: "Title",
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
      id: "ProductName",
      accessorKey: "ProductName",
      header: ({ column }) => {
        return (
          <div className="text-left p-0">
            Product
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
      id: "Agency",
      accessorKey: "Agency",
      header: ({ column }) => {
        return (
          <div className="text-left p-0">
            Client
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
      id: "status",
      accessorKey: "status",
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
      id: "priority",
      accessorKey: "priority",
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
      id: "created_at",
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <div className="text-left p-0">
            Created On
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
      cell: ({ row }) => {
        const issue = row.original;
        return <div>{getDateString(issue.created_at)}</div>;
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
      header: "View",
      cell: ({ row }) => {
        const issue = row.original;

        function goToIssue() {
          alert(issue.id);
        }

        return (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={goToIssue}>
              <EyeIcon className="ml-2 h-6 w-6" />
            </Button>
          </div>
        );
      },
    },
  ];
  // } else if(usertype === "Staff"){

  // } else {
  //   return [
  //     {
  //       id: "Task",
  //       accessorKey: "Task",
  //       header: ({ column }) => {
  //         return (
  //           <div className="text-left p-0">
  //             Task
  //             <Button
  //               variant="ghost"
  //               onClick={() =>
  //                 column.toggleSorting(column.getIsSorted() === "asc")
  //               }
  //             >
  //               <ArrowUpDown className="ml-2 h-4 w-4" />
  //             </Button>
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       id: "Status",
  //       accessorKey: "Status",
  //       header: ({ column }) => {
  //         return (
  //           <div className="text-left p-0">
  //             Status
  //             <Button
  //               variant="ghost"
  //               onClick={() =>
  //                 column.toggleSorting(column.getIsSorted() === "asc")
  //               }
  //             >
  //               <ArrowUpDown className="ml-2 h-4 w-4" />
  //             </Button>
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       id: "Priority",
  //       accessorKey: "Priority",
  //       header: ({ column }) => {
  //         return (
  //           <div className="text-left p-0">
  //             Priority
  //             <Button
  //               variant="ghost"
  //               onClick={() =>
  //                 column.toggleSorting(column.getIsSorted() === "asc")
  //               }
  //             >
  //               <ArrowUpDown className="ml-2 h-4 w-4" />
  //             </Button>
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       id: "Deadline",
  //       accessorKey: "Deadline",
  //       header: ({ column }) => {
  //         return (
  //           <div className="text-left p-0">
  //             Due Date
  //             <Button
  //               variant="ghost"
  //               onClick={() =>
  //                 column.toggleSorting(column.getIsSorted() === "asc")
  //               }
  //             >
  //               <ArrowUpDown className="ml-2 h-4 w-4" />
  //             </Button>
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       id: "StaffName",
  //       accessorKey: "StaffName",
  //       header: ({ column }) => {
  //         return (
  //           <div className="text-left p-0">
  //             Assigned To
  //             <Button
  //               variant="ghost"
  //               onClick={() =>
  //                 column.toggleSorting(column.getIsSorted() === "asc")
  //               }
  //             >
  //               <ArrowUpDown className="ml-2 h-4 w-4" />
  //             </Button>
  //           </div>
  //         );
  //       },
  //     },
  //   ];
  // }
};

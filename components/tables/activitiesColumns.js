import { EyeIcon, ArrowUpDown, Edit2Icon, Trash } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";

export const columns = [
  {
    id: "Date",
    accessorKey: "Date",
    header: ({ column }) => {
      return (
        <div className="text-left p-0">
          Date
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
  },

  {
    id: "EndTime",
    accessorKey: "EndTime",
    header: "End Time",
  },
  {
    id: "TimeInput",
    accessorKey: "TimeInput",
    header: "Time Input",
  },
  {
    id: "agencies_id",
    accessorKey: "agencies_id",
    header: "Location",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const staff = row.original;
      return (
        <div className="flex gap-2">
          <Link className="text-blue text-center" href={"/staff/" + staff.id}>
            <Edit2Icon />
          </Link>
          <Link className="text-blue text-center" href={"/staff/" + staff.id}>
            <Trash />
          </Link>
        </div>
      );
    },
  },
];

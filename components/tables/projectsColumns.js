import { EyeIcon, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";

export const columns = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="text-left p-0">
          #
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
    id: "Name",
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <div className="text-left p-0">
          Name
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
    id: "StartDate",
    accessorKey: "StartDate",
    header: ({ column }) => {
      return (
        <div className="text-left p-0">
          Start Date
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
    id: "Deadline",
    accessorKey: "Deadline",
    header: ({ column }) => {
      return (
        <div className="text-left p-0">
          Deadline
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
    id: "ClientName",
    accessorKey: "ClientName",
    header: "Client",
  },
  {
    id: "Type",
    accessorKey: "Type",
    header: "Project Type",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <Link className="text-blue text-center" href={`/project/${project.id}`}>
          <EyeIcon />
        </Link>
      );
    },
  },
];

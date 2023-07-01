import { EyeIcon, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";

export const columns = [
  {
    id: "FirstName",
    accessorKey: "FirstName",
    header: ({ column }) => {
      return (
        <div className="text-left p-0">
          First Name
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
    id: "MiddleName",
    accessorKey: "MiddleName",
    header: ({ column }) => {
      return (
        <div className="text-left p-0">
          Middle Name
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
    id: "LastName",
    accessorKey: "LastName",
    header: ({ column }) => {
      return (
        <div className="text-left p-0">
          Last Name
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
    id: "Email",
    accessorKey: "Email",
    header: "Email",
  },
  {
    id: "PhoneNo",
    accessorKey: "PhoneNo",
    header: "Phone",
  },
  {
    id: "Position",
    accessorKey: "Position",
    header: "Position",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const staff = row.original;
      return (
        <Link className="text-blue text-center" href={"/staff/" + staff.id}>
          <EyeIcon />
        </Link>
      );
    },
  },
];

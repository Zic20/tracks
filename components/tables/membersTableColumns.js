import { EyeIcon, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";

export const columns = [
  {
    id: "name",
    accessorKey: "name",
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
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: "Phone",
  },
  {
    id: "address",
    accessorKey: "address",
    header: "Address",
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

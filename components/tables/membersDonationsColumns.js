import { EyeIcon, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";

export const columns = [
  {
    id: "date",
    accessorKey: "date",
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
    id: "reference",
    accessorKey: "reference",
    header: "Reference",
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: "Amount",
  },
  {
    id: "fund",
    accessorKey: "fund",
    header: "Fund",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Transaction Status",
  },
];

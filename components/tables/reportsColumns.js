import { EyeIcon, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export const reportColumns = (onRowSelection) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={async (value) => {
            await table.toggleAllPageRowsSelected(!!value);
            if (value) {
              const selectedRows = table
                .getSelectedRowModel()
                .flatRows.map((row) => row.original.id);
              onRowSelection("add", selectedRows);
            } else {
              onRowSelection("remove_all");
            }
          }}
          aria-label="Select all"
          className="translate-y-[2px] border border-black"
        />
      ),
      cell: ({ row }) => {
        let id = row.original.id;
        return (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={async (value) => {
              await row.toggleSelected(!!value);
              if (value) {
                onRowSelection("add", [id]);
              } else {
                onRowSelection("remove", [id]);
              }
            }}
            aria-label="Select row"
            className="translate-y-[2px] border border-black"
            value={id}
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
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
      id: "Position",
      accessorKey: "Position",
      header: "Position",
    },
  ];
};

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={async (value) => {
          await table.toggleAllPageRowsSelected(!!value);
          const selectedRows = table
            .getSelectedRowModel()
            .flatRows.map((row) => row.original);
          console.log(selectedRows);
        }}
        aria-label="Select all"
        className="translate-y-[2px] border border-black"
      />
    ),
    cell: ({ row }) => {
      let id = row.original.id;

      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px] border border-black"
          value={id}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
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
    id: "Position",
    accessorKey: "Position",
    header: "Position",
  },
];

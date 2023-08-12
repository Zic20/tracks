"use client";

import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/tables/DataTableViewOptions";

import { DataTableFacetedFilter } from "@/components/tables/DataTableFacetedFilter";

export function DataTableToolbar({ table, columns, searchColumn }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center space-x-2">
        {searchColumn && (
          <Input
            placeholder="Search"
            value={table.getColumn(searchColumn)?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {columns &&
          columns.map((col) => {
            const accessorKey = col?.accessorKey;
            const tableColumn = table.getColumn(accessorKey);

            if (tableColumn && col?.filterEnabled) {
              return (
                <DataTableFacetedFilter
                  column={tableColumn}
                  title={col?.header}
                  options={[]}
                  className="w-[150px] lg:w-[250px]"
                  key={accessorKey}
                />
              );
            }
          })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

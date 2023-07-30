import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function SideSheet({ children, title, triggerTitle }) {
  return (
    <Sheet className="p-1">
      <SheetTrigger className="bg-black text-white py-1 px-2 rounded w-max">
        {triggerTitle}
      </SheetTrigger>
      <SheetContent className="px-5">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <SheetDescription></SheetDescription>
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default SideSheet;

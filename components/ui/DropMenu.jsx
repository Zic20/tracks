import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function DropMenu({ title, items }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-medium">{title}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-black">
        {items.map((item) => (
          <DropdownMenuItem className="hover:bg-slate-400" key={item.title}>
            <Link href={item.link}>{item.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

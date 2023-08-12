import Link from "next/link";
import { UserNav } from "@/components/ui/UserNav";

export default function AdminNav({ className, ...props }) {
  return (
    <div className="border-b bg-white text-black sticky top-0">
      <div className="flex h-16 items-center px-4">
        <nav
          className={"flex items-center space-x-4 lg:space-x-6 " + className}
          {...props}
        >
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/staff"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Staff
          </Link>

          <Link
            href="/clients"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Clients
          </Link>

          <Link
            href="/projects/admin"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Projects
          </Link>

          <Link
            href="/examples/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Reports
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
}

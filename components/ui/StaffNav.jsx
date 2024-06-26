import Link from "next/link";
import { UserNav } from "@/components/ui/UserNav";
import DropMenu from "./DropMenu";

export default function StaffNav({ className, staffid }) {
  return (
    <div className="border-b bg-white text-black sticky top-0 z-10">
      <div className="flex h-16 items-center px-4">
        <nav
          className={"flex items-center space-x-4 lg:space-x-6 " + className}
        >
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href={`/goals/${staffid}`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Goals
          </Link>
          <Link
            href={`/tasks/${staffid}`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Tasks
          </Link>
          <Link
            href={`/projects/staff/${staffid}`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Projects
          </Link>
          {/* <DropMenu
            title="Reports"
            items={[
              {
                title: "Goals",
                link: `/reports/goals/${staffid}`,
              },
              { title: "Tasks", link: `/reports/tasks/${staffid}` },
              { title: "Projects", link: `/reports/projects/${staffid}` },
            ]}
          /> */}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
}

import { Activity, UserCircle, Users, WorkflowIcon } from "lucide-react";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PendingTasks } from "@/components/RecentActivities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDateString } from "@/modules/timecalculation";

export const metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

export default function AdminDashboard({ data }) {
  const { projects, staff, tasks, clients } = data;
  console.log(projects);
  const ongoingProjects = projects.filter(
    (project) => project.Status === "In Progress"
  );

  const completedProjects = projects.filter(
    (project) => project.Status === "Completed"
  );

  const pendingTasks = tasks.filter(
    (task) => task.Status === "Not Started" || task.Status === "In Progress"
  );

  const formatedTask = pendingTasks.map((task, index) => {
    const date = dayjs(task.Deadline).diff(dayjs(), "day");
    return {
      id: task.TaskID,
      title: `${task.Task} (${task.ProjectName})`,
      date: task.StartDate,
      deadline: date > 0 ? `Due in ${date} days` : "Overdue",
    };
  });

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff}</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <UserCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients > 0 ? clients - 1 : clients}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <WorkflowIcon className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Projects
            </CardTitle>
            <Activity className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        <Card className="col-span-6 sm:w-full bg-white">
          <CardHeader>
            <CardTitle>Ongoing Projects</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {ongoingProjects.map((project) => {
              return (
                <div
                  key={project.id}
                  className="flex items-center last:border-b-0 border-b py-2"
                >
                  <Avatar className="h-9 w-9" key={project.id}>
                    <AvatarImage src={project.image} alt="Avatar" />
                    <AvatarFallback>
                      {project.Name[0].toUpperCase() +
                        project.Name[1].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1" key={`act${project.id}`}>
                    <p className="text-sm font-medium leading-none">
                      {project.Name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Date: {getDateString(project?.Deadline)}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="col-span-6 w-full bg-white">
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>
              You have {formatedTask.length} pending tasks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PendingTasks tasks={formatedTask} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

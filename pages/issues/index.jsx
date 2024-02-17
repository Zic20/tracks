import { Activity, UserCircle, Users, WorkflowIcon } from "lucide-react";
import Cookies from "cookies";
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
import Head from "next/head";

export const metadata = {
  title: "Issues",
  description: "Issues Dashboard",
};

export default function IssuesDashboard({ data }) {
  const { projects, staff, tasks, clients } = data;
  const ongoingProjects = projects.filter(
    (project) => project.Status !== "Completed"
  );

  const completedProjects = projects.filter(
    (project) => project.Status === "Completed"
  );

  const formatedTask = tasks
    .filter((task) => task.Status !== "Completed")
    .sort((a, b) => {
      return dayjs(a.Deadline).diff(dayjs(b.Deadline));
    })
    .filter((task) => {
      return dayjs(task.Deadline).diff(dayjs(), "day") >= -30;
    })
    .map((task) => {
      const date = dayjs(task.Deadline).diff(dayjs(), "day");

      return {
        id: task.id,
        title: `${task.Task} (${task.ProjectName})`,
        date: task.StartDate,

        deadline:
          date > 0
            ? `Due in ${date} day${date > 1 ? "s" : ""}`
            : date === 0
            ? "Today"
            : "Overdue",
      };
    });
  return (
    <>
      <Head>
        <title>Issues</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-100 min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reported Issues
                </CardTitle>
                <Users className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{staff}</div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Resolved Issues
                </CardTitle>
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
                  Unesolved Issues
                </CardTitle>
                <WorkflowIcon className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.length}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="w-full bg-white">
            <CardHeader>
              <CardTitle>Ongoing Projects</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {ongoingProjects.map((project) => {
                return (
                  <div
                    key={"pr" + project.id}
                    className="flex items-center last:border-b-0 border-b py-2"
                  >
                    <Avatar className="h-9 w-9" key={"pr" + project.id}>
                      <AvatarImage src={project.image} alt="Avatar" />
                      <AvatarFallback>
                        {project.Name[0].toUpperCase() +
                          project.Name[1].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1" key={`${project.id}`}>
                      <p className="text-sm font-medium leading-none">
                        {project.Name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Deadline: {getDateString(project?.Deadline)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get("access");
  const apiUrl = process.env.API_url;

  if (!accessToken) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const response = await fetch(`${apiUrl}/adminreports`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return {
      props: {
        data: {
          projects: [],
          staff: 0,
          tasks: [],
          clients: 0,
        },
      },
    };
  }

  const responseData = await response.json();

  return {
    props: {
      data: responseData.data,
    },
  };
}

import Head from "next/head";
import { Activity, ActivityIcon, Users } from "lucide-react";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RecentActivities, { PendingTasks } from "@/components/RecentActivities";
import { Overview } from "@/components/Overview";
import Cookies from "cookies";
import { DatePickerWithRange } from "@/components/ui/DatePicker";

export const metadata = {
  title: "Dashboard",
  description: "Staff dashboard.",
};

export default function Staff({ data }) {
  const { projects, tasks, activities, goals } = data;
  const ongoingProjects = projects.filter(
    (project) => project.Status === "In Progress"
  );

  const completedProjects = projects.filter(
    (project) => project.Status === "Completed"
  );

  const pendingTasks = tasks.filter(
    (task) => task.Status === "Not Started" || task.Status === "In Progress"
  );

  const formatedTask = pendingTasks.map((task) => {
    const date = dayjs(task.Deadline).diff(dayjs(), "day");
    return {
      id: task.TaskID,
      title: `${task.Task} (${task.ProjectName})`,
      project: task.Project,
      date: task.StartDate,
      deadline:
        date > 0 ? `Due in ${date} days` : date === 0 ? "Today" : "Overdue",
    };
  });

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-100 min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ongoing Projects
                </CardTitle>
                <ActivityIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {ongoingProjects.length}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Projects
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completedProjects.length}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Teams</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {ongoingProjects.length}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Activities
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activities.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            <Card className="col-span-6 sm:w-full bg-white">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <RecentActivities activities={activities} />
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

  const response = await fetch(
    `${apiUrl}/staffreports?dashboard&startdate=2023-06-01&enddate=2023-07-31`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    return {
      props: {
        data: {
          projects: [],
          activities: [],
          tasks: [],
          goals: [],
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

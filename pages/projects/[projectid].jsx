import ProjectsForm from "@/components/forms/ProjectsForm";
import TeamForm from "@/components/forms/TeamForm";
import { DataTable } from "@/components/tables/DataTable";
import { teamColumns } from "@/components/tables/teamColumns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { MyDialog } from "@/components/utilities/MyDialog";
import { ToastAction } from "@radix-ui/react-toast";
import Cookies from "cookies";
import { CheckCircle2Icon } from "lucide-react";
import Head from "next/head";
import { Fragment, useEffect, useReducer } from "react";
import { useContext } from "react";
import authContext from "@/store/auth-context";

export const metadata = {
  title: "Project",
  description: "Details about a project",
};
const teamReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE":
      const result = state.filter((item) => item.id !== action.payload.id);
      result.push(action.payload);
      const sortedList = result.sort((a, b) => a.id - b.id);
      return sortedList;
    default:
      return state;
  }
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE":
      const result = state.filter((item) => item.id !== action.payload.id);
      result.push(action.payload);
      const sortedList = result.sort((a, b) => a.id - b.id);
      return sortedList;
    default:
      return state;
  }
};

export default function ProjectDetail({
  clients,
  project,
  team,
  staffList,
  tasks,
}) {
  const [teamState, dispatch] = useReducer(teamReducer, []);
  const [tasksState, dispatchTasks] = useReducer(tasksReducer, []);
  const authCtx = useContext(authContext);
  const { user } = authCtx;

  console.log(user);

  useEffect(() => {
    if (team.length > 0) {
      team.forEach((item) => {
        dispatch({ type: "ADD", payload: item });
      });
    }
  }, [team]);

  useEffect(() => {
    if (tasks.length > 0) {
      tasks.forEach((item) => {
        dispatchTasks({ type: "ADD", payload: item });
      });
    }
  }, [tasks]);

  function onFormSubmitHandler(data, action) {
    if (action === "add") {
      dispatch({ type: "ADD", payload: data });
    } else if (action === "update") {
      dispatch({ type: "UPDATE", payload: data });
    }
  }
  const { toast } = useToast();

  async function onDeleteHandler(id) {
    const res = await fetch(`/api/teams/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      toast({
        variant: "destructive",
        title: "Process failed",
        description: "Could not remove this staff from the project",
        className: "bg-white text-black",
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
    } else {
      toast({
        variant: "success",
        title: "Process successful",
        description: "Staff removed successfully",
        className: "bg-white text-black",
        action: <CheckCircle2Icon className="text-green-500" />,
      });
      dispatch({ type: "REMOVE", payload: id });
    }
  }
  const columns = teamColumns(onDeleteHandler, onFormSubmitHandler);
  return (
    <Fragment>
      <Head>
        <title>{project?.Name}</title>
      </Head>
      <div className="flex-col md:flex text-black bg-white min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="bg-slate-300 md:w-3/12 justify-start space-x-2">
              <TabsTrigger className="w-6/12 focus:bg-white" value="profile">
                Project
              </TabsTrigger>
              <TabsTrigger className="w-6/12 focus:bg-white" value="team">
                Team
              </TabsTrigger>
              <TabsTrigger className="w-6/12 focus:bg-white" value="tasks">
                Tasks
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle>Project</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-3 md:flex space-x-2">
                    <ProjectsForm
                      className="col-span-2"
                      method="PATCH"
                      clients={clients}
                      project={project}
                      onSubmit={onFormSubmitHandler}
                      editable={user?.role === "Admin"}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="team" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-12 lg:grid-cols-7">
                <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle className="mb-3">Team</CardTitle>
                    {user?.role === "Admin" && (
                      <MyDialog title={"New team member"}>
                        <TeamForm
                          stafflist={staffList}
                          project={project.id}
                          onSubmit={onFormSubmitHandler}
                        />
                      </MyDialog>
                    )}
                  </CardHeader>
                  <CardContent className="pl-3">
                    <DataTable columns={columns} data={teamState} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="tasks" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-12 lg:grid-cols-7">
                <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle className="mb-3">Tasks</CardTitle>
                    {user?.role === "Admin" && (
                      <MyDialog title={"New task"}>
                        <TeamForm
                          stafflist={staffList}
                          project={project.id}
                          onSubmit={onFormSubmitHandler}
                        />
                      </MyDialog>
                    )}
                  </CardHeader>
                  <CardContent className="pl-3">
                    <DataTable columns={columns} data={teamState} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const projectid = params.projectid;
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get("access");

  if (!accessToken) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const response = await fetch("http://localhost/tracksapi/agencies", {
    mode: "no-cors",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const projectResponse = await fetch(
    `http://localhost/tracksapi/projects/${projectid}`,
    {
      mode: "no-cors",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const teamResponse = await fetch(
    `http://localhost/tracksapi/teams?project=${projectid}`,
    {
      mode: "no-cors",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const staffListResponse = await fetch(`http://localhost/tracksapi/staff`, {
    mode: "no-cors",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const tasksResponse = await fetch(
    `http://localhost/tracksapi/projecttasks?project=${projectid}`,
    {
      mode: "no-cors",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!projectResponse.ok) {
    return {
      redirect: {
        destination: "/projects",
        permanent: false,
      },
    };
  }

  const [clients, project, team, staffList, tasks] = await Promise.all([
    response.json(),
    projectResponse.json(),
    teamResponse.json(),
    staffListResponse.json(),
    tasksResponse.json(),
  ]);

  return {
    props: {
      clients: clients.status ? clients.data : [],
      project: project.status ? project.data : [],
      team: team.status ? team.data : [],
      staffList: staffList,
      tasks: tasks.status ? tasks.data : [],
    },
  };
}

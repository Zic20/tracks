import { Fragment, useEffect, useReducer } from "react";
import Head from "next/head";
import Cookies from "cookies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import ActivityForm from "@/components/forms/ActivityForm";
import activitiesColumns from "@/components/tables/activitiesColumns";
import { convertTimeToString } from "@/modules/timecalculation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { CheckCircleIcon } from "lucide-react";
import SideSheet from "@/components/SideSheet";
export const metadata = {
  title: "Tasks",
  description: "Staff tasks",
};

const listReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedState = state.concat(action.activity);
    return updatedState;
  }

  if (action.type === "UPDATE") {
    const result = state.filter(
      (existingActivities) => existingActivities.id !== action.id
    );

    result.push({ id: action.id, ...action.activity });
    const sortedList = result.sort((a, b) => a.id - b.id);
    return sortedList;
  }

  if (action.type === "DELETE") {
    const result = state.filter(
      (existingActivities) => existingActivities.id !== action.id
    );
    const sortedList = result.sort((a, b) => a.id - b.id);
    return sortedList;
  }
};
export default function StaffTasksPage({ list, agencies, activitytypes }) {
  const [activitiesState, dispatchActivities] = useReducer(listReducer, []);
  const { toast } = useToast();

  useEffect(() => {
    if (list) {
      list.forEach((activity) => {
        activity.TimeInput = convertTimeToString(activity.TimeInput);
        dispatchActivities({ type: "ADD", activity });
      });
    }
  }, [list]);
  function onSubmitHandler(data, id = null) {
    if (id !== null) {
      dispatchActivities({ type: "UPDATE", activity: data, id });
      return;
    }

    dispatchActivities({ type: "ADD", activity });
  }

  async function onDeleteHandler(id) {
    const response = await fetch(`/api/tasks/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Process failed",
        description: "Could not delete this task",
        className: "bg-white text-black",
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
      return;
    }

    const responseData = await response.json();
    if (!responseData.status) {
      toast({
        variant: "destructive",
        title: "Process failed",
        description: "Could not delete this task",
        className: "bg-white text-black",
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
      return;
    }

    toast({
      title: "Delete successful",
      description: "Task deleted successfully",
      className: "bg-white text-black",
      action: <CheckCircleIcon className="text-green-300" />,
    });
    dispatchActivities({ type: "DELETE", id });
  }

  const columns = activitiesColumns({
    activitytypes,
    agencies,
    onSubmitHandler,
    onDeleteHandler,
  });
  return (
    <Fragment>
      <Head>
        <title>Tasks</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-200 min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-12 bg-white overflow-y-auto">
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent className="pl-3">
                <SideSheet triggerTitle={"New task"} title={"Add new task"}>
                  <ActivityForm
                    activitytypes={activitytypes}
                    agencies={agencies}
                    onSubmit={onSubmitHandler}
                  />
                </SideSheet>
                <DataTable columns={columns} data={activitiesState} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get("access");
  const refreshToken = cookies.get("refresh");

  if (!accessToken && !refreshToken) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  if (refreshToken) {
  }

  const headers = new Headers();
  headers.append("Content-type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
  const response = await fetch("http://localhost/tracksapi/activities", {
    headers,
  });

  const agenciesListingReq = await fetch(
    "http://localhost/tracksapi/agencies",
    {
      headers,
    }
  );

  const activityTypesListingReq = await fetch(
    "http://localhost/tracksapi/activitytypes",
    {
      headers,
    }
  );

  const [activities, agencies, activitytypes] = await Promise.all([
    response.json(),
    agenciesListingReq.json(),
    activityTypesListingReq.json(),
  ]);

  if (!response.ok) {
    return {
      props: {
        list: [],
        agencies: agencies.data,
        activitytypes: activitytypes.data,
      },
    };
  }

  return {
    props: {
      list: activities.data,
      agencies: agencies.data,
      activitytypes: activitytypes.data,
    },
  };
}

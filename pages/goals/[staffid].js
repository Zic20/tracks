import { Fragment, useEffect, useReducer } from "react";
import Head from "next/head";
import Cookies from "cookies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import goalsColumns from "@/components/tables/goalsColumns";
import { convertTimeToString } from "@/modules/timecalculation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { CheckCircleIcon } from "lucide-react";
import GoalsForm from "@/components/forms/GoalsForm";
import SideSheet from "@/components/SideSheet";
export const metadata = {
  title: "Goals",
  description: "Staff goals",
};

const listReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedState = state.concat(action.goal);
    return updatedState;
  }

  if (action.type === "UPDATE") {
    const result = state.filter(
      (existingGoals) => existingGoals.id !== action.id
    );

    result.push({ id: action.id, ...action.goal });
    const sortedList = result.sort((a, b) => a.id - b.id);
    return sortedList;
  }

  if (action.type === "DELETE") {
    return state.filter((existingGoals) => existingGoals.id !== action.id);
  }
};
export default function StaffGoalsPage({ list }) {
  const [goalsState, dispatchActivities] = useReducer(listReducer, []);
  const { toast } = useToast();

  useEffect(() => {
    if (list) {
      list.forEach((goal) => {
        dispatchActivities({ type: "ADD", goal });
      });
    }
  }, [list]);
  function onSubmitHandler(data, id = null) {
    if (id !== null) {
      dispatchActivities({ type: "UPDATE", goal: data, id });
      return;
    }

    dispatchActivities({ type: "ADD", goal });
  }

  async function onDeleteHandler(id) {
    const response = await fetch(`/api/goals/delete/${id}`, {
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

  const columns = goalsColumns({
    onSubmitHandler,
    onDeleteHandler,
  });
  return (
    <Fragment>
      <Head>
        <title>Goals</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-200 min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-12 bg-white">
              <CardHeader>
                <CardTitle>Goals</CardTitle>
              </CardHeader>
              <CardContent className="pl-3">
                <SideSheet triggerTitle="New Goal" title="Add new goal">
                  <GoalsForm onSubmit={onSubmitHandler} />
                </SideSheet>
                <DataTable columns={columns} data={goalsState} />
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
  const response = await fetch("http://localhost/tracksapi/goals", {
    headers,
  });

  if (!response.ok) {
    return {
      props: {
        list: [],
      },
    };
  }
  const goals = await response.json();
  return {
    props: {
      list: goals.data,
    },
  };
}

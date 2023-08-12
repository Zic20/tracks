import { Fragment, useEffect, useReducer } from "react";
import Head from "next/head";
import Cookies from "cookies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import goalsColumns from "@/components/tables/goalsColumns";
import { useToast } from "@/components/ui/use-toast";
export const metadata = {
  title: "Goals Report",
  description: "Staff goals report",
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
export default function GoalsReport({ list }) {
  const [goalsState, dispatchActivities] = useReducer(listReducer, []);
  const { toast } = useToast();

  useEffect(() => {
    if (list) {
      list.forEach((goal) => {
        dispatchActivities({ type: "ADD", goal });
      });
    }
  }, [list]);

  function onSubmitHandler(data, id = null) {}

  const columns = goalsColumns({
    onSubmitHandler: () => {},
    onDeleteHandler: () => {},
    hasActions: false,
  });
  return (
    <Fragment>
      <Head>
        <title>Goals Reports</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-100 min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-12 bg-white">
              <CardHeader>{/* <CardTitle>Goals</CardTitle> */}</CardHeader>
              <CardContent className="pl-3">
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

  const apiUrl = process.env.API_URL;

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
  const response = await fetch(`${apiUrl}/goals`, {
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

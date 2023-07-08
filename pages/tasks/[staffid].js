import { Fragment } from "react";
import Head from "next/head";
import Cookies from "cookies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "@/components/tables/activitiesColumns";
import { DataTable } from "@/components/tables/DataTable";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ActivityForm from "@/components/forms/ActivityForm";

export const metadata = {
  title: "Tasks",
  description: "Staff tasks",
};

export default function StaffTasksPage({ list }) {
  // function onShowNewActivitySheet() {}
  return (
    <Fragment>
      <Head>
        <title>Tasks</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-200 min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-12 bg-white">
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent className="pl-3">
                <Sheet>
                  <SheetTrigger className="bg-black text-white py-1 px-2 rounded">
                    Open
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Add new task</SheetTitle>
                      <SheetDescription>
                        <ActivityForm />
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                <DataTable columns={columns} data={list} />
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

  if (!response.ok) {
    return {
      props: {
        list: [],
      },
    };
  }

  const { data } = await response.json();
  return {
    props: {
      list: data,
    },
  };
}

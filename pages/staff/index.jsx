import Head from "next/head";
import { PlusIcon } from "lucide-react";
import Cookies from "cookies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "@/components/tables/staffTableColumns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/DataTable";
import { useRouter } from "next/router";
import { Fragment } from "react";

export const metadata = {
  title: "Staff",
  description: "Staff index page",
};

export default function DashboardPage({ list }) {
  const router = useRouter();

  function onNewStaffClickHandler() {
    router.push("/staff/create");
  }
  return (
    <Fragment>
      <Head>
        <title>Staff</title>
      </Head>
      <div className="flex-col md:flex text-black bg-white min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Staff</h2>
          </div>
          <Button
            onClick={onNewStaffClickHandler}
            className="bg-black text-white"
            size="sm"
          >
            New Staff
            <PlusIcon className="h-4 ml-2 w-4 text-muted-foreground font-bold" />
          </Button>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-12">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-3">
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
  const response = await fetch("http://localhost/tracksapi/staff", {
    headers,
  });

  if (!response.ok) {
    return {
      props: {
        list: [],
      },
    };
  }

  const responseData = await response.json();

  return {
    props: {
      list: responseData,
    },
  };
}

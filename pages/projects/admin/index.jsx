import Head from "next/head";
import { PlusIcon } from "lucide-react";
import Cookies from "cookies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "@/components/tables/projectsColumns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/DataTable";
import { useRouter } from "next/router";
import { Fragment } from "react";

export const metadata = {
  title: "Projects",
  description: "Projects index page",
};

export default function ProjectsPage({ list }) {
  const router = useRouter();

  function onNewProjectClickHandler() {
    router.push("/projects/admin/create");
  }
  return (
    <Fragment>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-100 min-h-screen">
        <div className="flex-1 space-y-4 p-2 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-12 bg-white overflow-y-auto md:text-sm">
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent className="pl-3">
                <Button
                  onClick={onNewProjectClickHandler}
                  className="bg-black text-white "
                  size="sm"
                >
                  New Projects
                  <PlusIcon className="h-4 ml-2 w-4 text-muted-foreground font-bold" />
                </Button>
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

  const apiUrl = process.env.API_url;

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
  const response = await fetch(`${apiUrl}/projects`, {
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
      list: responseData.data,
    },
  };
}

import Cookies from "cookies";
import { BugIcon, CheckCheckIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DataTable } from "@/components/tables/DataTable";
import { issuesColumns } from "@/components/tables/issuesColumns";
import UserAccessController from "@/components/utilities/UserAccessController";
import authContext from "@/store/auth-context";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Head from "next/head";
import { useContext } from "react";

export const metadata = {
  title: "Issues",
  description: "Issues Dashboard",
};

const columnAccess = {
  Staff: [
    "id",
    "Title",
    "status",
    "priority",
    "ProductName",
    "Agency",
    "Action",
  ],
  Client: ["id", "Title", "status", "created_at", "Action"],
  Admin: ["*"],
};

export default function IssuesDashboard({ data }) {
  const { user } = useContext(authContext);
  const issues = data.map((row) =>
    UserAccessController(user, row, columnAccess)
  );

  const resolvedIssues = issues.filter((issue) => issue.Status === "Resolved");

  const unresolvedIssues = issues.filter(
    (issue) => issue.Status !== "Resolved"
  );

  const issuesHeaders = issuesColumns(()=>{},()=>{},user?.usertype);

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
                <CardTitle className="text-md font-medium">
                  Reported Issues
                </CardTitle>
                <BugIcon className="h-6 w-6 text-green-400"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{issues.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Resolved Issues
                </CardTitle>
                <CheckCheckIcon className="h-6 w-6 text-green-400"/>
                
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {resolvedIssues.length}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium ">
                  Unesolved Issues
                </CardTitle>
                <QuestionMarkCircledIcon className="h-6 w-6 text-green-400"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {unresolvedIssues.length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="w-full bg-white">
            <CardHeader>
              <CardTitle>Recent Issues</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <DataTable columns={issuesHeaders} data={issues} />
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

  const response = await fetch(`${apiUrl}/issues`, {
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

const isaac = {
  id: 2,
  Title: "A test issue",
  Description:
    "The issues reporting module of the software is not…ay to get in touch with your engineers right now.",
  status: "Open",
  created_at: "2024-02-03 04:37:01",
};

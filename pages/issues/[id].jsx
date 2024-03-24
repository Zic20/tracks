import IssuesForm from "@/components/forms/IssuesForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function Edit({issue,id}) {
  const router = useRouter();
  async function onProjectCreatedHandler() {
    router.push("/projects");
  }
  return (
    <Fragment>
      <Head>
        <title>{issue?.Title}</title>
      </Head>
      <div className="md:flex align-middle justify-center md:w-full min-h-screen bg-slate-100 text-black p-3">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Card className="w-full bg-white">
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="pl-6">
             <IssuesForm issue={issue}/>
            </CardContent>
          </Card>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps({ req, res, params }) {
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

  const response = await fetch(`${apiUrl}/issues/${params?.id}`, {
    mode: "no-cors",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return {
      props: {
        issue: {},
        id:params.id
      },
    };
  }

  const responseData = await response.json();
  console.log(responseData);
  return {
    props: {
      issue: responseData.data,
      id: params.id
    },
  };
}

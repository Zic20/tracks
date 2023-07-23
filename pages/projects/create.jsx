import ProjectsForm from "@/components/forms/ProjectsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function Create(props) {
  const router = useRouter();
  async function onProjectCreatedHandler() {
    router.push("/projects");
  }
  return (
    <Fragment>
      <Head>
        <title>Create Project</title>
      </Head>
      <div className="md:flex align-middle justify-center md:w-full min-h-screen bg-slate-100 text-black p-3">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Card className="w-full bg-white">
            <CardHeader>
              <CardTitle>Create new project</CardTitle>
            </CardHeader>
            <CardContent className="pl-6">
              <ProjectsForm
                method="POST"
                onSubmit={onProjectCreatedHandler}
                clients={props.clients}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps({ req, res }) {
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

  if (!response.ok) {
    return {
      props: {
        clients: [],
      },
    };
  }

  const responseData = await response.json();
  return {
    props: {
      clients: responseData.data,
    },
  };
}

import ProfileForm from "@/components/forms/ProfileForm";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fragment } from "react";
import Cookies from "cookies";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export default function Create(props) {
  const { toast } = useToast();
  async function onFormSubmitHandler(data) {
    const response = await fetch("/api/staff/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const res = await response.json();
      toast({
        title: "Process failed",
        description: "Could not add staff",
        className: "bg-red-500 text-white font-bold",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    toast({
      variant: "success",
      title: "Success",
      description: "Staff added successfully",
      className: "bg-white text-black",
    });
  }
  return (
    <Fragment>
      <Head>
        <title>Add Staff</title>
      </Head>
      <div className="md:flex align-middle justify-center md:w-full min-h-screen bg-slate-100 text-black p-3">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Card className="w-full bg-white">
            <CardHeader>
              <CardTitle>Add new staff</CardTitle>
            </CardHeader>
            <CardContent className="pl-6">
              <ProfileForm
                method="POST"
                onSubmit={onFormSubmitHandler}
                stafflist={props.staff}
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

  const response = await fetch("http://localhost/tracksapi/staff", {
    mode: "no-cors",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return {
      props: {
        staff: [],
      },
    };
  }

  const responseData = await response.json();

  return {
    props: {
      staff: responseData,
    },
  };
}

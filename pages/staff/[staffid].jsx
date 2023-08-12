import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fragment } from "react";
import ProfileForm from "@/components/forms/ProfileForm";
import Cookies from "cookies";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export const metadata = {
  title: "Staff",
  description: "Details about a staff",
};

export default function MemberProfilePage({ stafflist, staff }) {
  const { toast } = useToast();
  async function onFormSubmitHandler(data) {
    const response = await fetch(`/api/staff/${staff.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const res = await response.json();
      toast({
        title: "Process failed",
        description: res.message,
        className: "bg-red-500 text-white font-bold",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    toast({
      variant: "success",
      title: "Success",
      description: "Staff record update successful",
      className: "bg-white text-black",
    });
  }
  return (
    <Fragment>
      <Head>
        <title>Staff Profile</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-100 min-h-screen">
        <div className="flex-1 space-y-4 p-2 pt-6">
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="bg-slate-300 md:w-3/12 justify-start space-x-2">
              <TabsTrigger className="w-6/12 focus:bg-white" value="profile">
                Profile
              </TabsTrigger>
              <TabsTrigger className="w-6/12 focus:bg-white" value="security">
                Security
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-12 bg-white">
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-3 md:flex space-x-2">
                    <ProfileForm
                      className="col-span-2"
                      method="UPDATE"
                      stafflist={stafflist}
                      staff={staff}
                      onSubmit={onFormSubmitHandler}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="security" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-2 bg-white">
                  <CardHeader>
                    <CardTitle>Reset password</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-3">
                    <form>
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="password">New password</label>
                          <input
                            className="border p-2 rounded w-full"
                            type="password"
                            id="password"
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label htmlFor="password">Confirm password</label>
                          <input
                            className="border p-2 rounded w-full"
                            type="password"
                            id="confirmpassword"
                          />
                        </div>
                        <button className="rounded bg-black text-white p-2 w-full">
                          Reset password
                        </button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const staffid = params.staffid;
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get("access");
  const apiUrl = process.env.API_URL;

  if (!accessToken) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const response = await fetch(`${apiUrl}/staff`, {
    mode: "no-cors",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const staffInfoResponse = await fetch(`${apiUrl}/staff/${staffid}`, {
    mode: "no-cors",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!staffInfoResponse.ok) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const [stafflist, staff] = await Promise.all([
    response.json(),
    staffInfoResponse.json(),
  ]);

  return {
    props: {
      stafflist,
      staff,
    },
  };
}

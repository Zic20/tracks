import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "@/components/tables/membersDonationsColumns";
import { DataTable } from "@/components/tables/DataTable";
import { Fragment } from "react";
import ProfileForm from "@/components/forms/ProfileForm";
import Cookies from "cookies";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export const metadata = {
  title: "Staff",
  description: "Details about a staff",
};

const DUMMY_DATA = [
  {
    id: 1,
    date: "June 17, 2023",
    reference: "06172023TH12",
    amount: 2000,
    fund: "Tithe",
    status: "Success",
  },
  {
    id: 2,
    date: "January 17, 2023",
    reference: "06172023TH12",
    amount: 2000,
    fund: "Tithe",
    status: "Success",
  },
  {
    id: 3,
    date: "December 17, 2023",
    reference: "06172023TH12",
    amount: 2000,
    fund: "Tithe",
    status: "Success",
  },
];

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
        // description: "Update failed",
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
        <title>Member Profile</title>
      </Head>
      <div className="flex-col md:flex text-black bg-white min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="bg-slate-300 md:w-6/12 justify-start space-x-2">
              <TabsTrigger className="w-3/12 focus:bg-white" value="profile">
                Profile
              </TabsTrigger>
              <TabsTrigger className="w-3/12 focus:bg-white" value="security">
                Security
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-12">
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
                <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle>Donations</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-3">
                    <DataTable
                      columns={columns}
                      data={DUMMY_DATA}
                      filterField="date"
                    />
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

  const staffInfoResponse = await fetch(
    `http://localhost/tracksapi/staff/${staffid}`,
    {
      mode: "no-cors",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

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

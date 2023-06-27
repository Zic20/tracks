import Head from "next/head";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "@/components/tables/membersDonationsColumns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/DataTable";
import { Fragment } from "react";
import ProfileForm from "@/components/forms/ProfileForm";
import { MyAvatar } from "@/components/utilities/MyAvatar";

export const metadata = {
  title: "Members",
  description: "Example dashboard app using the components.",
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

export default function MemberProfilePage() {
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
              <TabsTrigger className="w-3/12 focus:bg-white" value="donations">
                Donations
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
                    <Card className="text-center md:w-1/3 p-5 h-4/6">
                      <CardContent className="flex flex-col justify-center align-middle">
                        <MyAvatar
                          image={"https://github.com/shadcn.png"}
                          alt={"userprofile"}
                          fallback={"Profile"}
                          className={"w-52 h-2/5"}
                        />
                        <p className="my-4">Upload your profile image</p>
                        <Button
                          variant="default"
                          className="text-white bg-black"
                        >
                          Save Changes
                        </Button>
                      </CardContent>
                    </Card>
                    <ProfileForm className="col-span-2" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="donations" className="space-y-4">
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

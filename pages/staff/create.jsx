import ProfileForm from "@/components/forms/ProfileForm";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fragment } from "react";

export default function create() {
  return (
    <Fragment>
      <Head>
        <title>Add member</title>
      </Head>
      <div className="md:flex align-middle justify-center md:w-full min-h-screen bg-slate-100 text-black">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Card className="w-full bg-white">
            <CardHeader>
              <CardTitle>Create new member</CardTitle>
            </CardHeader>
            <CardContent className="pl-6">
              <ProfileForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </Fragment>
  );
}

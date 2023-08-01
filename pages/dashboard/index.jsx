import Head from "next/head";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentActivities from "@/components/RecentActivities";
import { Overview } from "@/components/Overview";
import Cookies from "cookies";
import { useContext } from "react";
import authContext from "@/store/auth-context";
import { useRouter } from "next/router";
import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Dashboard",
  description: "App Dashboard",
};

export default function DashboardPage() {
  const authCtx = useContext(authContext);
  const router = useRouter();

  const { user, isLoggedIn } = authCtx;

  if (user.usertype === "Staff") {
    router.replace("/dashboard/StaffDashboard");
  }

  if (user.usertype === "Manager") {
    router.replace("/dashboard/AdminDashboard");
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex-col md:flex text-black bg-white min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {user.usertype === "Admin" && <AdminDashboard />}
        </div>
      </div>
    </>
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

  return {
    props: {},
  };
}

import Head from "next/head";
import Cookies from "cookies";
import { useContext } from "react";
import authContext from "@/store/auth-context";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
// import StaffDashboard from "./Staff";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Dashboard",
  description: "App Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex-col md:flex text-black bg-white min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <AdminDashboard />
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

  const { usertype } = jwt_decode(accessToken);

  if (usertype === "Staff") {
    return {
      redirect: {
        destination: "/dashboard/Staff",
        permanent: false,
      },
    };
  }

  if (usertype === "Manager") {
    return {
      redirect: {
        destination: "/dashboard/AdminDashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

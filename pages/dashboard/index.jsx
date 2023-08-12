import Head from "next/head";
import Cookies from "cookies";
import jwt_decode from "jwt-decode";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Dashboard",
  description: "App Dashboard",
};

export default function DashboardPage({ data }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-100 min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <AdminDashboard data={data} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
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

  const response = await fetch(`${apiUrl}/adminreports`, {
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
  console.log(responseData);

  return {
    props: {
      data: responseData.data,
    },
  };
}

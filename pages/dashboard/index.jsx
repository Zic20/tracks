import Head from "next/head";
import Cookies from "cookies";
import jwt_decode from "jwt-decode";

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

  if (usertype === "Admin") {
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

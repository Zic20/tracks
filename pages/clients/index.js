import SideSheet from "@/components/SideSheet";
import ClientForm from "@/components/forms/ClientForm";
import { DataTable } from "@/components/tables/DataTable";
import clientsColumns from "@/components/tables/clientsColumns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import Cookies from "cookies";
import { CheckCircleIcon } from "lucide-react";
import Head from "next/head";
import { Fragment, useEffect, useReducer } from "react";
export const metadata = {
  title: "Clients",
  description: "Clients list",
};

const listReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedState = state.concat(action.client);
    return updatedState;
  }

  if (action.type === "UPDATE") {
    const result = state.filter(
      (existingClients) => existingClients.id !== action.id
    );

    result.push({ id: action.id, ...action.client });
    const sortedList = result.sort((a, b) => a.id - b.id);
    return sortedList;
  }

  if (action.type === "DELETE") {
    const result = state.filter(
      (existingClients) => existingClients.id !== action.id
    );
    const sortedList = result.sort((a, b) => a.id - b.id);
    return sortedList;
  }
};

export default function ClientsPage({ list }) {
  const [clientsState, dispatchClients] = useReducer(listReducer, []);
  const { toast } = useToast();

  useEffect(() => {
    if (list) {
      list.forEach((client) => {
        dispatchClients({ type: "ADD", client });
      });
    }
  }, [list]);
  function onSubmitHandler(data, id = null) {
    if (id !== null) {
      dispatchClients({ type: "UPDATE", client: data, id });
      return;
    }

    dispatchClients({ type: "ADD", client });
  }

  async function onDeleteHandler(id) {
    const response = await fetch(`/api/clients/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Process failed",
        description: "Could not delete this client",
        className: "bg-white text-black",
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
      return;
    }

    const responseData = await response.json();
    if (!responseData.status) {
      toast({
        variant: "destructive",
        title: "Process failed",
        description: "Could not delete this clients",
        className: "bg-white text-black",
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
      return;
    }

    toast({
      title: "Delete successful",
      description: "Client deleted successfully",
      className: "bg-white text-black",
      action: <CheckCircleIcon className="text-green-300" />,
    });
    dispatchClients({ type: "DELETE", id });
  }

  const columns = clientsColumns({
    onSubmitHandler,
    onDeleteHandler,
  });
  return (
    <Fragment>
      <Head>
        <title>Clients</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-200 min-h-screen">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-12 bg-white">
              <CardHeader>
                <CardTitle>Clients</CardTitle>
              </CardHeader>
              <CardContent className="pl-3">
                <SideSheet triggerTitle={"New Client"} title={"Add new client"}>
                  <ClientForm onSubmit={onSubmitHandler} />
                </SideSheet>
                <DataTable columns={columns} data={clientsState} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get("access");
  const refreshToken = cookies.get("refresh");

  if (!accessToken && !refreshToken) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  if (refreshToken) {
  }

  const headers = new Headers();
  headers.append("Content-type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
  const response = await fetch("http://localhost/tracksapi/agencies", {
    headers,
  });

  if (!response.ok) {
    return {
      props: {
        list: [],
      },
    };
  }
  const clients = await response.json();
  return {
    props: {
      list: clients.data,
    },
  };
}

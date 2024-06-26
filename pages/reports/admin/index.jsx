import { DataTable } from "@/components/tables/DataTable";
import { reportColumns } from "@/components/tables/reportsColumns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "cookies";
import { EyeIcon, PrinterIcon } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";

export const metadata = {
  title: "Reports",
  description: "Reports index page",
};

export default function Reports({ list }) {
  const [staffList, setStaffList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [reportType, setReportType] = useState("");
  const startDateRef = useRef();
  const endDateRef = useRef();

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (list) {
      const formatedList = list.map((staff) => {
        return {
          ...staff,
          Name: `${staff.FirstName} ${
            staff.MiddleName ? staff.MiddleName : ""
          } ${staff.LastName}`,
        };
      });

      setStaffList(formatedList);
    }
  }, [list]);

  const onRowSelectionChange = (action, data = []) => {
    if (!data) return;
    switch (action) {
      case "add":
        data.forEach((row) => {
          if (!selectedRows.includes(row)) {
            setSelectedRows((prev) => [...prev, row]);
          }
        });
        break;
      case "remove":
        data.forEach((row) => {
          if (selectedRows.includes(row)) {
            setSelectedRows((prev) => prev.filter((r) => r !== row));
          }
        });
        break;
      case "remove_all":
        setSelectedRows([]);
        break;
      default:
        break;
    }
  };
  const Columns = reportColumns(onRowSelectionChange);

  async function onLoadReport(event) {
    event.preventDefault();

    if (
      startDateRef.current.value === "" ||
      reportType === "" ||
      endDateRef.current.value === "" ||
      selectedRows.length < 1
    ) {
      toast({
        variant: "destructive",
        title: "Invalid request",
        description: "Please select all options",
        className: "bg-red-500 text-white",
      });
      return;
    }

    const data = {
      reportType,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      staffList: selectedRows,
    };

    const response = await fetch("/api/reports", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Process failed!!",
        description: "Please try again",
        className: "bg-red-500 text-white",
      });
      return;
    }

    const report = await response.json();
    if (report.status) {
      router.push({
        pathname: "/reports/admin/preview",
        query: { reporturl: report.url },
      });
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Reports</title>
      </Head>
      <div className="flex-col md:flex text-black bg-slate-100 min-h-screen">
        <div className="flex-1 space-y-4 p-2 pt-6">
          <Card className="col-span-12 bg-white overflow-y-auto sm:text-sm">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent className="pl-3">
              <form
                className="flex flex-wrap columns-4 justify-end gap-2"
                onSubmit={onLoadReport}
              >
                <div className="flex-1">
                  <label htmlFor="" className="mb-2">
                    Report Type
                  </label>
                  <Select
                    className="bg-dark mt-2 flex-1"
                    onValueChange={(value) => {
                      setReportType(value);
                    }}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        className="text-black hover:bg-slate-400 bg-white"
                        value="Projects"
                      >
                        Projects
                      </SelectItem>
                      <SelectItem
                        className="text-black hover:bg-slate-400 bg-white"
                        value="activities"
                      >
                        Goals & Activities
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label htmlFor="" className="mb-2">
                    Start Date
                  </label>
                  <Input
                    className="bg-dark mt-2 flex-1"
                    type="date"
                    id="start"
                    name="report-start"
                    ref={startDateRef}
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="" className="mb-2">
                    End Date
                  </label>
                  <Input
                    className="bg-dark mt-2"
                    type="date"
                    id="end"
                    name="report-end"
                    ref={endDateRef}
                  />
                </div>

                <div className="flex-1">
                  <Button className="bg-black text-white w-max mt-7">
                    Preview &nbsp;
                    <EyeIcon />
                  </Button>
                </div>
              </form>
              <DataTable columns={Columns} data={staffList} />
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
  const refreshToken = cookies.get("refresh");

  const apiUrl = process.env.API_url;

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
  const response = await fetch(`${apiUrl}/staff`, {
    headers,
  });

  if (!response.ok) {
    return {
      props: {
        list: [],
      },
    };
  }

  const responseData = await response.json();

  return {
    props: {
      list: responseData,
    },
  };
}

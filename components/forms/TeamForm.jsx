import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { CheckCircleIcon } from "lucide-react";
import { ToastAction } from "@radix-ui/react-toast";
import { data } from "autoprefixer";

const TeamForm = ({
  project,
  stafflist,
  member,
  onSubmit,
  method = "POST",
}) => {
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (member) {
      setSelectedStaff(member?.Staff);
      setSelectedRole(member?.Role);
    }
  }, [member]);

  useEffect(() => {
    setFormIsValid(selectedStaff !== "" && selectedRole !== "");
  }, [selectedStaff, selectedRole]);

  const { toast } = useToast();

  function onStaffChangeHandler(value) {
    setSelectedStaff(value);
  }

  function onRoleChangeHandler(value) {
    setSelectedRole(value);
  }

  async function onFormSubmitHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Please fill all required fields",
        className: "bg-white text-black",
      });
      return;
    }

    if (method === "POST") {
      const data = {
        Staff: +selectedStaff,
        Role: selectedRole,
        Project: project,
      };

      const response = await fetch("/api/teams/create", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Ooops! Something went wrong.",
          description: responseData.message,
          className: "bg-white text-black",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Team member added successfully",
        className: "bg-white text-black",
      });

      const person = stafflist.filter((staff) => +staff.id === +data.Staff);
      data.id = responseData.id;
      data.StaffName = `${person[0].FirstName} ${
        person[0].MiddleName ? person[0].MiddleName : ""
      } ${person[0].LastName}`;
      onSubmit(data, "add");
    } else {
      const data = {
        Role: selectedRole,
      };

      const response = await fetch(`/api/teams/${member.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Ooops! Something went wrong.",
          description: responseData.message,
          className: "bg-white text-black",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Team member updated successfully",
        className: "bg-white text-black",
      });

      data.id = member.id;
      data.Staff = member.Staff;
      data.StaffName = member.StaffName;
      onSubmit(data, "update");
    }
  }

  return (
    <form
      className={`p-3 h-full justify-center align-middle overflow-y-auto scrollbar-thumb:!rounded`}
      onSubmit={onFormSubmitHandler}
    >
      <div className="mb-2">
        {method !== "POST" && (
          <>
            <label htmlFor="Staff">Staff</label>
            <input
              type="text"
              name="Staff"
              id="Staff"
              defaultValue={member.StaffName}
              disabled={true}
              className="bg-white border border-gray-100 p-2 rounded mt-2 w-full"
            />
          </>
        )}
        {method === "POST" && (
          <>
            <label htmlFor="">Staff</label>
            <Select
              className="bg-dark mt-2 w-full"
              onValueChange={onStaffChangeHandler}
            >
              <SelectTrigger className="mt-2 ">
                <SelectValue placeholder="Select a staff" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {stafflist.map((staff) => {
                  return (
                    <SelectItem
                      key={staff.id}
                      className="text-black hover:bg-slate-400 bg-white"
                      value={`${staff.id}`}
                    >
                      {`${staff.FirstName} ${
                        staff.MiddleName ? staff.MiddleName : ""
                      } ${staff.LastName}`}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </>
        )}
      </div>
      <div className="mb-2">
        <label htmlFor="">Role</label>
        <Select
          className="bg-dark mt-2 w-full"
          onValueChange={onRoleChangeHandler}
          defaultValue={member?.Role}
        >
          <SelectTrigger className="mt-2 ">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem
              key={1}
              className="text-black hover:bg-slate-400 bg-white"
              value={`Team Lead`}
            >
              Team Lead
            </SelectItem>
            <SelectItem
              key={2}
              className="text-black hover:bg-slate-400 bg-white"
              value={`Member`}
            >
              Member
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        className="bg-black text-white w-full disabled:bg-gray-600 mt-2"
        disabled={!formIsValid}
      >
        {method === "POST" && "Save"}
        {method !== "POST" && "Update"}
      </Button>
    </form>
  );
};

export default TeamForm;

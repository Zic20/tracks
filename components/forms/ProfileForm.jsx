import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

export default function ProfileForm(props) {
  const [staffID, setStaffID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        (staffID !== "") &
          (firstName !== "") &
          (lastName !== "") &
          (position !== "") &
          (email !== "") &
          (phoneNo !== "")
      );
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [staffID, firstName, lastName, position, email, phoneNo]);

  useEffect(() => {
    if (!props.staff) {
      return;
    }
    setStaffID(props.staff.StaffID);
    setFirstName(props.staff.FirstName);
    setMiddleName(props.staff.MiddleName);
    setLastName(props.staff.LastName);
    setPosition(props.staff.Position);
    setSupervisor(props.staff.Supervisor);
    setEmail(props.staff.Email);
    setPhoneNo(props.staff.PhoneNo);
  }, [props]);

  const { toast } = useToast();

  function onStaffIDChangeHandler(event) {
    setStaffID(event.target.value);
  }
  function onFirstNameChangeHandler(event) {
    setFirstName(event.target.value);
  }
  function onMiddleNameChangeHandler(event) {
    setMiddleName(event.target.value);
  }
  function onLastNameChangeHandler(event) {
    setLastName(event.target.value);
  }
  function onDateOfBirthChangeHandler(event) {
    console.log(event.target.value);
    setDateOfBirth(event.target.value);
  }
  function onPositionChangeHandler(value) {
    setPosition(value);
  }
  function onSupervisorChangeHandler(value) {
    setSupervisor(value);
  }
  function onEmailChangeHandler(event) {
    setEmail(event.target.value);
  }
  function onPhoneNoChangeHandler(event) {
    setPhoneNo(event.target.value);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const data = {
      StaffID: staffID,
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      PhoneNo: phoneNo,
      Email: email,
      Supervisor: supervisor,
      Positon: position,
    };

    if (!formIsValid) {
      toast({
        variant: "destructive",
        title: "Ooops! Something went wrong.",
        description: "Please fill all required fields",
        className: "bg-white text-black",
      });
      return;
    }

    props.onSubmit(data);
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className={
        "border rounded-lg  p-5 md:flex flex-wrap flex-col space-y-2 w-full " +
        props.className
      }
    >
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="staffid" className="mb-2">
            Staff ID
          </label>
          <Input
            type="text"
            id="staffid"
            className="mt-2 w-full"
            placeholder="Staff ID"
            onChange={onStaffIDChangeHandler}
            disabled={props.method === "UPDATE"}
            defaultValue={props.staff.StaffID ?? ""}
          />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="firstName" className="mb-2">
            First name
          </label>
          <Input
            type="text"
            id="firstName"
            className="mt-2 w-full"
            placeholder="First Name"
            onChange={onFirstNameChangeHandler}
            defaultValue={props.staff.FirstName ?? ""}
          />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Middle name
          </label>
          <Input
            type="text"
            className="mt-2 w-full"
            placeholder="Middle Name"
            onChange={onMiddleNameChangeHandler}
            defaultValue={props.staff.MiddleName ?? ""}
          />
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Last name
          </label>
          <Input
            type="text"
            className="mt-2 w-full"
            placeholder="Last Name"
            onChange={onLastNameChangeHandler}
            defaultValue={props.staff.LastName ?? ""}
          />
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Position
          </label>
          <Select
            className="bg-dark mt-2 w-full"
            onValueChange={onPositionChangeHandler}
            defaultValue={props.staff.Position ?? ""}
          >
            <SelectTrigger className="mt-2 ">
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Software Developer"
              >
                Software Developer
              </SelectItem>
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Human Resource Officer"
              >
                Human Resource Officer
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Supervisor
          </label>
          <Select
            onValueChange={onSupervisorChangeHandler}
            className="bg-dark mt-2 w-full"
            defaultValue={props.staff.Supervisor ?? ""}
          >
            <SelectTrigger className="mt-2 ">
              <SelectValue placeholder="Select staff supervisor" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {props.stafflist.map((staff) => {
                return (
                  <SelectItem
                    key={staff.id}
                    className="text-black hover:bg-slate-400 bg-white"
                    value={staff.id}
                  >
                    {`${staff.FirstName} ${staff.MiddleName ?? ""} ${
                      staff.LastName
                    }`}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Email
          </label>
          <Input
            type="email"
            className="mt-2 w-full"
            placeholder="Email"
            onChange={onEmailChangeHandler}
            defaultValue={props.staff.Email ?? ""}
          />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Phone
          </label>
          <Input
            type="tel"
            className="mt-2 w-full"
            placeholder="Phone Number"
            onChange={onPhoneNoChangeHandler}
            defaultValue={props.staff.PhoneNo ?? ""}
          />
        </div>
      </div>

      <Button
        variant="default"
        className="text-white bg-black w-full md:w-3/12 mt-5"
        onClick={onSubmitHandler}
      >
        Save Changes
      </Button>
    </form>
  );
}

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

export default function ProjectsForm({
  clients,
  className,
  project,
  method = "POST",
}) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        name !== "" && startDate !== "" && deadline !== "" && type !== ""
      );
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [name, startDate, deadline, type]);

  useEffect(() => {
    if (project) {
      setName(project?.Name);
      setStartDate(project?.StartDate);
      setDeadline(project?.Deadline);
      setType(project?.Type);
      setClient(project?.Client);
    }
  }, [project]);

  const { toast } = useToast();

  function onNameChangeHandler(event) {
    setName(event.target.value);
  }

  function onStartDateChangeHandler(event) {
    setStartDate(event.target.value);
  }
  function onDeadlineChangeHandler(event) {
    setDeadline(event.target.value);
  }

  function onTypeChangleHandler(value) {
    setType(value);
  }

  function onClientChangeHandler(value) {
    setClient(value);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const data = {
      Name: name,
      StartDate: startDate,
      Deadline: deadline,
      Type: type,
      Client: client,
    };

    if (!formIsValid) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Please fill all required fields",
        className: "bg-white text-black",
      });
      return;
    }

    if (method === "PATCH") {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: method,
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
        description: "Project updated successfully",
        className: "bg-white text-black",
      });
    } else {
      const response = await fetch(`/api/projects/create`, {
        method: method,
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
        description: "Project created successfully",
        className: "bg-white text-black",
      });
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className={
        "border rounded-lg  p-5 md:flex flex-wrap flex-col space-y-2 w-full " +
        className
      }
    >
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <Input
            type="text"
            id="name"
            className="mt-2 w-full"
            placeholder="Name"
            defaultValue={project?.Name}
            onChange={onNameChangeHandler}
          />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="date" className="mb-2">
            Start Date
          </label>
          <Input
            type="date"
            className="mt-2 w-full"
            id="date"
            defaultValue={project?.StartDate}
            onChange={onStartDateChangeHandler}
          />
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="deadline" className="mb-2">
            Deadline
          </label>
          <Input
            type="date"
            id="deadline"
            className="mt-2 w-full"
            defaultValue={project?.Deadline}
            onChange={onDeadlineChangeHandler}
          />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Project Type
          </label>
          <Select
            className="bg-dark mt-2 w-full"
            onValueChange={onTypeChangleHandler}
            defaultValue={project?.Type}
          >
            <SelectTrigger className="mt-2 ">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Software Development"
              >
                Software Development
              </SelectItem>
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Features Update"
              >
                Features Update
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Client
          </label>
          <Select
            onValueChange={onClientChangeHandler}
            className="bg-dark mt-2 w-full"
            defaultValue={`${project?.Client}`}
          >
            <SelectTrigger className="mt-2 ">
              <SelectValue placeholder="Select project client" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {clients.map((client) => {
                return (
                  <SelectItem
                    key={client.id}
                    className="text-black hover:bg-slate-400 bg-white"
                    value={`${client.id}`}
                  >
                    {`${client.Name}`}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
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

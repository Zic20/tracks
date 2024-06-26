import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import styles from "./styles.module.css";

const TasksForm = ({
  project,
  stafflist,
  onSubmit,
  projectTasks,
  task,
  method = "POST",
}) => {
  const [enteredTask, setEnteredTask] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [subtask, setSubtask] = useState("");
  const [assignedto, setAssignedto] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [formIsValid, setFormIsValid] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (task) {
      setEnteredTask(task.Task);
      setDeadline(task.Deadline);
      setPriority(task.Priority);
      setSubtask(task.Parent);
      setAssignedto(task.AssignedTo);
      setStatus(task.Status);
    }
  }, [task]);

  useEffect(() => {
    if (enteredTask !== "" && deadline !== "" && priority !== "") {
      setFormIsValid(true);
    }
  }, [enteredTask, deadline, priority]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Task: enteredTask,
      Description: description,
      Deadline: deadline,
      Priority: priority,
      Parent: subtask,
      AssignedTo: assignedto,
      Status: status,
      Project: +project,
    };

    const staff = stafflist.filter((item) => +item.Staff === +assignedto);
    data.StaffName = staff[0].StaffName;
    if (method === "POST") {
      saveNew(data);
    } else {
      updateTask(data);
    }
  };

  async function saveNew(data) {
    const res = await fetch("/api/projecttasks/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
        className: "bg-white text-black",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Success",
      description: "Task created successfully",
      className: "bg-white text-black",
    });
    onSubmit(data, "add");
  }

  async function updateTask(data) {
    data.Project = task.Project;

    const res = await fetch(`/api/projecttasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      toast({
        variant: "destructive",
        title: "Ooops! Something went wrong.",
        description: result?.message,
        className: "bg-white text-black",
      });
      return;
    }
    toast({
      variant: "success",
      title: "Success",
      description: "Task updated successfully",
      className: "bg-white text-black",
    });
    data.id = +task.id;
    onSubmit(data, "update");
  }

  function taskChangeHandler(event) {
    setEnteredTask(event.target.value);
  }

  function descriptionChangeHandler(event) {
    setDescription(event.target.value);
  }

  function deadlineChangeHandler(event) {
    setDeadline(event.target.value);
  }

  function priorityChangeHandler(value) {
    setPriority(value);
  }

  function subtaskChangeHandler(value) {
    setSubtask(value);
  }

  function assignedtoChangeHandler(value) {
    setAssignedto(value);
  }

  function statusChangeHandler(value) {
    setStatus(value);
  }

  return (
    <form
      className={`p-3 h-full justify-center align-middle overflow-y-auto scrollbar-thumb:!rounded ${styles.activityform}`}
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <div className="mb-2">
          <label htmlFor="task" className="mb-2">
            Task
          </label>
          <Input
            type="text"
            id="task"
            className="mt-2 w-full"
            placeholder="Task"
            onChange={taskChangeHandler}
            defaultValue={task?.Task}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="deadline" className="mb-2">
            Deadline
          </label>
          <Input
            type="date"
            id="deadline"
            className="mt-2 w-full"
            onChange={deadlineChangeHandler}
            defaultValue={task?.Deadline}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-2">
          Description
        </label>
        <textarea
          className="mt-2 w-full border bg-black rounded-lg p-2 resize-none focus:outline focus:ring-1 focus:ring-slate-200 focus:border-transparent"
          id="description"
          rows="3"
          placeholder="Description"
          onChange={descriptionChangeHandler}
          defaultValue={task?.Description}
        ></textarea>
      </div>

      <div className="w-full flex ">
        <div className="w-full">
          <label htmlFor="priority" className="mb-2">
            Priority
          </label>
          <Select
            id="priority"
            className="bg-dark mt-2 w-full"
            onValueChange={priorityChangeHandler}
            defaultValue={task ?? `${task?.Priority}`}
          >
            <SelectTrigger className="mt-2 ">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="High"
              >
                High
              </SelectItem>
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Medium"
              >
                Medium
              </SelectItem>
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Normal"
              >
                Normal
              </SelectItem>
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Low"
              >
                Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full flex ">
        <div className="w-full">
          <label htmlFor="parent" className="mb-2">
            Sub Task Of (Optional)
          </label>
          <Select
            id="parent"
            className="bg-dark mt-2 w-full"
            onValueChange={subtaskChangeHandler}
            defaultValue={`${task?.Parent}`}
          >
            <SelectTrigger className="mt-2 ">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value=""
              >
                {""}
              </SelectItem>
              {projectTasks.map((projectTask) => {
                return (
                  <SelectItem
                    key={projectTask.id}
                    className="text-black hover:bg-slate-400 bg-white"
                    value={`${+projectTask.id}`}
                  >
                    {projectTask.Task}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full flex">
        <div className="mb-2 w-full">
          <label htmlFor="" className="mb-2">
            Assigned To
          </label>
          <Select
            className="bg-dark mt-2 w-full"
            onValueChange={assignedtoChangeHandler}
            defaultValue={`${task?.AssignedTo}`}
          >
            <SelectTrigger className="mt-2 ">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {stafflist.map((staff) => {
                return (
                  <SelectItem
                    key={staff.Staff}
                    className="text-black hover:bg-slate-400 bg-white"
                    value={`${staff.Staff}`}
                  >
                    {`${staff.StaffName}`}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full">
        <div className="mb-2">
          <label htmlFor="status" className="mb-2">
            Status
          </label>
          <Select
            className="bg-dark mt-2 w-full"
            onValueChange={statusChangeHandler}
            defaultValue={`${task?.Status}`}
          >
            <SelectTrigger className="mt-2 ">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Not Started"
              >
                Not Started
              </SelectItem>
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="In Progress"
              >
                In Progress
              </SelectItem>
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Completed"
              >
                Completed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        variant="default"
        className="bg-white text-black disabled:bg-slate-400 w-full mt-5 mb-2"
        onClick={handleSubmit}
        disabled={!formIsValid}
      >
        Save Changes
      </Button>
    </form>
  );
};

export default TasksForm;

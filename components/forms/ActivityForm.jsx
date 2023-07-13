import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import {
  convertDate,
  convertTimeToString,
  getTimeDifference,
  getTimeString,
} from "@/modules/timecalculation";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { CheckCircleIcon, CheckIcon } from "lucide-react";
import styles from "./styles.module.css";

const ActivityForm = ({
  method = "POST",
  agencies,
  activitytypes,
  activity,
  onSubmit,
}) => {
  const [agency, setAgency] = useState(Number);
  const [date, setDate] = useState("");
  const [enteredactivity, setEnteredActivity] = useState("");
  const [activityType, setActivityType] = useState(Number);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (!activity) {
      return;
    }

    setDate(convertDate(activity.Date));
    setEnteredActivity(activity.Activity);
    setActivityType(activity.activitytypes_id);
    setStartTime(getTimeString(activity.StartTime));
    setEndTime(getTimeString(activity.EndTime));
    setTimeSpent(activity.TimeInput);
    setAgency(activity.agencies_id);
  }, [activity]);

  useEffect(() => {
    setFormIsValid(
      date !== "" &&
        enteredactivity !== "" &&
        activityType !== "" &&
        activityType !== "" &&
        startTime !== "" &&
        endTime !== "" &&
        agency !== ""
    );
  }, [date, enteredactivity, activityType, startTime, endTime, agency]);

  const { toast } = useToast();
  function onDateChangeHandler(event) {
    setDate(event.target.value);
  }
  function onEnteredactivityChangeHandler(event) {
    setEnteredActivity(event.target.value);
  }
  function onActivityTypeChangeHandler(value) {
    setActivityType(value);
  }
  function onStartTimeChangeHandler(event) {
    setStartTime(event.target.value);
    const timeInput = getTimeDifference(event.target.value, endTime);
    setTimeSpent(timeInput);
  }
  function onEndTimeChangeHandler(event) {
    setEndTime(event.target.value);
    const timeInput = getTimeDifference(startTime, event.target.value);
    setTimeSpent(timeInput);
  }
  function onAgencyChangeHandler(value) {
    setAgency(value);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const activityData = {
      Activity: enteredactivity,
      Date: date,
      StartTime: startTime,
      EndTime: endTime,
      activitytypes_id: activityType,
      agencies_id: agency,
      Location: agency,
      TimeInput: timeSpent,
    };

    if (timeSpent === "") {
      toast({
        variant: "destructive",
        title: "Invalid time input",
        description: "Start time cannot be greater than end time",
        className: "bg-white text-black",
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
      return;
    }
    if (method === "POST") {
      const response = await fetch(`/api/tasks/create`, {
        method: "POST",
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Process failed",
          description: "Could not add new task",
          className: "bg-white text-black",
          action: <ToastAction altText="Try again">Retry</ToastAction>,
        });
        return;
      }

      const { data, status } = await response.json();
      toast({
        title: "Success",
        description: "Task added successfully",
        className: "bg-white text-black",
        action: <CheckCircleIcon className="text-green-500" />,
      });

      onSubmit(activityData);
      
    } else {
      const response = await fetch(`/api/tasks/update/${activity.id}`, {
        method: "PATCH",
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Process failed",
          description: "Could not update task",
          className: "bg-white text-black",
          action: <ToastAction altText="Try again">Retry</ToastAction>,
        });
        return;
      }

      const { status } = await response.json();

      toast({
        title: "Success",
        description: "Task updated successfully",
        className: "bg-white text-black",
        action: <CheckCircleIcon className="text-green-500" />,
      });

      onSubmit(activityData, activity.id);
    }
  }

  return (
    <form
      className={`p-3 h-full justify-center align-middle overflow-y-auto scrollbar-thumb:!rounded ${styles.activityform}`}
      onSubmit={onSubmitHandler}
    >
      <div className="mb-2">
        <label htmlFor="activity">Activity</label>
        <Textarea
          id="activity"
          className="mt-2 resize-none"
          placeholder="Enter activity here"
          defaultValue={activity ? `${activity.Activity}` : ""}
          onChange={onEnteredactivityChangeHandler}
        ></Textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="">Location</label>
        <Select
          onValueChange={onAgencyChangeHandler}
          className="bg-dark mt-2 w-full"
          defaultValue={activity ? `${activity.agencies_id}` : ""}
        >
          <SelectTrigger className="mt-2 ">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {agencies.map((agency) => {
              return (
                <SelectItem
                  key={agency.id}
                  className="text-black hover:bg-slate-400 bg-white"
                  value={`${agency.id}`}
                >
                  {agency.Name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-2">
        <label htmlFor="">Activity Type</label>
        <Select
          onValueChange={onActivityTypeChangeHandler}
          className="bg-dark mt-2 w-full"
          defaultValue={activity ? `${activity.activitytypes_id}` : ""}
        >
          <SelectTrigger className="mt-2 ">
            <SelectValue placeholder="Activity Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {activitytypes.map((type) => {
              return (
                <SelectItem
                  key={type.id}
                  className="text-black hover:bg-slate-400 bg-white"
                  value={`${type.id}`}
                >
                  {type.ActivityType}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-2">
        <label htmlFor="date" className="placeholder-shown:hidden">
          Date
        </label>
        <Input
          id="date"
          type="date"
          className="mt-1 w-full"
          onChange={onDateChangeHandler}
          defaultValue={activity ? activity.Date : ""}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="starttime">Start Time</label>
        <Input
          id="starttime"
          type="time"
          className="mt-2 w-full"
          onChange={onStartTimeChangeHandler}
          defaultValue={activity ? activity.StartTime : ""}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="endtime">End Time</label>
        <Input
          id="endtime"
          type="time"
          className="mt-2 w-full"
          onChange={onEndTimeChangeHandler}
          defaultValue={activity ? activity.EndTime : ""}
        />
      </div>

      <div className="mb-2">
        <Input
          id="week"
          type="text"
          placeholder="time input"
          className="w-full"
          defaultValue={timeSpent}
          readOnly
          disabled
        />
      </div>

      <div className="flex justify-center gap-5">
        <Button
          className="bg-white text-black w-full disabled:bg-zinc-300 mt-2"
          disabled={!formIsValid}
        >
          {method === "POST" && "Save"}
          {method !== "POST" && "Update"}
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;

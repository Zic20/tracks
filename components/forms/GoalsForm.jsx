import React, { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { CheckCircleIcon } from "lucide-react";
import { validateDateInputs } from "@/modules/timecalculation";
import { ToastAction } from "@radix-ui/react-toast";

const GoalsForm = ({ method = "POST", onSubmit, goal }) => {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formIsValid, setFormIsValid] = useState("");

  useEffect(() => {
    if (!goal) {
      return;
    }
    setEnteredGoal(goal.Goal);
    setStartDate(goal.StartDate);
    setEndDate(goal.EndDate);
  }, [goal]);

  useEffect(() => {
    setFormIsValid(enteredGoal !== "" && startDate !== "" && endDate !== "");
  }, [enteredGoal, startDate, endDate]);
  const { toast } = useToast();

  function onGoalChangeHandler(event) {
    setEnteredGoal(event.target.value);
  }

  function onStartDateChangeHandler(event) {
    setStartDate(event.target.value);
  }

  function onEndDateChangeHandler(event) {
    setEndDate(event.target.value);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      toast({
        title: "",
        description: "Please fill all fields",
        className: "bg-white text-black",
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
      return;
    }

    if (!validateDateInputs(startDate, endDate)) {
      toast({
        variant: "destructive",
        title: "Invalid date input",
        description: "End date cannot be earlier than the start date",
        className: "bg-white text-black",
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
      return;
    }

    const goalData = {
      Goal: enteredGoal,
      StartDate: startDate,
      EndDate: endDate,
    };

    if (method === "POST") {
      const response = await fetch("/api/goals/create", {
        method: "POST",
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        const result = await response.json();
        toast({
          title: "Process failed",
          description: result.message,
          className: "bg-white text-black",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
        return;
      }

      const responseData = await response.json();
      if (responseData.status) {
        toast({
          title: "Successful",
          description: "Goal added successfully",
          className: "bg-white text-black",
          action: <CheckCircleIcon className="text-green-500" />,
        });
        onSubmit(goalData);
      }
    } else {
      const response = await fetch(`/api/goals/update/${goal.id}`, {
        method: "PATCH",
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        const result = await response.json();
        toast({
          title: "Process failed",
          description: result.message,
          className: "bg-white text-black",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
        return;
      }

      const responseData = await response.json();
      if (responseData.status) {
        toast({
          title: "Successful",
          description: "Goal updated successfully",
          className: "bg-white text-black",
          action: <CheckCircleIcon className="text-green-500" />,
        });
        onSubmit(goalData, goal.id);
      }
    }
  }

  return (
    <form
      className={`p-3 h-full justify-center align-middle overflow-y-auto scrollbar-thumb:!rounded`}
      onSubmit={onSubmitHandler}
    >
      <div className="mb-2">
        <label htmlFor="goal">Goal</label>
        <Textarea
          id="goal"
          className="mt-2 resize-none"
          placeholder="Enter goal here"
          defaultValue={goal ? `${goal.Goal}` : ""}
          onChange={onGoalChangeHandler}
        ></Textarea>
      </div>

      <div className="mb-2">
        <label htmlFor="endDate" className="placeholder-shown:hidden">
          Start Date
        </label>
        <Input
          id="startDate"
          type="date"
          className="mt-1 w-full"
          defaultValue={goal ? goal.StartDate : ""}
          onChange={onStartDateChangeHandler}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="endDate" className="placeholder-shown:hidden">
          End Date
        </label>
        <Input
          id="endDate"
          type="date"
          className="mt-1 w-full"
          defaultValue={goal ? goal.EndDate : ""}
          onChange={onEndDateChangeHandler}
        />
      </div>
      <Button
        className="bg-white text-black w-full disabled:bg-zinc-300 mt-2"
        disabled={!formIsValid}
      >
        {method === "POST" && "Save"}
        {method !== "POST" && "Update"}
      </Button>
    </form>
  );
};

export default GoalsForm;

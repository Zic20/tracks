import React from "react";
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

const ActivityForm = () => {
  return (
    <form className="pt-5 h-full justify-center align-middle">
      <Textarea
        id="activity"
        className="mb-5"
        placeholder="Enter activity here"
      ></Textarea>
      <Input id="week" type="date" placeholder="Week" className="mt-2 w-full" />
      <Input id="starttime" type="time" className="mt-2 w-full" />
      <Input id="endtime" type="time" className="mt-2 w-full" />
      <Input
        id="week"
        type="text"
        placeholder="time input"
        className="mt-2 w-full"
      />

      <Select className="bg-dark mt-2 w-full">
        <SelectTrigger className="mt-2 ">
          <SelectValue placeholder="Location" />
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
      <Select className="bg-dark mt-2 w-full">
        <SelectTrigger className="mt-2 ">
          <SelectValue placeholder="Activity Type" />
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

      <div className="flex justify-center gap-5">
        <Button className="bg-white text-black w-32 mt-5">Save</Button>
        <Button className="bg-red-500 text-white w-32 mt-5">Cancel</Button>
      </div>
    </form>
  );
};

export default ActivityForm;

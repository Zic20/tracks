import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

const IssuesForm = ({ issue }) => {
  return (
    <form
      className={
        "border rounded-lg  p-5 md:flex flex-wrap flex-col space-y-2 w-full "
      }
    >
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="name" className="mb-2">
            Title
          </label>
          <Input
            type="text"
            className="mt-2 w-full"
            defaultValue={issue?.Title}
            readOnly={true}
          />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="date" className="mb-2">
            Product
          </label>
          <Input
            type="text"
            className="mt-2 w-full"
            defaultValue={issue?.ProductName}
            readOnly={true}
          />
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="name" className="mb-2">
            Client
          </label>
          <Input
            type="text"
            className="mt-2 w-full"
            defaultValue={issue?.Agency}
            readOnly={true}
          />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="date" className="mb-2">
            Reported By
          </label>
          <Input
            type="text"
            className="mt-2 w-full"
            defaultValue={issue?.username}
            readOnly={true}
          />
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="name" className="mb-2">
            Status
          </label>
          <Input
            type="text"
            className="mt-2 w-full"
            defaultValue={issue?.status}
            readOnly={true}
          />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="date" className="mb-2">
            Priority
          </label>
          <Input
            type="text"
            className="mt-2 w-full"
            defaultValue={issue?.priority}
            readOnly={true}
          />
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="w-full mb-2">
          <label htmlFor="name" className="mb-2">
            Description
          </label>
          <Textarea defaultValue={issue?.Description} className="w-full  mt-4 resize-none"/>
        </div>
      </div>
    </form>
  );
};

export default IssuesForm;

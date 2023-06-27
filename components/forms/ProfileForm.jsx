import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function ProfileForm(props) {
  return (
    <div
      className={
        "border rounded-lg p-5 md:flex flex-wrap flex-col space-y-2 w-full " +
        props.className
      }
    >
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            First name
          </label>
          <Input type="text" className="mt-2 w-full" placeholder="First Name" />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Middle name
          </label>
          <Input
            type="text"
            className="mt-2 w-full"
            placeholder="Middle Name"
          />
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Last name
          </label>
          <Input type="text" className="mt-2 w-full" placeholder="Last Name" />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Gender name
          </label>
          <Select className="bg-dark mt-2 w-full">
            <SelectTrigger className="mt-2 ">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Male"
              >
                Male
              </SelectItem>
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Female"
              >
                Female
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Date of birth
          </label>
          <Input type="date" className="mt-2 w-full" placeholder="Last Name" />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Marital Status
          </label>
          <Select className="bg-dark mt-2 w-full">
            <SelectTrigger className="mt-2 ">
              <SelectValue placeholder="Marital Status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Single"
              >
                Single
              </SelectItem>
              <SelectItem
                className="text-black hover:bg-slate-400 bg-white"
                value="Married"
              >
                Married
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Email
          </label>
          <Input type="email" className="mt-2 w-full" placeholder="Email" />
        </div>
        <div className="md:w-6/12 mb-2">
          <label htmlFor="" className="mb-2">
            Phone
          </label>
          <Input
            type="tel"
            className="mt-2 w-full"
            placeholder="Phone Number"
          />
        </div>
      </div>
      <div className="w-full md:flex md:space-x-2">
        <div className="w-full">
          <label htmlFor="" className="mb-2">
            Address
          </label>
          <Textarea
            className="w-full resize-none mt-2"
            placeholder="Type your address here"
          />
        </div>
      </div>

      <Button
        variant="default"
        className="text-white bg-black w-12/12 md:w-3/12 mt-5"
      >
        Save Changes
      </Button>
    </div>
  );
}

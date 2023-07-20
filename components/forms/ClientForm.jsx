import React, { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { CheckCircleIcon } from "lucide-react";
import { ToastAction } from "@radix-ui/react-toast";

const ClientForm = ({ method = "POST", onSubmit, client }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [acronym, setAcronym] = useState("");
  const [formIsValid, setFormIsValid] = useState("");

  useEffect(() => {
    if (!client) {
      return;
    }
    setName(client.Name);
    setEmail(client.Email);
    setPhone(client.PhoneNo);
    setAddress(client.Location);
    setType(client.Type);
    setAcronym(client.Acronym);
  }, [client]);

  useEffect(() => {
    setFormIsValid(
      name !== "" &&
        email !== "" &&
        phone !== "" &&
        address !== "" &&
        type !== "" &&
        acronym !== ""
    );
  }, [name, email, phone, address, type, acronym]);
  const { toast } = useToast();

  function onNameChangeHandler(event) {
    setName(event.target.value);
  }

  function onEmailChangeHandler(event) {
    setEmail(event.target.value);
  }
  function onPhoneChangeHandler(event) {
    setPhone(event.target.value);
  }
  function onAddressChangeHandler(event) {
    setAddress(event.target.value);
  }
  function onTypeChangeHandler(event) {
    setType(event.target.value);
  }
  function onAcronymChangeHandler(event) {
    setAcronym(event.target.value);
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

    const clientData = {
      Name: name,
      Email: email,
      PhoneNo: phone,
      Location: address,
      Type: type,
      Acronym: acronym,
    };

    if (method === "POST") {
      const response = await fetch("/api/clients/create", {
        method: "POST",
        body: JSON.stringify(clientData),
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
          description: "Client added successfully",
          className: "bg-white text-black",
          action: <CheckCircleIcon className="text-green-500" />,
        });
        onSubmit(clientData);
      }
    } else {
      const response = await fetch(`/api/clients/update/${client.id}`, {
        method: "PATCH",
        body: JSON.stringify(clientData),
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
          description: "Client updated successfully",
          className: "bg-white text-black",
          action: <CheckCircleIcon className="text-green-500" />,
        });
        onSubmit(clientData, client.id);
      }
    }
  }

  return (
    <form
      className={`p-3 h-full justify-center align-middle overflow-y-auto scrollbar-thumb:!rounded`}
      onSubmit={onSubmitHandler}
    >
      <div className="mb-2">
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          className="mt-1 w-full"
          onChange={onNameChangeHandler}
          defaultValue={client?.Name}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="acronym">Acronym</label>
        <Input
          id="acronym"
          className="mt-1 w-full"
          onChange={onAcronymChangeHandler}
          defaultValue={client?.Acronym}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="Type" className="placeholder-shown:hidden">
          Type
        </label>
        <Input
          id="Type"
          className="mt-1 w-full"
          placeholder="Client type"
          onChange={onTypeChangeHandler}
          defaultValue={client?.Type}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="address" className="placeholder-shown:hidden">
          Location
        </label>
        <Textarea
          id="address"
          className="mt-1 w-full resize-none"
          onChange={onAddressChangeHandler}
          defaultValue={client?.Location}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="phone" className="placeholder-shown:hidden">
          Phone
        </label>
        <Input
          id="phone"
          className="mt-1 w-full"
          type="text"
          placeholder="Phone number"
          onChange={onPhoneChangeHandler}
          defaultValue={client?.PhoneNo}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="placeholder-shown:hidden">
          Email
        </label>
        <Input
          id="email"
          className="mt-1 w-full"
          type="email"
          onChange={onEmailChangeHandler}
          defaultValue={client?.Email}
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

export default ClientForm;

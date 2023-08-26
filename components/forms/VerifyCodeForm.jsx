import React, { useRef } from "react";
import Link from "next/link";
import { useToast } from "../ui/use-toast";

const VerifyCodeForm = ({ onSubmit, email }) => {
  const codeRef = useRef();
  const { toast } = useToast();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const code = codeRef.current.value;
    const result = await fetch("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({ username: email, code }),
    });
    const data = await result.json();
    if (!result.ok || !data.status) {
      toast({
        variant: "destructive",
        title: "Validation failed",
        description: "Could not validate code",
        className: "bg-red-500 text-white",
      });
      return;
    }
    toast({
      variant: "success",
      title: "Validation successful",
      description: "Code verified successfully",
      className: "bg-white text-black border-green-600",
    });

    onSubmit(code);
  };

  const onResendCodeHandler = async (e) => {
    e.preventDefault();
    const result = await fetch("/api/auth/requestcode?email=" + email, {
      method: "GET",
    });
    if (!result.ok) {
      toast({
        title: "Error",
        description: "Could not generate reset code. Please try again later",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Reset code sent to your email",
      variant: "success",
      className: "bg-white text-black border-green-600",
    });
  };

  return (
    <div className="min-h-screen flex justify-center align-middle bg-slate-200">
      <div className="bg-white shadow-ld md:w-2/6 p-5 text-center text-black rounded-lg my-auto">
        <h1 className="text-2xl mb-5 font-bold">Verify Code</h1>
        <p className="mb-5 text-gray-600">
          Enter the code you received in your email
        </p>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
            placeholder="Write code here"
            ref={codeRef}
            id="code"
          />

          <button className="text-left p-0 w-max" onClick={onResendCodeHandler}>
            Did not receive a code?{" "}
            <span className="text-blue-500 hover:text-blue-700">
              Request new Code
            </span>
          </button>

          <button className="bg-black text-white p-3 w-full my-5 rounded-md">
            Continue
          </button>
        </form>

        <p className="text-center">
          {"Remembered your password? "}
          <Link className="underline text-blue-600" href={"/auth/login"}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyCodeForm;

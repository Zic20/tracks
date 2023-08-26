import React, { useRef } from "react";
import Link from "next/link";
import { useToast } from "../ui/use-toast";

function ResetCodeForm({ onSubmit }) {
  const emailRef = useRef();
  const { toast } = useToast();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
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
    onSubmit(email);
  };
  return (
    <div className="min-h-screen flex justify-center align-middle bg-slate-200">
      <div className="bg-white shadow-ld md:w-2/6 p-5 text-center text-black rounded-lg my-auto">
        <h1 className="text-2xl mb-5 font-bold">Reset Password</h1>
        <p className="mb-5 text-gray-600">
          Enter your email to receive password reset code
        </p>
        <form onSubmit={onSubmitHandler}>
          <input
            type="email"
            className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
            placeholder="Email"
            ref={emailRef}
          />

          <button className="bg-black rounded text-white p-3 w-full my-5">
            Send Code
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
}

export default ResetCodeForm;

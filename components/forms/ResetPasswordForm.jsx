import React, { useRef } from "react";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/router";

function ResetPasswordForm({ email, code }) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const router = useRouter();

  const { toast } = useToast();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmpassword = confirmPasswordRef.current.value;
    if (password !== confirmpassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
        className: "bg-red-500 text-white",
      });
      return;
    }
    const result = await fetch("/api/auth/resetpassword", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password,
        confirmpassword,
        code,
      }),
    });
    const data = await result.json();

    if (!result.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not reset password",
        className: "bg-red-500 text-white",
      });
      return;
    }
    if (!data.status) {
      toast({
        variant: "destructive",
        title: "Error",
        description: data.message,
        className: "bg-red-500 text-white",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Success",
      description: "Password reset successfully",
      className: "bg-white text-black border-green-600",
    });

    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex justify-center align-middle bg-slate-200">
      <div className="bg-white shadow-ld md:w-2/6 p-5 text-center text-black rounded-lg my-auto">
        <h1 className="text-2xl mb-5 font-bold">Reset Password</h1>
        <p className="mb-5 text-gray-600">
          Enter your new password and confirm it
        </p>
        <form onSubmit={onSubmitHandler}>
          <input
            type="password"
            className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
            placeholder="Password"
            ref={passwordRef}
          />
          <input
            type="password"
            className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />

          <button className="bg-black text-white p-3 w-full my-5 rounded-md">
            Reset Password
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

export default ResetPasswordForm;

import Link from "next/link";
import Image from "next/image";
import logo from "../../images/Logo.png";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      confirmPasswordRef.current.value === ""
    ) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please fill all fields in the form",
        className: "bg-red text-white",
      });
      return;
    }

    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: emailRef.current.value,
        password: passwordRef.current.value,
        confirm_password: confirmPasswordRef.current.value,
      }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Account registration failed",
        description: responseData?.message,
        className: "bg-red text-white",
      });
      return;
    }

    if (!responseData.status) {
      toast({
        variant: "destructive",
        title: "Account registration failed",
        description: responseData?.message,
        className: "bg-red text-white",
      });
      return;
    }

    toast({
      variant: "destructive",
      title: "Account registration successfull.",
      description: responseData?.message,
      className: "bg-white text-black",
    });

    router.push("/auth/login")
  };

  return (
    <div className="min-h-screen flex justify-center align-middle bg-slate-200">
      <div className="bg-white shadow-ld md:w-2/6 p-5 text-center text-black rounded-lg my-auto">
        <Image
          src={logo}
          width="50"
          height="50"
          className="rounded-full mx-auto mb-2"
          alt="logo"
        />
        <h1 className="text-2xl mb-5 font-bold">Sign up</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="flex w-full space-x-1.5">
            <input
              type="email"
              className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
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

          <div className="flex flex-row">
            <Link
              className="underline text-blue-600"
              href={"/auth/requestcode"}
            >
              Forgot Password?
            </Link>
          </div>

          <button className="bg-black rounded text-white p-3 w-full my-5">
            Sign me up
          </button>
        </form>

        <p className="text-center">
          {"Already have an account? "}
          <Link className="underline text-blue-600" href={"/auth/login"}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

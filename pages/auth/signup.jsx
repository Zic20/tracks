import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import classes from "./login.module.css";

function Signup() {
  return (
    <div className="flex min-h-screen">
      <div className={classes.sidebackground + " w-1/3 pl-10 pt-10 relative"}>
        <h1 className="text-2xl font-bold font-monospace">TRACKS</h1>
        <p className="text-4xl font-bold absolute top-52">
          {/* write marketing test here */}
        </p>
      </div>
      <div className="bg-white text-left w-2/3 p-20 pt-10 text-black">
        <h1 className="text-2xl mb-5 font-bold">Sign up</h1>
        <div className="flex w-full space-x-1.5">
          <input
            type="email"
            className="border border-black placeholder-black p-3 flex-1 my-5 w-full focus:outline-none"
            placeholder="Email"
          />
        </div>
        <input
          type="password"
          className="border border-black placeholder-black p-3 w-full my-5 focus:outline-none"
          placeholder="Password"
        />
        <input
          type="password"
          className="border border-black placeholder-black p-3 w-full my-5 focus:outline-none"
          placeholder="Confirm Password"
        />

        <div className="flex flex-row">
          <Link className="underline text-blue-600" href={"/auth/requestcode"}>
            Forgot Password?
          </Link>
        </div>

        <button className="bg-black text-white p-3 w-full my-5">Sign In</button>

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

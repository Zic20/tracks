import Link from "next/link";
import classes from "./login.module.css";

function VerifyCodePage() {
  return (
    <div className="flex min-h-screen">
      <div className={classes.sidebackground + " w-1/3 pl-10 pt-10 relative"}>
        <h1 className="text-2xl font-bold font-monospace">TRACKS</h1>
        <p className="text-4xl font-bold absolute top-52">
          {"Let's continue our work together"}
        </p>
      </div>
      <div className="bg-white text-center w-2/3 p-20 pt-10 text-black flex flex-col align-middle justify-center">
        <h1 className="text-2xl mb-5 font-bold">Enter new password</h1>
        <p className="mb-5 text-gray-600">
          {"Let's continue working together"}
        </p>

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

        <button className="bg-black text-white p-3 w-full my-5">
          Reset Password
        </button>

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

export default VerifyCodePage;

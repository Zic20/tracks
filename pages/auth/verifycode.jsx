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
        <h1 className="text-2xl mb-5 font-bold">Verify Code</h1>
        <p className="mb-5 text-gray-600">
          {"We've sent you a code on john****.com"}
        </p>

        <input
          type="text"
          className="border border-black placeholder-black p-3 w-full my-5 focus:outline-none"
          placeholder="Write code here"
        />

        <button className="bg-black text-white p-3 w-full my-5">
          Continue
        </button>

        <p className="text-center">
          {"Did not see the mail? Check your spam mails or "}
          <Link className="underline text-blue-600" href={"/auth/login"}>
            Resend Code
          </Link>
        </p>
      </div>
    </div>
  );
}

export default VerifyCodePage;

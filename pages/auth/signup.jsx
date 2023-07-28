import Link from "next/link";
import Image from "next/image";
import logo from "../../images/Logo.png";

function Signup() {
  return (
    <div className="flex min-h-screen justify-center align-middle bg-slate-200">
      <div className="bg-white shadow-ld w-2/6 p-5 text-center text-black rounded-lg my-auto">
        <Image
          src={logo}
          width="50"
          height="50"
          className="rounded-full mx-auto mb-2"
          alt="logo"
        />
        <h1 className="text-2xl mb-5 font-bold">Sign up</h1>
        <div className="flex w-full space-x-1.5">
          <input
            type="email"
            className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
            placeholder="Email"
          />
        </div>
        <form>
          <input
            type="password"
            className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
            placeholder="Password"
          />
          <input
            type="password"
            className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
            placeholder="Confirm Password"
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
            Sign In
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

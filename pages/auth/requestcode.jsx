import Link from "next/link";

function RequestCodePage() {
  return (
    <div className="min-h-screen flex justify-center align-middle bg-slate-200">
      <div className="bg-white shadow-ld md:w-2/6 p-5 text-center text-black rounded-lg my-auto">
        <h1 className="text-2xl mb-5 font-bold">Reset Password</h1>
        <p className="mb-5 text-gray-600">
          Enter your email to receive password reset code
        </p>

        <input
          type="email"
          className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
          placeholder="Email"
        />

        <button className="bg-black rounded text-white p-3 w-full my-5">
          Send Code
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

export default RequestCodePage;

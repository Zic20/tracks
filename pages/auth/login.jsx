import Link from "next/link";
import { useState, useReducer, useEffect, useContext } from "react";
import authContext from "@/store/auth-context";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import Image from "next/image";
import logo from "../../images/Logo.png";
import Head from "next/head";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/Spinner";
import jwt_decode from "jwt-decode";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

function Login() {
  const [formisValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const router = useRouter();
  const authCtx = useContext(authContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const { toast } = useToast();

  function onEmailChangeHandler(event) {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  }

  function onEmailBlurHandler() {
    dispatchEmail({ type: "BLUR" });
  }

  function onPasswordChangeHandler(event) {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  }
  function onPasswordBlurHandler() {
    dispatchPassword({ type: "BLUR" });
  }

  async function loginHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: emailState.value,
        password: passwordState.value,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      authCtx.login(responseData);
      cookieCutter.set("access", responseData["access_token"]);
      cookieCutter.set("refresh", responseData["refresh_token"]);
      const { usertype } = jwt_decode(responseData["access_token"]);
      let route;
      switch (usertype) {
        case "Manager":
          route = "/dashboard/AdminDashboard";
          break;
        case "Admin":
          route = "/dashboard/AdminDashboard";
          break;
        case "Client":
          route = "/issues";
          break;
        default:
          route = "/dashboard/Staff";
          break;
      }
      router.replace(route);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid credentials",
        description: "Invalid username or password",
        className: "bg-white text-black",
      });
    }
    setIsLoading(false);
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="min-h-screen flex justify-center align-middle bg-slate-200">
        <div className="bg-white shadow-ld md:w-2/6 p-5 text-center text-black rounded-lg my-auto">
          <Image
            src={logo}
            width="50"
            height="100"
            className="mx-auto rounded-full mb-2"
            alt="logo"
          />
          <h1 className="text-2xl mb-5 font-bold">Welcome Back!</h1>
          <p className="mb-5 text-gray-600">Please sign in to continue.</p>

          <form action="">
            <input
              type="email"
              className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
              placeholder="Email"
              onChange={onEmailChangeHandler}
              onBlur={onEmailBlurHandler}
            />
            <input
              type="password"
              className="border border-gray-300 rounded-md placeholder-black p-3 w-full my-5 focus:outline-none"
              placeholder="Password"
              onChange={onPasswordChangeHandler}
              onBlur={onPasswordBlurHandler}
            />

            <div className="flex flex-row">
              <Link
                className="underline text-blue-600"
                href={"/auth/passwordreset"}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              className="bg-black rounded text-white p-3 w-full my-5 disabled:opacity-50"
              disabled={!formisValid || isLoading}
              onClick={loginHandler}
            >
              {isLoading ? <Spinner /> : ""}
              Sign In
            </button>

            <p>
              {"Don't have an account?"}{" "}
              <Link className="underline text-blue-600" href={"/auth/signup"}>
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

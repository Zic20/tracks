import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import classes from "./login.module.css";
import { useState, useReducer, useEffect, useContext } from "react";
import authContext from "@/store/auth-context";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";

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
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  // the reducer below manages password state
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const router = useRouter();

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);
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
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: emailState.value,
        password: passwordState.value,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      cookieCutter.set("access", responseData["access_token"]);
      cookieCutter.set("refresh", responseData["refresh_token"]);
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className={classes.sidebackground + " w-1/3 pl-10 pt-10 relative"}>
        <h1 className="text-2xl font-bold font-monospace">TRACKS</h1>
        <p className="font-bold absolute top-52 text-3xl">
          Log in to your account to easily track your work hours and improve
          your productivity.
        </p>
      </div>
      <div className="bg-white text-left w-2/3 p-20 pt-20 text-black">
        <h1 className="text-2xl mb-5 font-bold">Welcome Back</h1>
        <p className="mb-5 text-gray-600">Sign in to your tracks profile</p>

        <input
          type="text"
          className="border border-black placeholder-black p-3 w-10/12 my-5 focus:outline-none"
          placeholder="Email"
          onChange={onEmailChangeHandler}
          onBlur={onEmailBlurHandler}
        />
        <input
          type="password"
          className="border border-black placeholder-black p-3 w-10/12 my-5 focus:outline-none"
          placeholder="Password"
          onChange={onPasswordChangeHandler}
          onBlur={onPasswordBlurHandler}
        />

        <div className="flex flex-row">
          <Link className="underline text-blue-600" href={"/auth/requestcode"}>
            Forgot Password?
          </Link>
        </div>

        <button
          className="bg-black text-white p-3 w-10/12 my-5"
          disabled={!formisValid}
          onClick={loginHandler}
        >
          Sign In
        </button>

        <p>
          {"Don't have an account?"}{" "}
          <Link className="underline text-blue-600" href={"/auth/signup"}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

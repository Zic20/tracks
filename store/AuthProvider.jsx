"use-client";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import authContext from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    if (storedToken) {
      setToken(storedToken);
      const tokenData = jwt_decode(storedToken);
      setUser(tokenData);
      setHasToken(true);
    }
    if (refresh) {
      setRefreshToken(refresh);
    }
  }, []);

  if (!hasToken && !refreshToken) {
    logoutHandler();
  }

  const setTokens = (data) => {
    setToken(data["access_token"]);
    setRefreshToken(data["refresh_token"]);
    localStorage.setItem("access", data["access_token"]);
    localStorage.setItem("refresh", data["refresh_token"]);
    setHasToken(true);
  };

  function loginHandler(data) {
    setTokens(data);
  }

  function logoutHandler() {
    if (token) {
      setToken("");
      setRefreshToken("");
      Cookies.remove("access");
      Cookies.remove("refresh");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
  }

  const authCtx = {
    isLoggedIn: hasToken,
    token,
    refreshToken,
    user,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <authContext.Provider value={authCtx}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export function retrieveStoredToken() {
  // const token = Cookies.get("access");
  const token = localStorage.getItem("access");
  if (!token) {
    return null;
  }
  if (token === "undefined") {
    return null;
  }
  let tokenData = jwt_decode(token);
  const isExpired = dayjs.unix(tokenData.exp).diff(dayjs()) < 1;
  if (isExpired) {
    return null;
  }
  return token;
}

export function retrieveTokenData() {
  const token = Cookies.get("access");
  console.log(token);
  if (!token) {
    return null;
  }
  if (token === "undefined") {
    return null;
  }

  let tokenData = jwt_decode(token);
  const isExpired = dayjs.unix(tokenData.exp).diff(dayjs()) < 1;
  if (isExpired) {
    return null;
  }
  return tokenData;
}

export function retrieveRefreshToken() {
  const refreshToken = Cookies.get("refresh");
  if (!refreshToken) {
    return null;
  }
  if (refreshToken === "undefined") {
    return null;
  }
  let tokenData = jwt_decode(refreshToken);
  const isExpired = dayjs.unix(tokenData.exp).diff(dayjs()) < 1;
  if (isExpired) {
    return null;
  }
  return refreshToken;
}

export async function authenticateUser() {
  const token = retrieveStoredToken();
  const refresh = retrieveRefreshToken();
  if (!token && refresh) {
    await getNewToken(refresh);
    return;
  }

  return null;
}

export async function getNewToken(token) {
  let userData = { token };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userData),
  });

  const responseData = await response.json();
  Cookies.set("access", responseData.access_token);
  Cookies.set("refresh", responseData.refresh_token);
}

import React, { useState } from "react";
import authContext from "./auth-context";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const AuthProvider = (props) => {
  const accessToken = retrieveStoredToken();
  const refresh = retrieveRefreshToken();
  const [token, setToken] = useState(accessToken);
  const [refreshToken, setRefreshToken] = useState(refresh);
  const [hasToken, setHasToken] = useState(!!accessToken);

  if (!hasToken && !refresh) {
    logoutHandler();
  }

  const setTokens = (data) => {
    setToken(data["access_token"]);
    setRefreshToken(data["refresh_token"]);
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
    }
  }

  const authCtx = {
    isLoggedIn: hasToken,
    token,
    refreshToken,
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
  const token = Cookies.get("access");
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
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userData),
  });

  const responseData = await response.json();
  Cookies.set("access", responseData.access_token);
  Cookies.set("refresh", responseData.refresh_token);
}

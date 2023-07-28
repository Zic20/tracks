import React from "react";

const authContext = React.createContext({
  token: "",
  refreshToken: "",
  isLoggedIn: false,
  user: {},
  register: ({ username, password, confirmPassword }) => {},
  login: (username, password) => {},
  logout: () => {},
});

export default authContext;

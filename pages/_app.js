import AuthProvider from "@/store/AuthProvider";
import authContext from "@/store/auth-context";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

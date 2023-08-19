import { MainNav } from "@/components/ui/MainNav";
import { Toaster } from "@/components/ui/toaster";
import CustomHead from "@/components/utilities/CustomHead";
import { requestNotificationPermission } from "@/public/firebase";
import AuthProvider from "@/store/AuthProvider";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <AuthProvider>
      <CustomHead />
      {!router.pathname.includes("auth") && <MainNav className="mx-6" />}
      <Component {...pageProps} />
      <Toaster className="bg-black text-white" />
    </AuthProvider>
  );
}

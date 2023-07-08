import { MainNav } from "@/components/ui/MainNav";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/store/AuthProvider";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthProvider>
      {!router.pathname.includes("auth") && <MainNav className="mx-6" />}

      <Component {...pageProps} />
      <Toaster className="bg-black text-white" />
    </AuthProvider>
  );
}

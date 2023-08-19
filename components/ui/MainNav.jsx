import AdminNav from "./AdminNav";
import StaffNav from "./StaffNav";
import { useContext } from "react";
import authContext from "@/store/auth-context";
import { useRouter } from "next/router";

export function MainNav({ className }) {
  const router = useRouter();
  const authCtx = useContext(authContext);
  if (!authCtx.user) {
    router.replace("/auth/login");
  }
  const { usertype, name, sub, uniqueid } = authCtx.user;
  return (
    <>
      {usertype === "Staff" && (
        <StaffNav username={name} staffid={uniqueid} userid={sub} />
      )}
      {usertype === "Admin" && <AdminNav />}
    </>
  );
}

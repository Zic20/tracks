import AdminNav from "./AdminNav";
import StaffNav from "./StaffNav";
import { useContext } from "react";
import authContext from "@/store/auth-context";

export function MainNav({ className }) {
  const authCtx = useContext(authContext);
  if (!authCtx.user) {
    return <></>;
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

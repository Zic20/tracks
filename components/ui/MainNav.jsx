import { retrieveStoredToken } from "@/store/AuthProvider";
import jwtDecode from "jwt-decode";
import AdminNav from "./AdminNav";
import StaffNav from "./StaffNav";

export function MainNav({ className }) {
  const accessToken = retrieveStoredToken();
  const { usertype, name, sub, uniqueid } = jwtDecode(accessToken);
  return (
    <>
      {usertype === "Staff" && (
        <StaffNav username={name} staffid={uniqueid} userid={sub} />
      )}
      {usertype === "Admin" && <AdminNav />}
    </>
  );
}

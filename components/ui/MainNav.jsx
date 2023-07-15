import { retrieveTokenData } from "@/store/AuthProvider";
import AdminNav from "./AdminNav";
import StaffNav from "./StaffNav";

export function MainNav({ className }) {
  const tokenData = retrieveTokenData();
  if (tokenData === null) {
    return null;
  }
  const { usertype, name, sub, uniqueid } = tokenData;
  return (
    <>
      {usertype === "Staff" && (
        <StaffNav username={name} staffid={uniqueid} userid={sub} />
      )}
      {usertype === "Admin" && <AdminNav />}
    </>
  );
}

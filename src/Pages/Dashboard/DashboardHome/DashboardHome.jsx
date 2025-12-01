import React from "react";
import useRole from "../../../Hooks/useRole";
import Loading from "../../../Components/loading/Loading";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "../../Rider/RiderDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "rider") {
    return <RiderDashboardHome></RiderDashboardHome>;
  } else {
    return <AdminDashboardHome></AdminDashboardHome>;
  }
};

export default DashboardHome;

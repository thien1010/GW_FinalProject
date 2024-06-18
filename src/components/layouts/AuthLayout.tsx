import { useAuth } from "hooks";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const { accesstoken } = useAuth();
  if (accesstoken) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

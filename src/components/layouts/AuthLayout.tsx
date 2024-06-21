import { useAuth } from "hooks";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

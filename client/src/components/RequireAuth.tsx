import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../hooks/useStore";

const RequireAuth = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;

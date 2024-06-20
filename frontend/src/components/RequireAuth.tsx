import { useAppContext } from "@/contexts/AppContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const context = useAppContext();
  const location = useLocation();

  if (context == undefined) {
    return <div>Loading...</div>;
  }

  const { loggedIn } = context;
  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;

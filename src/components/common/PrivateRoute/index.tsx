import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";

interface PrivateRouteProps {
  children?: JSX.Element;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { children } = props;
  const auth = useAuth();
  const location = useLocation();

  if (auth?.user === null) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;

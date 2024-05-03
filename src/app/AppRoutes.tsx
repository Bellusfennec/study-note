import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Error } from "../pages/Error";
import { Auth } from "../pages/Auth";
import PrivateRoute from "../components/common/PrivateRoute";

const ROUTES = {
  AUTH: "/auth",
  HOME: "/",
  ERROR: "*",
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.AUTH} element={<Auth />} />
      <Route path={ROUTES.HOME} element={<PrivateRoute />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.ERROR} element={<Error />} />
      </Route>
      <Route path={ROUTES.ERROR} element={<Error />} />
    </Routes>
  );
};

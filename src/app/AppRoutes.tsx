import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Error } from "../pages/Error";
import { Auth } from "../pages/Auth";
import PrivateRoute from "../components/common/PrivateRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="auth" element={<Auth />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Error />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

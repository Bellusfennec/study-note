import { Outlet } from "react-router-dom";
import { Nav } from "../../components/ui/Nav";

export const MainLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

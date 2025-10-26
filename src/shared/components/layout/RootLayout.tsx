import { Outlet } from "react-router-dom";
import RootHeader from "./Header/RootHeader";

const RootLayout = () => {
  return (
    <div className="relative overflow-x-hidden hide-scrollbar">
      <RootHeader />
      <Outlet />
    </div>
  );
};

export default RootLayout;

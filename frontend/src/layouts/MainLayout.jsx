import { Outlet } from "react-router-dom";
import Menu from "../components/Menu/Menu";

const MainLayout = () => {
  return (
    <>
      <header className="app-header">
        <h1>Book Library App</h1>
      </header>
      <Menu />
      <Outlet />
    </>
  );
};

export default MainLayout;

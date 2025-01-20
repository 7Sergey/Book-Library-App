import { NavLink } from "react-router-dom";
import "./Menu.scss";

const Menu = () => {
  return (
    <nav>
      <NavLink to="." end>
        Library
      </NavLink>

      <NavLink to="/Profile">Profile</NavLink>
    </nav>
  );
};

export default Menu;

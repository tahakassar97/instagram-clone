import React, { useContext } from "react";
import { NavLink,  useHistory } from "react-router-dom";

import "./Style.css";
import UserContext from "./Context";
import { removeToken } from "./StaticFunctions";
import { REMOVE } from "./Redux";



const Navbar = () => {
  const history = useHistory();
  const { token, dispatch } = useContext(UserContext);
  const NavbarLinks = () => {
    const Logout = () => {
      removeToken();
      dispatch({ type: REMOVE });
      history.push("/login");
    };
    if (token) {
      return (
        <div>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/profile" activeClassName="active">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/post" activeClassName="active">
              Create Post
            </NavLink>
          </li>
          <li>
            <button
              className="btn special-btn #b71c1c red darken-4" type="submit"
              onClick={Logout}
            >
              Logout
            </button>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li>
            <NavLink exact to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/register" activeClassName="active">
              Register
            </NavLink>
          </li>
        </div>
      );
    }
  };
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <label
            className="brand-logo left noselect"
            style={{ marginLeft: "5px" }}
          >
            Instagram
          </label>
          <ul id="nav-mobile" className="right" style={{ marginRight: "5px" }}>
            {NavbarLinks()}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

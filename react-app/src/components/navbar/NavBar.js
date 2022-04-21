import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

import "./NavBar.css";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionElements;
  if (sessionUser) {
    sessionElements = (
      <div className="NavBarContainer">
        <NavLink
          to={`/play/${sessionUser.id}`}
          exact={true}
          activeClassName="active"
        >
          Play Owok
        </NavLink>
        <NavLink to="/browse" exact={true} activeClassName="active">
          Browse
        </NavLink>
        <NavLink
          to={`/profile/${sessionUser.id}`}
          exact={true}
          activeClassName="active"
        >
          Profile
        </NavLink>
        {/* <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </li> */}

        <LogoutButton />
      </div>
    );
  }

  return (
    <>
      <nav>{sessionElements}</nav>
    </>
  );
};

export default NavBar;

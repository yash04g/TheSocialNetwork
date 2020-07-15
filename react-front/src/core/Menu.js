import React from "react";
import { Link, withRouter } from "react-router-dom";
// We use link as a navigation bar because using link the page isn't reloaded again and again when we try to access different pages from the nav bar

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else {
    return { color: "#ffffff" };
  }
};
const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary" id="myTab" role="tablist">
        <li className="nav-item">
          <Link className="nav-link " style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/signin"
            className="nav-link "
            style={isActive(history, "/signin")}
          >
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/signup"
            className="nav-link "
            style={isActive(history, "/signup")}
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);

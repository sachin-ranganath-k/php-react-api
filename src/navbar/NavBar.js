import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            Todo
          </a>
        </div>\
        <div className="navbar-header">
        <Link className="navbar-brand" to="/">
            Register
          </Link>
        </div>
        <div className="navbar-header">
          <Link className="navbar-brand" to="/login">
            Login
          </Link>
        </div>
        

        {/* <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="#">
              <span className="glyphicon glyphicon-user"></span> Sign Up
            </a>
          </li>
          <li>
            <a href="#">
              <span className="glyphicon glyphicon-log-in"></span> Login
            </a>
          </li>
        </ul> */}
      </nav>
    </div>
  );
};

export default NavBar;

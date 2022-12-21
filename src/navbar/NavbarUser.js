import React from "react";
import { Link } from "react-router-dom";

const NavBarUser = () => {
  // const userInfo = sessionStorage.getItem("userInfo");
  // const parsedUserInfo = JSON.parse(userInfo);

  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/userHome">
            Hi
            {/* Hi {parsedUserInfo.userName} */}
          </Link>
        </div>
        \
        <div className="navbar-header">
          <Link className="navbar-brand" to="/myProfile">
            My Profile
          </Link>
        </div>
        <div className="navbar-header">
          <Link className="navbar-brand" to="/logout">
            Logout..!
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBarUser;

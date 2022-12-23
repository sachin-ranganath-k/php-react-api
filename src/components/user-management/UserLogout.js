import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
    navigate("/");
  }, []);

  return <div></div>;
};

export default UserLogout;

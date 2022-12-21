import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  sessionStorage.clear();

  useEffect(() => {
    navigate("/login");
  }, []);

  return <div></div>;
};

export default Logout;

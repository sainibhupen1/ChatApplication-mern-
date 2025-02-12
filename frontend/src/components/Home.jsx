import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>home</h1>
      <p onClick={() => navigate("/signup")}>signup</p>
      <br />
      <p onClick={() => navigate("/login")}>login</p>
    </div>
  );
};

export default Home;

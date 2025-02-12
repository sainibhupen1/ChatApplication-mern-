import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>home</h1>
      <p
        onClick={() => navigate("/signup")}
        className="cursor-pointer text-sky-500"
      >
        signup
      </p>
      <br />
      <p
        onClick={() => navigate("/login")}
        className="cursor-pointer text-sky-500"
      >
        login
      </p>
    </div>
  );
};

export default Home;

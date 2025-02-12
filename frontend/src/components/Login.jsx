import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Toaster } from "./ui/sonner";

const page = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // http://192.168.1.34:5000/
  // https://chatapplication-mern.onrender.com

  const submithandler = async () => {
    try {
      const result = await fetch("http://192.168.1.34:5000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      console.log(data);
      if (result.ok) {
        // Toaster.success(data.message);
        setEmail(""), setPassword("");
        navigate(`/box/${data.users.username}`);
      }
    } catch (error) {
      // Toaster.success(data.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center pt-[100px]">
        <div className=" p-4 shadow w-[400px] flex flex-col gap-4 bg-gray-100 rounded-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="p-2 outline-none border-b w-full text-gray-800 bg-gray-100 border-gray-300"
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 outline-none border-b w-full text-gray-800 bg-gray-100 border-gray-300"
          />

          <button
            className="bg-sky-500 rounded-full p-2 text-white font-medium"
            onClick={submithandler}
          >
            Log In
          </button>

          <span className="text-center">
            Don't have an account?{" "}
            <p className="text-blue-700" onClick={() => navigate("/signup")}>
              Sign Up
            </p>
          </span>
        </div>
      </div>
      ;
    </div>
  );
};

export default page;

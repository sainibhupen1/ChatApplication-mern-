import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

const Page = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submithandler = async () => {
    try {
      const result = await fetch("http://192.168.1.34:5000/signup", {
        method: "post",
        body: JSON.stringify({ username, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      // console.log(data);
      if (result.ok) {
        // toast.success(data.message);
        setUsername(""), setEmail(""), setPassword("");
        navigate("/login");
      }
    } catch (error) {
      // toast.success(data.message);
    }
  };

  return (
    <div className="flex justify-center pt-[100px]">
      <div className=" p-4 shadow w-[400px] flex flex-col gap-4 bg-gray-100 rounded-md">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Your Name"
          className="p-2 outline-none border-b  w-full text-gray-800 bg-gray-100 border-gray-300"
        />
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
          Sign Up
        </button>

        <span className="text-center">
          Already have an account?{" "}
          <p className="text-blue-700" onClick={() => navigate("/login")}>
            Login
          </p>
        </span>
      </div>
    </div>
  );
};

export default Page;

import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        {
          name,
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-[50vw] mx-auto h-[50vh]">
      <form onSubmit={handleRegister}>
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mb-2 rounded-full"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-2 rounded-full"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-2 rounded-full"
        />
        <button
          // onClick={handleRegister}
          className="w-full bg-black text-white rounded-full h-10"
        >
          submit
        </button>
      </form>
      <div className="text-gray-600 mt-4">
        already have account ?{" "}
        <Link to={"/login"} className="text-blue-600">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;

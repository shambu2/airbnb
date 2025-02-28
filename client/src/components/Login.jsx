import React, {  useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect,setRedirect] = useState(false);
  const {setUser} = useContext(UserContext) 
  const handleLogin = async (ev) => {
  
    ev.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        },
        
      );
      // alert('Login successful')
      setRedirect(true)
      setUser(response.data)
      
    } catch (error) {
      alert('Login failed')
    }
  };
  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div className="flex flex-col justify-center items-center w-[50vw] mx-auto h-[50vh]">
      <form onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
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
          
          type="submit"
          className="w-full bg-black text-white rounded-full h-10"
        >
          submit
        </button>
      </form>
      <div className="text-gray-600 mt-4">
        Don't have account ?{" "}
        <Link to={"/register"} className="text-blue-600">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;

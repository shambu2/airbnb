import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
  const { user, ready } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  console.log(subpage);

  const linkClasses = (type) =>
    `py-2 px-6 rounded-full transition ${
      type === subpage
        ? "border px-2 text-white bg-blue-500 rounded-full py-2"
        : "bg-gray-200 text-black"
    }`;

  if (!ready) return "Loading";
  if (ready && !user) <Navigate to={"/login"} />;
  
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", { // Ensure correct backend URL
        method: "POST",
        credentials: "include", 
      });
  
      if (response.ok) {
        
        window.location.href = "/login";
        // <Navigate to="/login"/>
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  } 

  return (
    <div>
      <nav className="flex items-center justify-center gap-6 py-6 ">
        <Link to={"/account"} className={linkClasses(`profile`)}>
          My profile
        </Link>
        <Link to={"/account/bookings"} className={linkClasses("bookings")}>
          My bookings
        </Link>
        <Link to={"/account/places"} className={linkClasses("places")}>
          My accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center mt-4">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="bg-blue-500 rounded-full  py-2 w-[50vw] mt-6">Logout</button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;

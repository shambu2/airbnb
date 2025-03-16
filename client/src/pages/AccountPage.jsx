import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./Places";

const AccountPage = () => {
  const { user, ready } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  console.log(subpage);

  const linkClasses = (type) =>
    `py-2 px-6 flex rounded-full transition  gap-1 ${type === subpage
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="text-center">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>

          My profile
        </Link>
        <Link to={"/account/bookings"} className={linkClasses("bookings")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="text-center">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>

          My bookings
        </Link>
        <Link to={"/account/places"} className={linkClasses("places")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" className="text-center">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
          </svg>

          My accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center mt-4">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="bg-blue-500 rounded-full  py-2 w-[50vw] mt-6">Logout</button>
        </div>
      )}
      {subpage === "places" && (
        <Places />
      )}
    </div>
  );
};

export default AccountPage;

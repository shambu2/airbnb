import React, { useContext } from "react";
// import Logo from '../assets/logo.svg'
import {
  CircleUserRound,
  SendHorizontal,
  Menu,
  SearchIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="w-[92vw] grid  mx-auto  ">
      <div className=" pt-5 pb-5  ">
        <div className=" flex justify-between items-center ">
          <Link
            to={user ? "/" : "/"}
            className="flex gap-3 pt-2 hover:text-[#ff385c]"
          >
            <SendHorizontal
              className="-rotate-90 "
              fill="black"
              stroke={1.5}
              size={35}
            />
            <p className="hidden lg:block text-2xl hover:text-[#ff385c] font-semibold">
              airbnb
            </p>
          </Link>
          <div className="flex border text-nowrap rounded-full shadow-xl px-4 py-2 gap-6 items-center">
            <div className="border-r border-black px-4">Anywhere</div>
            <div className="border-r border-black px-4">Any week</div>
            <div className="flex items-center gap-4">
              <p>Add guest</p>
              <div className=" h-8 w-8 flex items-center rounded-full bg-[#ff385c]">
                <SearchIcon className=" w-10 h-6 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex items-center justify-center gap-2 border py-2 px-2  rounded-full">
              <Menu size={17} />
              <Link to={user ? "/account" : "/login"}>
                <CircleUserRound size={25} />
              </Link>
              {!!user && <div className="max-w-20">{user.name}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

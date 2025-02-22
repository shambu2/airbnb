import React from "react";
// import Logo from '../assets/logo.svg'
import {
  Globe,
  CircleUserRound,
  SendHorizontal,
  Tally3,
  SearchXIcon,
  Search,
  Menu,
  SearchIcon,
  SendHorizonal,
  GlobeIcon,
  MenuIcon,
  UserRoundIcon,
} from "lucide-react";
const Navbar = () => {
  return (
    <div className="w-[92vw] grid grid-rows-3  mx-auto ">
      <div className="hidden md:block pt-5 pb-5  ">
        <div className=" flex justify-between items-center ">
          <div className="flex gap-3 pt-2 hover:text-[#ff385c]">
            <SendHorizontal
              className="-rotate-90 "
              fill="black"
              stroke={1.5}
              size={35}
            />
            <p className="hidden lg:block text-2xl hover:text-[#ff385c] font-semibold">
              airbnb
            </p>
          </div>
          <div className="hidden  lg:block ">
            <div className="grid grid-cols-2 items-center justify-center gap-3">
              <p className="font-semibold ">Homes</p>
              <p className="font-extralight ">Experiences</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex gap-6 pt-2 text-sm font-semibold items-center justify-center">
              <p>Airbnb your home</p>
              <Globe size={17} />
            </div>
            <div className="flex items-center justify-center gap-3 border py-2 px-2  rounded-full">
              <Menu size={17} />
              <CircleUserRound size={25} />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block lg:hidden my-6 ">
        <div className="flex items-center justify-center gap-6 ">
          <p className="font-semibold">Homes</p>
          <p className="font-extralight">Experiences</p>
        </div>
      </div>
      <div className="hidden  md:block w-[80vw] h-16 mx-auto bg--50 ">
        <div className="grid grid-flow-col border  h-full rounded-full mx-auto shadow-slate-400 shadow-md">
          <div className=" h-full hover:rounded-full pt-2 my-auto text-xs pl-4 cursor-pointer hover:bg-slate-200 ">
            <p>Where</p>
            
            <input type="text" className="text-gray-600 font-extralight py-2 w-full outline-none bg-transparent" placeholder="Search destination" />
          </div>
          <div className="flex flex-col text-xs items-center justify-center border-x h-10 my-auto">
            <p>Check in</p>
            <p className="text-gray-600 font-extralight">Add dates</p>
          </div>
          <div className="flex flex-col text-xs items-center justify-center border-x h-10 my-auto">
            <p>Check out</p>
            <p className="text-gray-600 font-extralight">Add dates</p>
          </div>
          <div className="flex justify-between text-xs px-4 items-center border-l h-10 my-auto">
            <div>
              <p>Who</p>
              <p className="text-gray-600 font-extralight">Add guests</p>
            </div>
            <div className=" h-10 w-10 flex items-center rounded-full bg-[#ff385c]">
              <SearchIcon className=" w-10 h-6 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden bg-slate-50">
        <div className="border w-[90vw] h-16 mx-auto rounded-full flex justify-center items-center gap-4  font-semibold mt-2 shadow-md">
          <Search size={15} />
          <p>Start your search</p>
        </div>
      </div>
      <div className="grid">icons</div>
    </div>
  );
};

export default Navbar;

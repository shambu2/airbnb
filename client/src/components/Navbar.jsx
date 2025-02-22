import React from "react";
import { Globe, CircleUserRound, SendHorizontal, Tally3 } from "lucide-react";
const Navbar = () => {
  return (
    <div className="">
      <div className="hidden sm:block">
        <div className=" flex justify-between  ">
          <div className="flex gap-3">
            <SendHorizontal />
            <p>airbnb</p>
          </div>

          <p className=" gap-2 hidden lg:block">
            <span>Homes</span>
            <span>Experiences</span>
          </p>

          <div className="flex gap-8">
            <div className="flex gap-2">
              <p>Airbnb your home</p>
              <Globe />
            </div>
            <div className="flex">
              <Tally3 className="rotate-90" />
              <CircleUserRound />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block md:hidden">
        <p>Homes</p>
        <p>Experiences</p>
      </div>
      <div className="hidden sm:block">
        <input type="text" />
        <input type="date" name="" id="" />
      </div>
      <div className="sm:hidden bg-slate-500">
        <input type="text" />
      </div>
      <div className="grid">icons</div>
    </div>
  );
};

export default Navbar;

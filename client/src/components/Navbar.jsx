import React from "react";
import { Globe, CircleUserRound, SendHorizontal, Tally3 } from "lucide-react";
const Navbar = () => {
  return (
    <div className="">
      <div className="flex justify-between  ">
        <div className="flex gap-3">
          <SendHorizontal />
          <p>airbnb</p>
        </div>

        <p className="flex gap-2 hidden lg:block">
          <span>Homes</span>
          <span>Experiences</span>
        </p>
        <div className="flex gap-2">
          <p>Airbnb your home</p>
          <Globe />
        </div>
        <div className="flex gap-2">
          <Tally3 className="rotate-90"/>
          <CircleUserRound />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;

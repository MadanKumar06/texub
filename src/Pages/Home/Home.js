import React from "react";
import "./Home.css";
import { Departments } from "../../Components/Home/Departments/Departments";
import { Favorites } from "../../Components/Home/Favorites/Favorites";
import { Todaysdeal } from "../../Components/Home/Todaysdeal/Todaysdeal";
import { Benfits } from "../../Components/Home/Benfits/Benfits";
import { Auctions } from "../../Components/Home/Auctions/Auctions";
import { B2Bconnect } from "../../Components/Home/B2Bconnect/B2Bconnect";

export const Home = () => {
  return (
    <div className="Home">
      <Departments />
      <Favorites />
      <Todaysdeal />
      <Benfits />
      <Auctions />
      <B2Bconnect />
    </div>
  );
};

import React from "react";
import { Auctions } from "../../Components/Auctions/Auctions";
import { Favorites } from "../../Components/Favorites/Favorites";
import { Todaysdeal } from "../../Components/Todaysdeal/Todaysdeal";
import { Departments } from "../../Components/Departments/Departments";
import { B2Bconnect } from "../../Components/B2Bconnect/B2Bconnect";
import { Benfits } from "../../Components/Benfits/Benfits";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

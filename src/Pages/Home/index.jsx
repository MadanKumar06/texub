import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Departments } from "../../Components/Home/Departments/Departments";
import { Favorites } from "../../Components/Home/Favorites/Favorites";
import { Todaysdeal } from "../../Components/Home/Todaysdeal/Todaysdeal";
import { Benfits } from "../../Components/Home/Benfits/Benfits";
import { Auctions } from "../../Components/Home/Auctions/Auctions";
import { B2Bconnect } from "../../Components/Home/B2Bconnect/B2Bconnect";
import Constant from '../../Constant'
import axios from "axios";
import { useStateValue } from "../../store/state";

export const Home = () => {
  const [{}, dispatch] = useStateValue()
  const [homedata, sethomedata] = useState([])

  // useEffect(async() =>{
  //   try {
  //     const home = await axios({
  //       method: 'get',
  //       url: `${Constant.baseUrl()}/getHomePage`
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, [])


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

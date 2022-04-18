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
  const [homedata, sethomedata] = useState({
    homecontent: []
  })

  useEffect(async() =>{
    try {
      const home = await axios({
        method: 'get',
        url: `${Constant.baseUrl()}/getHomePage`
      })
      sethomedata(prevState => ({
        ...prevState,
        homecontent: Object.assign({}, ...home.data)
      }))
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <div className="Home">
      <Departments data={homedata?.homecontent?.banner} />
      <Favorites data={homedata?.homecontent?.block_2} />
      <Todaysdeal data={homedata?.homecontent?.todays_deal} />
      <Benfits data={homedata?.homecontent?.block_4} />
      <Todaysdeal data={homedata?.homecontent?.block_5} />
      {/* <Auctions data={homedata?.banner} /> */}
      <B2Bconnect data={homedata?.homecontent?.block_6} />
    </div>
  );
};

import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Departments } from "../../Components/Home/Departments/Departments";
import { Favorites } from "../../Components/Home/Favorites/Favorites";
import { Todaysdeal } from "../../Components/Home/Todaysdeal/Todaysdeal";
import { Benfits } from "../../Components/Home/Benfits/Benfits";
import { Auctions } from "../../Components/Home/Auctions/Auctions";
import { B2Bconnect } from "../../Components/Home/B2Bconnect/B2Bconnect";
import Constant from "../../Constant";
import axios from "axios";
import { useStateValue } from "../../store/state";
import { useParams, useNavigate } from "react-router-dom";

export const Home = () => {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  const [homedata, sethomedata] = useState({
    homecontent: [],
  });

  const history = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (geo === "") return;
    let temp = Object.values(history);
    if (temp.length === 0) {
      navigate(`/${geo?.country_name}`);
    } else {
      dispatch({
        type: "GEO__CUSTOM__STORE",
        data: temp?.[0],
      });
      dispatch({
        type: "GEO__CUSTOM__NOSTORE",
        data: temp?.[0],
      });
      navigate(`/${temp?.[0]}`);
    }
  }, [customstore, geo]);

  useEffect(async () => {
    try {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      const home = await axios({
        method: "get",
        url: `${Constant.baseUrl()}/getHomePage`,
      });
      sethomedata((prevState) => ({
        ...prevState,
        homecontent: Object.assign({}, ...home.data),
      }));
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  }, []);

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

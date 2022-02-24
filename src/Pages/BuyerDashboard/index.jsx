import React, { useState } from "react";
import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import bg from "../../Assets/buyerdashboard/bg.png";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import notification from "../../Assets/sellerdashboard/notification.png";

import Sidebar from "../../Components/Sidebar";
import Dashboard from "../../Components/BuyerDashboard/Dashbaord";
import MyOrders from "../../Components/BuyerDashboard/MyOrders";
import Auctions from "../../Components/BuyerDashboard/Auctions";
import WantToBuy from "../../Components/BuyerDashboard/WantToBuy";
import PaymentMethod from "../../Components/BuyerDashboard/PaymentMethods";
import MyProfile from "../../Components/BuyerDashboard/MyProfile";
import Wishlist from "../../Components/BuyerDashboard/Wishlist";
import RMA from "../../Components/BuyerDashboard/RMA";
import MergeCarts from "../../Components/BuyerDashboard/MergeCarts";
import ApproveCarts from "../../Components/BuyerDashboard/ApproveCarts";
import SubAccountOrders from "../../Components/BuyerDashboard/SubAccountOrders";

function Index() {
  const [currentmenu, setcurrentmenu] = useState();
  let navigate = useNavigate();

  const selectmenu = (value) => {
    setcurrentmenu(value);
    navigate(`/buyerdashboard/${value}`);
    // setshowregister(false)
  };

  const { currenttab } = useParams();
  return (
    <div className="buyerdashboard">
      <img src={bg} alt="" />
      <div className="buyerboard__bg">
        <Sidebar
          color="blue"
          selectmenu={selectmenu}
          setcurrentmenu={setcurrentmenu}
          currentmenu={setcurrentmenu}
          currenttab={currenttab}
        />
        <div className="buyerdashboard__main">
          <div className="buyerdashboard__search">
            <Paper
              className="buyerdashboard__searchinput"
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ "aria-label": "search google maps" }}
                className="buyerdashboard__input"
              />
            </Paper>
            <div className="buyerdashboard__notiIcon">
              <img src={notification} alt="" />
            </div>
            <span>Notification</span>
          </div>
          {currenttab === "dashboard" && <Dashboard />}
          {currenttab === "myorder" && <MyOrders />}
          {currenttab === "auctions" && <Auctions />}
          {currenttab === "wanttobuy" && <WantToBuy />}
          {currenttab === "payment" && <PaymentMethod />}
          {currenttab === "myprofile" && <MyProfile />}
          {currenttab === "wishlist" && <Wishlist />}
          {currenttab === "rma" && <RMA />}
          {currenttab === "approvecarts" && <ApproveCarts />}
          {currenttab === "mergecarts" && <MergeCarts />}
          {currenttab === "subaccountorders" && <SubAccountOrders />}
        </div>
      </div>
    </div>
  );
}

export default Index;

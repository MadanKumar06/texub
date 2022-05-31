import React, { useState } from "react";
import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Sidebar from "../../Components/Sidebar";
import Dashboard from "../../Components/BuyerDashboard/Dashbaord";
import MyOrders from "../../Components/BuyerDashboard/MyOrders";
import Auctions from "../../Components/BuyerDashboard/Auctions";
import WantToBuy from "../../Components/BuyerDashboard/WantToBuy";
import PaymentMethod from "../../Components/BuyerDashboard/PaymentMethods";
import MyProfile from "../../Components/BuyerDashboard/MyProfile";
import Wishlist from "../../Components/BuyerDashboard/Wishlist";
import RMA from "../../Components/BuyerDashboard/RMA";
import InvoicesList from "../../Components/BuyerDashboard/InvoicesList";
import OrderDetails from "../../Components/BuyerDashboard/InvoicesList/OrderDetails";
import MergeCarts from "../../Components/BuyerDashboard/MergeCarts";
import ApproveCarts from "../../Components/BuyerDashboard/ApproveCarts";
import SubAccountOrders from "../../Components/BuyerDashboard/SubAccountOrders";
import NotActivated from "../../Components/BuyerDashboard/NotActivated";
import notification from "../../Assets/sellerdashboard/notification.png";
import OrderInfo from '../../Components/BuyerDashboard/MyOrders/OrdersInfo'
import { useStateValue } from "../../store/state";

const Index = () => {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  const [currentmenu, setcurrentmenu] = useState();
  const [searchupdate, setsearchupdate] = useState(false);
  const updatesearch = (e) => {
    e.preventDefault();
    setsearchupdate(!searchupdate);
  };

  const [search, setSearch] = useState("");
  let navigate = useNavigate();

  const selectmenu = (value) => {
    setcurrentmenu(value);
    navigate(
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/${value}`
    );
    setbarstate(false);
  };

  const [barstate, setbarstate] = useState(false);

  const sidebarstate = () => {
    setbarstate(true);
  };

  const { currenttab } = useParams();

  return (
    <div className="buyerdashboard">
      {!barstate && <p className="sidebarhide" onClick={sidebarstate}></p>}
      <div className="buyerboard__bg">
        <Sidebar
          color="blue"
          selectmenu={selectmenu}
          setcurrentmenu={setcurrentmenu}
          currentmenu={currentmenu}
          currenttab={currenttab}
          setbarstate={setbarstate}
          barstate={barstate}
        />
        <div className="buyerdashboard__main">
          {/* <div className="buyerdashboard__search">
            <Paper
              className="buyerdashboard__searchinput"
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ "aria-label": "search google maps" }}
                className="buyerdashboard__input"
              />
              <IconButton type="submit"  onClick={(event) => event.preventDefault()} sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <div className="buyerdashboard__notiIcon">
              <img src={notification} alt="" />
            </div>
            <span>Notification</span>
          </div> */}
          {currenttab === "dashboard" && <Dashboard />}
          {currenttab === "myorder" && (
            <MyOrders searchdata={search} searchupdate={searchupdate} />
          )}
          {currenttab === "invoiceslist" && <InvoicesList />}
          {currenttab === "auctions" && <Auctions />}
          {currenttab === "wanttobuy" && <WantToBuy />}
          {currenttab === "payment" && <PaymentMethod />}
          {currenttab === "myprofile" && <MyProfile />}
          {currenttab === "wishlist" && <Wishlist />}
          {currenttab === "rma" && <RMA />}
          {currenttab === "approvecarts" && <ApproveCarts />}
          {currenttab === "mergecarts" && <MergeCarts />}
          {currenttab === "subaccountorders" && <SubAccountOrders />}
          {currenttab === "notactived" && <NotActivated />}
          {currenttab === "OrderDetails" && <OrderDetails />}
          {currenttab === "view-order" && <OrderInfo />}
        </div>
      </div>
    </div>
  );
};

export default Index;

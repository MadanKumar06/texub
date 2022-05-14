import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";

// import bg from "../../Assets/sellerdashboard/bg.png";
import notification from "../../Assets/sellerdashboard/notification.png";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Dashboard from "../../Components/SellerDashboard/Dashboard";
import Inventory from "../../Components/SellerDashboard/Inventory";
import RegisterProduct from "../../Components/SellerDashboard/Inventory/RegisterProduct";
import Bulkupload from "../../Components/SellerDashboard/Inventory/Bulkupload";
import SuccessPage from "../../Components/SellerDashboard/Inventory/SuccessPage";
import UpdateProduct from "../../Components/SellerDashboard/Inventory/UpdateProduct";
import Orders from "../../Components/SellerDashboard/Orders";
import UserMgmt from "../../Components/SellerDashboard/UserMgmt/Index";
import Sidebar from "../../Components/Sidebar";
import Sellerservices from "../../Components/SellerDashboard/Sellerservices";
import Directenqueries from "../../Components/SellerDashboard/Directenqueries";
import Paymentmethods from "../../Components/SellerDashboard/Paymentmethods";
import PendingProduct from "../../Components/SellerDashboard/Inventory/PendingProducts";
import SmartRecommendation from "../../Components/SellerDashboard/SmartRecommendation";
import MyProfile from "../../Components/SellerDashboard/MyProfile";
import axios from "axios";
import Constant from "../../Constant";
import { useStateValue } from "../../store/state";

function SellerDashboard() {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  const [currentmenu, setcurrentmenu] = useState();
  let navigate = useNavigate();

  const selectmenu = (value) => {
    setcurrentmenu(value);
    navigate(
      `/${
        customnostore ? customnostore : geo?.country_name
      }/sellerdashboard/${value}`
    );
    setshowregister(false);
    setbarstate(false);
  };

  const { currenttab } = useParams();

  const [userform, setuserform] = useState(false);

  const [showregister, setshowregister] = useState(false);
  const [pid, setpid] = useState();

  const [editdata, seteditdata] = useState();

  const registerproduct = (value, value1, value2) => {
    setshowregister(true);
    if (value === "updateproduct") {
      navigate(
        `/${
          customnostore ? customnostore : geo?.country_name
        }/sellerdashboard/${value}/${value1}`
      );
    } else if (value === "addproduct") {
      navigate(
        `/${
          customnostore ? customnostore : geo?.country_name
        }/sellerdashboard/${value}/${value1}`
      );
    } else {
      navigate(
        `/${
          customnostore ? customnostore : geo?.country_name
        }/sellerdashboard/${value}`
      );
    }
  };

  useEffect(() => {
    if (
      currenttab === "registerproduct" ||
      currenttab === "success" ||
      currenttab === "updateproduct" ||
      currentmenu === "addproduct" ||
      userform === true
    ) {
      setshowregister(true);
    }
  }, [currenttab, userform]);

  const [registersuccess] = useState(
    "You have submitted the product registration form successfully. once your product has been registered, you will receive a mail notification."
  );
  const [updatesuccess] = useState(
    "You have updated the product details successfully."
  );
  const [addsuccess] = useState("You have added the product successfully.");

  const [barstate, setbarstate] = useState(false);

  const sidebarstate = () => {
    setbarstate(true);
  };
  const [searchupdate, setsearchupdate] = useState(false)
  const updatesearch = (e) => {
    e.preventDefault()
    setsearchupdate(!searchupdate)
  }

  const [search, setSearch] = useState("")

  useEffect(() => {
    debugger
    setSearch("")
  }, [window.location.pathname])
  console.log(search)
  return (
    <div className="sellerdashboard">
      {/* <img src={bg} alt="" /> */}
      {!barstate && <p className="sidebarhide" onClick={sidebarstate}></p>}
      <div className="sellerboard__bg">
        <Sidebar
          setbarstate={setbarstate}
          barstate={barstate}
          color="yellow"
          selectmenu={selectmenu}
          setcurrentmenu={setcurrentmenu}
          currentmenu={currentmenu}
          currenttab={currenttab}
        />
        <div className="sellerdashboard__maintab">
          {showregister === true ||
          currenttab === "inventory" ||
          currenttab === "bulkupload" ? (
            ""
          ) : (
            <div className="sellerdashboard__search">
              <Paper
                className="sellerdashboard__searchinput"
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search google maps" }}
                  className="sellerdashboard__input"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && updatesearch(e)}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={(e) => updatesearch(e)}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              {/* <div className="sellerdashboard__notiIcon">
                <img src={notification} alt="" />
              </div>
              <span>Notification</span> */}
            </div>
          )}

          {currenttab === "dashboard" && <Dashboard />}

          {currenttab === "inventory" && (
            <Inventory registerproduct={registerproduct} />
          )}
          {/* {currenttab === "myprofile" && <MyProfile />} */}
          {currenttab === "registerproduct" && <RegisterProduct />}
          {currenttab === "bulkupload" && <Bulkupload />}
          {currenttab === "registersuccess" && (
            <SuccessPage msg={registersuccess} />
          )}
          {currenttab === "pending-product" && (
            <PendingProduct registerproduct={registerproduct} />
          )}
          {currenttab === "updateproduct" && (
            <UpdateProduct type="Update New Product Details" pid={pid} />
          )}
          {currenttab === "updatesuccess" && (
            <SuccessPage msg={updatesuccess} />
          )}

          {currenttab === "addproduct" && (
            <UpdateProduct type="Add Product Details" pid={pid} />
          )}
          {currenttab === "addsuccess" && <SuccessPage msg={addsuccess} />}

          {currenttab === "orders" && <Orders searchdata={search} searchupdate={searchupdate}/>}

          {currenttab === "usermgmt" && (
            <MyProfile />
            // <UserMgmt setuserform={setuserform} userform={userform} />
          )}

          {currenttab === "sellerservices" && <Sellerservices />}

          {currenttab === "directenquiries" && <Directenqueries searchdata={search} searchupdate={searchupdate}/>}
          {currenttab === "paymentmethods" && <Paymentmethods />}
          {currenttab === "smart-recommendation" && <SmartRecommendation searchdata={search} searchupdate={searchupdate} />}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;

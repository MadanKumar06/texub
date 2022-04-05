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
import SuccessPage from "../../Components/SellerDashboard/Inventory/SuccessPage";
import UpdateProduct from "../../Components/SellerDashboard/Inventory/UpdateProduct";
import Orders from "../../Components/SellerDashboard/Orders";
import UserMgmt from "../../Components/SellerDashboard/UserMgmt/Index";
import Sidebar from "../../Components/Sidebar";
import Sellerservices from "../../Components/SellerDashboard/Sellerservices";
import Directenqueries from "../../Components/SellerDashboard/Directenqueries";
import Paymentmethods from "../../Components/SellerDashboard/Paymentmethods";
import PendingProduct from '../../Components/SellerDashboard/Inventory/PendingProducts'
import axios from "axios";
import Constant from "../../Constant";

function SellerDashboard() {
  const [currentmenu, setcurrentmenu] = useState();
  let navigate = useNavigate();

  const selectmenu = (value) => {
    setcurrentmenu(value);
    navigate(`/sellerdashboard/${value}`);
    setshowregister(false);
    setbarstate(false);
  };

  const { currenttab } = useParams();

  const [userform, setuserform] = useState(false);

  const [showregister, setshowregister] = useState(false);
  const [pid, setpid] = useState()

  const [editdata, seteditdata] = useState()

  const registerproduct = (value, value1, value2) => {
    setshowregister(true);
    if (value === 'updateproduct') {
      navigate(`/sellerdashboard/${value}/${value1}`);  
    } else {
      navigate(`/sellerdashboard/${value}`);
    }
    if(value2 === 'update'){
      setpid(value1) 
      const data = async() => {
        const user = JSON.parse(localStorage.getItem('userdata'))
          try {
            const formdata = await axios({
              method: 'post',
              url: `${Constant.baseUrl()}/getEditFormData`,
              data: {
                "product_id" : value1,
                "seller_id" : user?.id
              },
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            // console.log(formdata?.data)
            seteditdata(formdata?.data[0])
          } catch(e) {
            console.log(e)
          }
      }
      data()
    }
  };

  console.log(editdata)
  
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
          {showregister === false && (
            <div className="sellerdashboard__search">
              <Paper
                className="sellerdashboard__searchinput"
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
              >
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search google maps" }}
                  className="sellerdashboard__input"
                />
              </Paper>
              <div className="sellerdashboard__notiIcon">
                <img src={notification} alt="" />
              </div>
              <span>Notification</span>
            </div>
          )}

          {currenttab === "dashboard" && <Dashboard />}

          {currenttab === "inventory" && (
            <Inventory registerproduct={registerproduct} />
          )}

          {currenttab === "registerproduct" && <RegisterProduct />}
          {currenttab === "registersuccess" && (
            <SuccessPage msg={registersuccess} />
          )}
          {currenttab === "pending-product" && (
            <PendingProduct registerproduct={registerproduct} />
          )}
          {currenttab === "updateproduct" && (
            <UpdateProduct type="Update New Product Details" data={editdata} />
          )}
          {currenttab === "updatesuccess" && (
            <SuccessPage msg={updatesuccess} />
          )}

          {currenttab === "addproduct" && (
            <UpdateProduct type="Add Product Details" />
          )}
          {currenttab === "addsuccess" && <SuccessPage msg={addsuccess} />}

          {currenttab === "orders" && <Orders />}

          {currenttab === "usermgmt" && (
            <UserMgmt setuserform={setuserform} userform={userform} />
          )}

          {currenttab === "sellerservices" && <Sellerservices />}

          {currenttab === "directenquiries" && <Directenqueries />}
          {currenttab === "paymentmethods" && <Paymentmethods />}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;


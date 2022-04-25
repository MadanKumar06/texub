import React from "react";
import { Menu, MenuItem, Button, Badge } from "@mui/material";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import dashboardLogo from "../../../Assets/CommonImage/MyAccountMegamenu/menu.png";
import myOrderLogo from "../../../Assets/CommonImage/MyAccountMegamenu/shopping-bag.png";
import auctionsLogo from "../../../Assets/CommonImage/MyAccountMegamenu/auction.png";
import logoutLogo from "../../../Assets/CommonImage/MyAccountMegamenu/logout.png";
import account_circle from "../../../Assets/CommonImage/My Account.png";
import { useStateValue } from "../../../store/state";

import swal from "sweetalert2";
const MyAccountPopup = () => {
  const [{geo, customstore, customnostore}, dispatch] = useStateValue()
  let isSignedIn = JSON.parse(localStorage.getItem("userdata"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const SignOut = () => {
    setAnchorEl(null);
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign Out!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          swal.fire({
            text: "You have Successfully logged out !",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => {
            history(`/${customnostore ? customnostore : geo?.country_name}`);
            window.location.reload();
          }, 1000);
        }
      });
  };

  let userData = JSON.parse(localStorage.getItem("userdata"));
  let userCode = userData?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_code"
  );
  return (
    <div className="myAccount_popup_header_dropdown">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div className="account_circle_image">
          <img src={account_circle} alt="" />
        </div>
        <li className="user_account">
          <span className="user_code">{userCode?.[0]?.value}</span>
          <span className="user_name">
            {userData?.firstname} {userData?.lastname}
          </span>
        </li>
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="menulist_items"
      >
        {isSignedIn?.group_id === 5 && (
          <MenuItem onClick={() => handleClose()}>
            <Link to={`/${customnostore ? customnostore : geo?.country_name}/buyerdashboard/dashboard`}>
              <img src={dashboardLogo} alt="" />
              Dashboard
            </Link>
          </MenuItem>
        )}
        {isSignedIn?.group_id === 6 && (
          <MenuItem onClick={() => handleClose()}>
            <Link to={`/${customnostore ? customnostore : geo?.country_name}/sellerdashboard/dashboard`}>
              <img src={dashboardLogo} alt="" />
              Seller Dashboard
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={() => handleClose()}>
          <Link to={`/${customnostore ? customnostore : geo?.country_name}/kycdetails`}>
            <img src={dashboardLogo} alt="" />
            KYC Details
          </Link>
        </MenuItem>
        {isSignedIn?.group_id === 5 && (
          <>
            <MenuItem onClick={() => handleClose()}>
              <img src={myOrderLogo} alt="" />
              My Orders
            </MenuItem>
            <MenuItem onClick={() => handleClose()}>
              <img src={auctionsLogo} alt="" />
              Auctions
            </MenuItem>
            <MenuItem onClick={() => handleClose()}>
              <Link to={`/${customnostore ? customnostore : geo?.country_name}/buyerdashboard/invoiceslist`}>
                <img src={auctionsLogo} alt="" />
                Pending Invoices
              </Link>
            </MenuItem>
          </>
        )}
        <MenuItem onClick={() => SignOut()}>
          <img src={logoutLogo} alt="" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
export default MyAccountPopup;

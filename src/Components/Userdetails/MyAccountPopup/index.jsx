import React from "react";
import { Menu, MenuItem, Button, Badge } from "@mui/material";
import "./styles.scss";
import { Link } from "react-router-dom";
import dashboardLogo from "../../../Assets/CommonImage/MyAccountMegamenu/menu.png";
import myOrderLogo from "../../../Assets/CommonImage/MyAccountMegamenu/shopping-bag.png";
import auctionsLogo from "../../../Assets/CommonImage/MyAccountMegamenu/auction.png";
import logoutLogo from "../../../Assets/CommonImage/MyAccountMegamenu/logout.png";
import account_circle from "../../../Assets/CommonImage/My Account.png";
const MyAccountPopup = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="myAccount_popup_header_dropdown">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {/* <Badge badgeContent={1} className="badge_user"> */}
        <div className="account_circle_image">
          <img src={account_circle} alt="" />
        </div>

        {/* </Badge> */}
        <li className="user_account">My Account</li>
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="menulist_items"
      >
        <MenuItem onClick={() => handleClose()}>
          <Link to="/buyerdashboard/dashboard">
            <img src={dashboardLogo} alt="" />
            Buyer Dashboard
          </Link>
        </MenuItem>
        <MenuItem onClick={() => handleClose()}>
          <Link to="/sellerdashboard/dashboard">
            <img src={dashboardLogo} alt="" />
            Seller Dashboard
          </Link>
        </MenuItem>
        <MenuItem onClick={() => handleClose()}>
          <img src={myOrderLogo} alt="" />
          My Orders
        </MenuItem>
        <MenuItem onClick={() => handleClose()}>
          <img src={auctionsLogo} alt="" />
          Auctions
        </MenuItem>
        <MenuItem onClick={() => handleClose()}>
          <img src={logoutLogo} alt="" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
export default MyAccountPopup;

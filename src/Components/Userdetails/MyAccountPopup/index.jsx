import React from "react";
import { Menu, MenuItem, Button, Badge } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import dashboardLogo from "../../../Assets/CommonImage/MyAccountMegamenu/menu.png";
import myOrderLogo from "../../../Assets/CommonImage/MyAccountMegamenu/shopping-bag.png";
import auctionsLogo from "../../../Assets/CommonImage/MyAccountMegamenu/auction.png";
import logoutLogo from "../../../Assets/CommonImage/MyAccountMegamenu/logout.png";
const MyAccountPopup = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.header_dropdown}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={1} className="badge_user">
          <AccountCircle />
        </Badge>
        <li className="User_account_Wishlist_cart">My Account</li>
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menulist_items}
      >
        <MenuItem>
          <img src={dashboardLogo} alt="" />
          Dashboard
        </MenuItem>
        <MenuItem>
          {" "}
          <img src={myOrderLogo} alt="" />
          My Orders
        </MenuItem>
        <MenuItem>
          {" "}
          <img src={auctionsLogo} alt="" />
          Auctions
        </MenuItem>
        <MenuItem>
          {" "}
          <img src={logoutLogo} alt="" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
export default withStyles(styles)(MyAccountPopup);

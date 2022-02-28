import React from "react";
import "./Userdetails.css";
import logo from "../../Assets/Homepage Assets/Group.png";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import MyAccountPopUP from "./MyAccountPopup";

import whishlist_image from '../../Assets/User/Icon.png'
import MiniCartDrawer from "../../Pages/MiniCart";
import { FormControlLabel } from '@mui/material/FormControlLabel';

export const Userdetails = () => {
  return (
    <div className="Userdetails">
      <div className="Logo">
        <Link to="/">
          <img className="Logo_img" src={logo} alt="" />
        </Link>
      </div>
      <div className="Userdetails_List">
        <ul className="Userdetails_List_Content">
          {/* <div className="User_Call">
            <li className="Call_us">
              {" "}
              Call Us
              <img className="Icon" src={ICon} alt="" /> +01234567890
            </li>
            <h6 className="User_Call_tag">From 8:00 to 17:00 (Mon-Sat)</h6>
          </div> */}
          <div className="User_Account">
            <MyAccountPopUP />
          </div>
          <div className="User_Wishlist">
            <Badge badgeContent={1} className="badge_user">
            <div className="whishlist_image">
            <img src={whishlist_image} alt="" />
          </div>
            </Badge>
            <li className="User_account_Wishlist_cart">My Wishlist</li>
          </div>
          <div className="User_cart">
            <MiniCartDrawer />
          </div>
        </ul>
      </div>
    </div>
  );
};

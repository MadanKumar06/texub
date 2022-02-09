import React from "react";
import "./Userdetails.css";
import logo from "../../Assets/Homepage Assets/Group.png";
import { Badge } from "@material-ui/core";
import myaccount from "../../Assets/Homepage Assets/Group 702.png";
import wishlist from "../../Assets/Homepage Assets/Group 703.png";
import cart from "../../Assets/Homepage Assets/Group 704.png";
import { Link } from "react-router-dom";

import { AccountCircle, FavoriteBorder, ShoppingBag } from "@material-ui/icons";

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
            {/* <img className="My_account_user" src={myaccount} alt="" /> */}
            <Badge badgeContent={1} className="badge_user">
              <AccountCircle />
            </Badge>
            <li className="User_account_Wishlist_cart">My Account</li>
          </div>
          <div className="User_Wishlist">
            {/* <img className="My_account" src={wishlist} alt="" /> */}
            <Badge badgeContent={1} className="badge_user">
              <FavoriteBorder />
            </Badge>
            <li className="User_account_Wishlist_cart">My Wishlist</li>
          </div>
          <div className="User_cart">
            {/* <img className="My_account" src={cart} alt="" /> */}
            <Badge badgeContent={1} className="badge_user">
              <ShoppingBag />
            </Badge>

            <li className="User_account_Wishlist_cart">My Cart</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

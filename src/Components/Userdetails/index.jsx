import React from "react";
import "./styles.scss";
import logo from "../../Assets/Homepage Assets/Group.png";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import MyAccountPopUP from "./MyAccountPopup";

import whishlist_image from "../../Assets/User/Icon.png";
import MiniCartDrawer from "../../Pages/MiniCart";

export const Userdetails = () => {
  let isSignedIn = JSON.parse(localStorage.getItem("userdata"));
  return (
    <div className="user_details_main_container">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="texub logo" />
        </Link>
      </div>
      <div className="user_details_list">
        <ul className="user_details_content">
          {/* <div className="User_Call">
            <li className="Call_us">
              {" "}
              Call Us
              <img className="Icon" src={ICon} alt="" /> +01234567890
            </li>
            <h6 className="User_Call_tag">From 8:00 to 17:00 (Mon-Sat)</h6>
          </div> */}
          {isSignedIn?.group_id === 5 ||
            (isSignedIn?.group_id === 6 &&
            isSignedIn?.custom_attributes?.[3]?.value === "2" ? (
              <div className="user_account">
                <MyAccountPopUP />
              </div>
            ) : (
              ""
            ))}

          {isSignedIn?.group_id === 5 &&
          isSignedIn?.custom_attributes?.[3]?.value === "2" ? (
            <>
              <div className="user_wishlist">
                <Badge badgeContent={0} className="badge_user">
                  <div className="whishlist_image">
                    <img src={whishlist_image} alt="" />
                  </div>
                </Badge>
                <li className="user_account_wishlist_cart">My Wishlist</li>
              </div>
              <div className="user_cart">
                <MiniCartDrawer />
              </div>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};

import React from "react";
import "./styles.scss";
import logo from "../../Assets/Homepage Assets/Group.png";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import MyAccountPopUP from "./MyAccountPopup";
import { useNavigate } from "react-router-dom";

import whishlist_image from "../../Assets/User/Icon.png";
import MiniCartDrawer from "../../Pages/MiniCart";
import { useStateValue } from "../../store/state";

export const Userdetails = () => {
  const [{geo}, dispatch] = useStateValue()
  let isSignedIn = JSON.parse(localStorage.getItem("userdata"));
  let kycStatus = JSON.parse(
    localStorage.getItem("userdata")
  )?.custom_attributes?.filter((itm) => itm?.attribute_code === "kyc_status");
  const history = useNavigate();
  const handleWishlist = () => {
    history("/buyerdashboard/wishlist");
  };


  return (
    <div className="user_details_main_container">
      <div className="logo">
        <Link to={`/:${geo?.country_name}`}>
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
          {(isSignedIn?.group_id === 5 && kycStatus?.[0]?.value === "2") ||
          (isSignedIn?.group_id === 6 && kycStatus?.[0]?.value === "2") ? (
            <div className="user_account">
              <MyAccountPopUP />
            </div>
          ) : (
            ""
          )}

          {isSignedIn?.group_id === 5 && kycStatus?.[0]?.value === "2" ? (
            <>
              <div className="user_wishlist" onClick={() => handleWishlist()}>
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

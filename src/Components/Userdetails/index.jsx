import React, {useState, useEffect} from "react";
import "./styles.scss";
import logo from "../../Assets/Homepage Assets/Group.png";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import MyAccountPopUP from "./MyAccountPopup";
import { useNavigate } from "react-router-dom";

import whishlist_image from "../../Assets/User/Icon.png";
import MiniCartDrawer from "../../Pages/MiniCart";
import { useStateValue } from "../../store/state";
import notification from "../../Assets/sellerdashboard/notification.png";
import dashboardLogo from "../../Assets/CommonImage/MyAccountMegamenu/menu.png";

export const Userdetails = () => {
  const [{ geo, wishListData, customnostore }, dispatch] = useStateValue();
  let isSignedIn = JSON.parse(localStorage.getItem("userdata"));
  let kycStatus = JSON.parse(
    localStorage.getItem("userdata")
  )?.custom_attributes?.filter((itm) => itm?.attribute_code === "kyc_status");
  const history = useNavigate();
  const handleWishlist = () => {
    history(
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/wishlist`
    );
  };

  const [wishlength, setwishlength] = useState(0)
  useEffect(() => {
    let temp = []
    wishListData?.filter(wld => temp.push(wld?.wishlist_data?.length))
    console.log(temp)
    let templength = temp.reduce((initial, final) => initial + final, 0)
    setwishlength(templength)
  }, [wishListData])

  const handleDashboard = () => {
    history(
      `/${
        customnostore ? customnostore : geo?.country_name
      }/sellerdashboard/dashboard`
    );
  };
  return (
    <div className="user_details_main_container">
      <div className="logo">
        <Link to={`/${customnostore ? customnostore : geo?.country_name}`}>
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
            <>
              <div className="user_account">
                <MyAccountPopUP />
              </div>
              <div className="user_notification">
                <Badge showZero={true} badgeContent={0} className="badge_user">
                  <div className="notification_image">
                    <img src={notification} alt="" />
                  </div>
                </Badge>
                <li className="user_account_notification">Notification</li>
              </div>
            </>
          ) : (
            ""
          )}

          {isSignedIn?.group_id === 6 && kycStatus?.[0]?.value === "2" ? (
            <>
              <div
                className="user_notification"
                onClick={() => handleDashboard()}
              >
                <Badge badgeContent={0} className="badge_user">
                  <div className="notification_image">
                    <img src={dashboardLogo} alt="" />
                  </div>
                </Badge>
                <li className="user_account_notification">Dashboard</li>
              </div>
            </>
          ) : (
            ""
          )}
          {isSignedIn?.group_id === 5 && kycStatus?.[0]?.value === "2" ? (
            <>
              <div className="user_wishlist" onClick={() => handleWishlist()}>
                <Badge
                  showZero={true}
                  // badgeContent={wishListData?.length ? wishListData?.length : 0}
                  badgeContent={wishlength}
                  className="badge_user"
                >
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

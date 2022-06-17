import React, {useEffect} from "react";
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
  const [{ geo, customstore, customnostore, userDataDetails }, dispatch] = useStateValue();
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
  const gotoBuyerMyorder = () => {
    return window.localStorage.setItem("buyerclearViewOrder", true);
  };
  let permissions = JSON.parse(localStorage.getItem("permissions"));

  let placeorder =
    permissions?.length === 0
      ? false
      : permissions?.some(
          (per) =>
            per?.value === "can-place-order" && per?.permission_value === 0
        );
  let PendingInvoice =
    permissions?.length === 0
      ? false
      : permissions?.some(
          (per) =>
            per?.value === "can-add-to-pending-invoice" &&
            per?.permission_value === 0
        );
  return (
    <div className="myAccount_popup_header_dropdown">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        disableRipple
      >
        <div className="account_circle_image">
          <img src={account_circle} alt="" />
        </div>
        <li className="user_account">
          <span className="user_code">{userCode?.[0]?.value}</span>
          <span className="user_name">
            {userDataDetails?.firstname} {userDataDetails?.lastname}
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
            <Link
              className="sub_menu_list_items"
              to={`/${
                customnostore ? customnostore : geo?.country_name
              }/buyerdashboard/dashboard`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                viewBox="0 0 31 31"
              >
                <g
                  id="Group_1493"
                  data-name="Group 1493"
                  transform="translate(-75 -463)"
                >
                  <g
                    id="Rectangle_1690"
                    data-name="Rectangle 1690"
                    transform="translate(75 463)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1"
                  >
                    <rect width="14" height="10" rx="2" stroke="none" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="13"
                      height="9"
                      rx="1.5"
                      fill="none"
                    />
                  </g>
                  <g
                    id="Rectangle_1692"
                    data-name="Rectangle 1692"
                    transform="translate(75 476)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1"
                  >
                    <rect width="14" height="18" rx="2" stroke="none" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="13"
                      height="17"
                      rx="1.5"
                      fill="none"
                    />
                  </g>
                  <g
                    id="Rectangle_1691"
                    data-name="Rectangle 1691"
                    transform="translate(92 463)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1"
                  >
                    <rect width="14" height="18" rx="2" stroke="none" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="13"
                      height="17"
                      rx="1.5"
                      fill="none"
                    />
                  </g>
                  <g
                    id="Rectangle_1693"
                    data-name="Rectangle 1693"
                    transform="translate(92 484)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1"
                  >
                    <rect width="14" height="10" rx="2" stroke="none" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="13"
                      height="9"
                      rx="1.5"
                      fill="none"
                    />
                  </g>
                </g>
              </svg>
              Dashboard
            </Link>
          </MenuItem>
        )}
        {isSignedIn?.group_id === 6 && (
          <MenuItem onClick={() => handleClose()}>
            <Link
              className="sub_menu_list_items"
              to={`/${
                customnostore ? customnostore : geo?.country_name
              }/sellerdashboard/dashboard`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                viewBox="0 0 31 31"
              >
                <g
                  id="Group_1493"
                  data-name="Group 1493"
                  transform="translate(-75 -463)"
                >
                  <g
                    id="Rectangle_1690"
                    data-name="Rectangle 1690"
                    transform="translate(75 463)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1"
                  >
                    <rect width="14" height="10" rx="2" stroke="none" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="13"
                      height="9"
                      rx="1.5"
                      fill="none"
                    />
                  </g>
                  <g
                    id="Rectangle_1692"
                    data-name="Rectangle 1692"
                    transform="translate(75 476)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1"
                  >
                    <rect width="14" height="18" rx="2" stroke="none" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="13"
                      height="17"
                      rx="1.5"
                      fill="none"
                    />
                  </g>
                  <g
                    id="Rectangle_1691"
                    data-name="Rectangle 1691"
                    transform="translate(92 463)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1"
                  >
                    <rect width="14" height="18" rx="2" stroke="none" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="13"
                      height="17"
                      rx="1.5"
                      fill="none"
                    />
                  </g>
                  <g
                    id="Rectangle_1693"
                    data-name="Rectangle 1693"
                    transform="translate(92 484)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1"
                  >
                    <rect width="14" height="10" rx="2" stroke="none" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="13"
                      height="9"
                      rx="1.5"
                      fill="none"
                    />
                  </g>
                </g>
              </svg>
              Seller Dashboard
            </Link>
          </MenuItem>
        )}
          {isSignedIn?.group_id === 6 && (
          <MenuItem onClick={() => handleClose()}>
            <Link
              className="sub_menu_list_items"
              to={`/${
                customnostore ? customnostore : geo?.country_name
              }/sellerdashboard/inventory`}
            >
             <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="33.121"
            viewBox="0 0 34 33.121"
          >
            <g
              id="Group_1487"
              data-name="Group 1487"
              transform="translate(-3926.949 -459.964)"
            >
              <g
                id="Group_1486"
                data-name="Group 1486"
                transform="translate(0.305 -44.462)"
              >
                <rect
                  id="Rectangle_1713"
                  data-name="Rectangle 1713"
                  width="10"
                  height="8"
                  transform="translate(3933.644 529.048)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                />
                <rect
                  id="Rectangle_1714"
                  data-name="Rectangle 1714"
                  width="10"
                  height="8"
                  transform="translate(3943.644 529.048)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                />
                <path
                  id="Path_1744"
                  data-name="Path 1744"
                  d="M4115,557.237v-2.789h0c-.065-1.8,0-8.39,0-8.39h10.155v11.179"
                  transform="translate(-176.356 -25.952)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                />
                <line
                  id="Line_31"
                  data-name="Line 31"
                  y1="2"
                  transform="translate(3943.5 520.5)"
                  fill="none"
                  stroke="#000"
                  strokeLinecap="round"
                  strokeWidth="1"
                />
              </g>
              <path
                id="Rectangle_445"
                data-name="Rectangle 445"
                d="M33.5,13.062V32A1.5,1.5,0,0,1,32,33.5H2A1.5,1.5,0,0,1,.5,32V13.062a1.5,1.5,0,0,1,.66-1.242l15-10.147a1.5,1.5,0,0,1,1.681,0l15,10.147A1.5,1.5,0,0,1,33.5,13.062Z"
                transform="translate(3926.949 459.085)"
                fill="none"
                stroke="#000"
                strokeWidth="1"
              />
            </g>
           </svg>
              Inventory
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={() => handleClose()}>
          <Link
            className="sub_menu_list_items"
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/kycdetails`}
          >
            <svg
              width="31"
              height="27"
              viewBox="0 0 31 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 18C8.79565 18 9.55871 17.6839 10.1213 17.1213C10.6839 16.5587 11 15.7956 11 15C11 14.2044 10.6839 13.4413 10.1213 12.8787C9.55871 12.3161 8.79565 12 8 12C7.20435 12 6.44129 12.3161 5.87868 12.8787C5.31607 13.4413 5 14.2044 5 15C5 15.7956 5.31607 16.5587 5.87868 17.1213C6.44129 17.6839 7.20435 18 8 18ZM10 15C10 15.5304 9.78929 16.0391 9.41421 16.4142C9.03914 16.7893 8.53043 17 8 17C7.46957 17 6.96086 16.7893 6.58579 16.4142C6.21071 16.0391 6 15.5304 6 15C6 14.4696 6.21071 13.9609 6.58579 13.5858C6.96086 13.2107 7.46957 13 8 13C8.53043 13 9.03914 13.2107 9.41421 13.5858C9.78929 13.9609 10 14.4696 10 15ZM14 22C14 23 13 23 13 23H3C3 23 2 23 2 22C2 21 3 18 8 18C13 18 14 21 14 22ZM13 21.996C12.999 21.75 12.846 21.01 12.168 20.332C11.516 19.68 10.289 19 8 19C5.71 19 4.484 19.68 3.832 20.332C3.154 21.01 3.002 21.75 3 21.996H13Z"
                fill="black"
              />
              <path
                d="M27.7958 5.87136C27.8413 5.8228 27.8778 5.76485 27.903 5.7008C27.9282 5.63676 27.9417 5.56787 27.9427 5.49809C27.9437 5.4283 27.9322 5.35898 27.9089 5.29407C27.8856 5.22917 27.8508 5.16996 27.8067 5.11982C27.7626 5.06969 27.7099 5.02961 27.6517 5.00187C27.5935 4.97413 27.5309 4.95927 27.4675 4.95816C27.4041 4.95704 27.3411 4.96968 27.2821 4.99535C27.2231 5.02102 27.1693 5.05923 27.1238 5.10778L22.461 10.0732L21.0256 8.63809C20.9302 8.5481 20.8067 8.50258 20.6813 8.5112C20.5558 8.51983 20.4384 8.58191 20.354 8.68427C20.2695 8.78663 20.2246 8.9212 20.2289 9.05939C20.2331 9.19758 20.2862 9.3285 20.3767 9.42433L22.1469 11.1952C22.2376 11.286 22.3564 11.3353 22.4791 11.3332C22.6018 11.3311 22.7191 11.2777 22.8073 11.1838L27.7958 5.87136V5.87136ZM24.365 0.102029C24.2815 0.0350063 24.1806 -0.000753029 24.0772 1.20249e-05C23.9739 0.000777079 23.8735 0.0380262 23.7908 0.106279C22.927 0.818857 21.8746 1.33027 20.8621 1.69223C19.7548 2.0816 18.6143 2.34529 17.4583 2.47918L17.4461 2.48059H17.4441C17.323 2.49129 17.21 2.55185 17.1277 2.65019C17.0454 2.74854 16.9998 2.87742 17 3.01113V7.61456C17 11.2221 19.2374 15.3141 23.9324 16.9744C24.0287 17.0085 24.1322 17.0085 24.2285 16.9744C28.9319 15.3105 31 11.2122 31 7.79164V3.01042C31 2.87741 30.9546 2.74925 30.8728 2.65128C30.7911 2.55331 30.6789 2.49265 30.5584 2.4813H30.5572L30.5507 2.48059L30.5217 2.47705C30.496 2.47422 30.4567 2.46997 30.4046 2.46289C30.3016 2.45014 30.1491 2.42889 29.9572 2.39701C29.4372 2.30917 28.9213 2.19429 28.4111 2.05276C27.1611 1.70568 25.6195 1.10715 24.3643 0.102029H24.365ZM17.9655 7.61456V3.48571C19.0496 3.33179 20.1186 3.06957 21.1594 2.7023C22.1269 2.35735 23.169 1.86931 24.0837 1.18152C25.4187 2.1661 26.9583 2.74551 28.1749 3.08267C28.7878 3.25263 29.4086 3.38622 30.0345 3.48288V7.79164C30.0345 10.7121 28.2817 14.3543 24.0805 15.9091C19.8669 14.3508 17.9655 10.7007 17.9655 7.61456V7.61456Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 7H2C0.895431 7 0 7.89543 0 9V25C0 26.1046 0.895431 27 2 27H25C26.1046 27 27 26.1046 27 25V18H26V25C26 25.5523 25.5523 26 25 26H2C1.44772 26 1 25.5523 1 25V9C1 8.44772 1.44772 8 2 8H16V7Z"
                fill="black"
              />
              <line
                x1="16.5"
                y1="19.5"
                x2="20.5"
                y2="19.5"
                stroke="black"
                strokeLinecap="round"
              />
              <line
                x1="16.5"
                y1="22.5"
                x2="23.5"
                y2="22.5"
                stroke="black"
                strokeLinecap="round"
              />
            </svg>
            KYC Details
          </Link>
        </MenuItem>
        {isSignedIn?.group_id === 5 ? (
          <>
            {!placeorder && (
              <MenuItem
                onClick={() => {
                  handleClose();
                  gotoBuyerMyorder();
                }}
              >
                <Link
                  className="sub_menu_list_items"
                  to={`/${
                    customnostore ? customnostore : geo?.country_name
                  }/buyerdashboard/myorder`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="33.582"
                    viewBox="0 0 26 33.582"
                  >
                    {" "}
                    <g
                      id="Group_1494"
                      data-name="Group 1494"
                      transform="translate(-89 -600.418)"
                    >
                      {" "}
                      <g
                        id="Path_1771"
                        data-name="Path 1771"
                        transform="translate(89 607)"
                        fill="none"
                      >
                        {" "}
                        <path
                          d="M3,0H23a2,2,0,0,1,2,2l1,19a6,6,0,0,1-6,6H6a6,6,0,0,1-6-6L1,2A2,2,0,0,1,3,0Z"
                          stroke="none"
                        />{" "}
                        <path
                          d="M 3 1 C 2.448600769042969 1 2 1.448600769042969 2 2 L 1.998619079589844 2.052560806274414 L 1.000062942504883 21.02515029907227 C 1.013694763183594 23.77060317993164 3.25140380859375 26 6 26 L 20 26 C 22.74859619140625 26 24.98630523681641 23.77060317993164 24.99993705749512 21.02515029907227 L 24 2 C 24 1.448600769042969 23.55139923095703 1 23 1 L 3 1 M 3 0 L 23 0 C 24.10457038879395 0 25 0.8954296112060547 25 2 L 26 21 C 26 24.3137092590332 23.3137092590332 27 20 27 L 6 27 C 2.686290740966797 27 0 24.3137092590332 0 21 L 1 2 C 1 0.8954296112060547 1.895429611206055 0 3 0 Z"
                          stroke="none"
                          fill="#000"
                        />{" "}
                      </g>{" "}
                      <path
                        id="Path_1772"
                        data-name="Path 1772"
                        d="M1916.989,571.545l2.64,2.866,5.355-5.355"
                        transform="translate(-1819.107 48.634)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                      />{" "}
                      <path
                        id="Subtract"
                        d="M11.192,12V6.921c0-3.313-2.327-6-5.2-6S.8,3.608.8,6.921V12H0V6.921C0,3.1,2.684,0,6,0s6,3.1,6,6.921V12Z"
                        transform="translate(96.072 600.418)"
                        fillRule="evenodd"
                      />{" "}
                    </g>{" "}
                  </svg>
                  My Orders
                </Link>
              </MenuItem>
            )}
            {/* <MenuItem onClick={() => handleClose()}>
            <Link   className="sub_menu_list_items" to={`/${customnostore ? customnostore : geo?.country_name}/buyerdashboard/auctions`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35.467" height="32.107" viewBox="0 0 35.467 32.107">
                  <g id="Group_1456" data-name="Group 1456" transform="translate(-1801 -670.893)">
                    <g id="Group_1449" data-name="Group 1449" transform="translate(-43 24)">
                      <g id="Rectangle_1682" data-name="Rectangle 1682" transform="translate(1845 672)" fill="none" stroke="#000" strokeWidth="1">
                        <path d="M4,0h7a4,4,0,0,1,4,4V4a0,0,0,0,1,0,0H0A0,0,0,0,1,0,4V4A4,4,0,0,1,4,0Z" stroke="none"/>
                        <path d="M3.5.5h8a3,3,0,0,1,3,3v0a0,0,0,0,1,0,0H.5a0,0,0,0,1,0,0v0A3,3,0,0,1,3.5.5Z" fill="none"/>
                      </g>
                      <g id="Rectangle_1683" data-name="Rectangle 1683" transform="translate(1844 675)" fill="none" stroke="#000" strokeWidth="1">
                        <path d="M2,0H15a2,2,0,0,1,2,2V4a0,0,0,0,1,0,0H0A0,0,0,0,1,0,4V2A2,2,0,0,1,2,0Z" stroke="none"/>
                        <path d="M2,.5H15A1.5,1.5,0,0,1,16.5,2V3.5a0,0,0,0,1,0,0H.5a0,0,0,0,1,0,0V2A1.5,1.5,0,0,1,2,.5Z" fill="none"/>
                      </g>
                    </g>
                    <line id="Line_1" data-name="Line 1" x1="2" y2="2" transform="translate(1803.5 691.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1"/>
                    <line id="Line_2" data-name="Line 2" x1="2" y1="2" transform="translate(1803.5 683.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1"/>
                    <line id="Line_3" data-name="Line 3" x1="4" transform="translate(1801.5 688.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1"/>
                    <g id="Rectangle_1684" data-name="Rectangle 1684" transform="translate(1811.282 682.828) rotate(-45)" fill="none" stroke="#000" strokeWidth="1">
                      <rect width="11" height="8" stroke="none"/>
                      <rect x="0.5" y="0.5" width="10" height="7" fill="none"/>
                    </g>
                    <g id="Rectangle_1685" data-name="Rectangle 1685" transform="translate(1807.05 684.429) rotate(-45)" fill="none" stroke="#000" strokeWidth="1">
                      <rect width="5" height="11.912" rx="2.5" stroke="none"/>
                      <rect x="0.5" y="0.5" width="4" height="10.912" rx="2" fill="none"/>
                    </g>
                    <g id="Rectangle_1686" data-name="Rectangle 1686" transform="translate(1817.05 674.429) rotate(-45)" fill="none" stroke="#000" strokeWidth="1">
                      <rect width="5" height="11.912" rx="2.5" stroke="none"/>
                      <rect x="0.5" y="0.5" width="4" height="10.912" rx="2" fill="none"/>
                    </g>
                    <rect id="Rectangle_1687" data-name="Rectangle 1687" width="4" height="1" rx="0.5" transform="matrix(0.695, -0.719, 0.719, 0.695, 1816.891, 679.504)"/>
                    <circle id="Ellipse_102" data-name="Ellipse 102" cx="0.5" cy="0.5" r="0.5" transform="translate(1816 680)"/>
                    <g id="Rectangle_1688" data-name="Rectangle 1688" transform="matrix(0.719, -0.695, 0.695, 0.719, 1817.623, 686.303)" fill="none" stroke="#000" strokeWidth="1">
                      <rect width="7" height="4" rx="2" stroke="none"/>
                      <rect x="0.5" y="0.5" width="6" height="3" rx="1.5" fill="none"/>
                    </g>
                    <g id="Path_1679" data-name="Path 1679" transform="matrix(0.719, -0.695, 0.695, 0.719, 1819.623, 688.623)" fill="none">
                      <path d="M3.5,0C5.433,0,6.1-.309,6.1,1.624L7,13.5a3.5,3.5,0,0,1-7,0L1.266,1.951C1.266.018,1.567,0,3.5,0Z" stroke="none"/>
                      <path d="M 4.690639972686768 0.9818229675292969 C 4.552789688110352 0.9818229675292969 4.392859935760498 0.9855222702026367 4.223549842834473 0.9894323348999023 C 4.009380340576172 0.9943923950195312 3.766639947891235 1.000002861022949 3.5 1.000002861022949 C 3.071963310241699 1.000002861022949 2.553483009338379 1.000004768371582 2.318933010101318 1.042501449584961 C 2.29411792755127 1.161250114440918 2.265500068664551 1.414519309997559 2.265500068664551 1.950852394104004 L 2.265500068664551 2.005473136901855 L 1.000495433807373 13.5501012802124 C 1.027281761169434 14.9055643081665 2.138243198394775 16.00000190734863 3.5 16.00000190734863 C 4.866888999938965 16.00000190734863 5.981087684631348 14.89737606048584 5.999760150909424 13.53484058380127 L 5.096560001373291 1.661703109741211 L 5.096560001373291 1.623723030090332 C 5.096560001373291 1.283353805541992 5.072463512420654 1.095126152038574 5.052077770233154 0.9967937469482422 C 4.983100414276123 0.9889383316040039 4.870862007141113 0.9818229675292969 4.690639972686768 0.9818229675292969 M 4.690637111663818 -0.0181732177734375 C 5.715892791748047 -0.0181732177734375 6.096560001373291 0.1592254638671875 6.096560001373291 1.623723030090332 L 7 13.50000286102295 C 7 15.43299293518066 5.433000087738037 17.00000190734863 3.5 17.00000190734863 C 1.566999912261963 17.00000190734863 0 15.43299293518066 0 13.50000286102295 L 1.265500068664551 1.950852394104004 C 1.265500068664551 0.017852783203125 1.566999912261963 1.9073486328125e-06 3.5 1.9073486328125e-06 C 3.968502283096313 1.9073486328125e-06 4.362650871276855 -0.0181732177734375 4.690637111663818 -0.0181732177734375 Z" stroke="none" fill="#000"/>
                    </g>
                  </g>
                </svg>
              Auctions
              </Link>
            </MenuItem> */}
            {!PendingInvoice ? (
              <MenuItem onClick={() => handleClose()}>
                <Link
                  className="sub_menu_list_items"
                  to={`/${
                    customnostore ? customnostore : geo?.country_name
                  }/buyerdashboard/invoiceslist`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35.333"
                    height="32.333"
                    viewBox="0 0 35.333 32.333"
                  >
                    <g id="_3" data-name="3" transform="translate(0 -5.667)">
                      <path
                        id="Path_1689"
                        data-name="Path 1689"
                        d="M27.811,7.871H7.9V33.129H25.1a2.665,2.665,0,0,0,2.714-2.613ZM7,7V34H25.1a3.554,3.554,0,0,0,3.619-3.484V7Z"
                        transform="translate(-2 4)"
                        fillRule="evenodd"
                      />
                      <path
                        id="Path_1690"
                        data-name="Path 1690"
                        d="M21.591,31H0v4a3,3,0,0,0,3,3H24.591a3,3,0,0,1-3-3Z"
                        fill="#c4c4c4"
                        fillRule="evenodd"
                      />
                      <path
                        id="Path_1691"
                        data-name="Path 1691"
                        d="M22.355,37a2.989,2.989,0,0,1-.764-2V31H0v4a3,3,0,0,0,3,3H24.591A2.993,2.993,0,0,1,22.355,37Zm-1.229,0a3.982,3.982,0,0,1-.535-2V32H1v3a2,2,0,0,0,2,2Z"
                        fillRule="evenodd"
                      />
                      <line
                        id="Line_29"
                        data-name="Line 29"
                        x2="8"
                        transform="translate(14.438 22.225)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeWidth="1"
                      />
                      <line
                        id="Line_30"
                        data-name="Line 30"
                        x2="8"
                        transform="translate(14.438 17.225)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeWidth="1"
                      />
                      <path
                        id="Path_1696"
                        data-name="Path 1696"
                        d="M14.334,25.667A1.667,1.667,0,1,1,12.667,24,1.667,1.667,0,0,1,14.334,25.667Zm-1.667.833a.833.833,0,1,0-.833-.833A.833.833,0,0,0,12.667,26.5Z"
                        transform="translate(-1.334 1.166)"
                        fillRule="evenodd"
                      />
                      <path
                        id="Path_1757"
                        data-name="Path 1757"
                        d="M14.334,25.667A1.667,1.667,0,1,1,12.667,24,1.667,1.667,0,0,1,14.334,25.667Zm-1.667.833a.833.833,0,1,0-.833-.833A.833.833,0,0,0,12.667,26.5Z"
                        transform="translate(-1.334 -3.441)"
                        fillRule="evenodd"
                      />
                      <path
                        id="Path_1758"
                        data-name="Path 1758"
                        d="M14.334,25.667A1.667,1.667,0,1,1,12.667,24,1.667,1.667,0,0,1,14.334,25.667Zm-1.667.833a.833.833,0,1,0-.833-.833A.833.833,0,0,0,12.667,26.5Z"
                        transform="translate(-1.334 -8.441)"
                        fillRule="evenodd"
                      />
                      <path
                        id="Path_1692"
                        data-name="Path 1692"
                        d="M38.333,8.666A8.666,8.666,0,1,1,29.666,0,8.666,8.666,0,0,1,38.333,8.666Z"
                        transform="translate(-3 5.667)"
                        fill="#c4c4c4"
                      />
                      <path
                        id="Path_1693"
                        data-name="Path 1693"
                        d="M29.666,16.466a7.8,7.8,0,1,0-7.8-7.8A7.8,7.8,0,0,0,29.666,16.466Zm0,.867A8.666,8.666,0,1,0,21,8.666,8.666,8.666,0,0,0,29.666,17.333Z"
                        transform="translate(-3 5.667)"
                        fillRule="evenodd"
                      />
                      <path
                        id="Path_1700"
                        data-name="Path 1700"
                        d="M34.639,14.113c0-1.88-1.123-2.42-2.337-2.723l-.644-.154c-.952-.221-1.025-.547-1.025-.983,0-.566.432-.9,1.156-.9a1.055,1.055,0,0,1,1.168.89l.009.032a.7.7,0,0,0,.671.532.893.893,0,0,0,.208-.028.767.767,0,0,0,.569-.768.9.9,0,0,0-.043-.274,2.46,2.46,0,0,0-1.994-1.914V6.7a.623.623,0,1,0-1.237,0V7.825a2.342,2.342,0,0,0-1.968,2.427,2.4,2.4,0,0,0,2.136,2.6l.7.175c.992.238,1.166.543,1.166,1.1,0,.676-.484,1.079-1.3,1.079a1.254,1.254,0,0,1-1.412-1.188.7.7,0,0,0-.679-.572.941.941,0,0,0-.2.025l-.021,0a.8.8,0,0,0-.567.785.991.991,0,0,0,.019.18l.011.056A2.63,2.63,0,0,0,31.2,16.729V17.9a.625.625,0,1,0,1.237,0V16.75a2.516,2.516,0,0,0,2.2-2.637"
                        transform="translate(-5.105 2.028)"
                      />
                      <line
                        id="Line_28"
                        data-name="Line 28"
                        x2="8"
                        transform="translate(14.438 27.225)"
                        fill="none"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeWidth="1"
                      />
                    </g>
                  </svg>
                  Pending Invoices
                </Link>
              </MenuItem>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        <MenuItem className="sub_menu_list_items" onClick={() => SignOut()}>
          <svg
            width="35.467"
            height="31.107"
            viewBox="0 0 158 152"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 5H72.1201C80.4101 5 87.1201 11.7157 87.1201 20V45.4848H92.1201V20C92.1201 8.9543 83.1701 0 72.1201 0H20C8.95 0 0 8.9543 0 20V132C0 143.046 8.95 152 20 152H72.1201C83.1701 152 92.1201 143.046 92.1201 132V106.515H87.1201V132C87.1201 140.284 80.4101 147 72.1201 147H20C11.72 147 5 140.284 5 132V20C5 11.7157 11.72 5 20 5Z"
              fill="black"
            />
            <path
              d="M156.65 77.7678C157.62 76.7915 157.62 75.2085 156.65 74.2322L140.74 58.3223C139.76 57.346 138.18 57.346 137.2 58.3223C136.22 59.2986 136.22 60.8816 137.2 61.8579L151.34 76L137.2 90.142C136.22 91.118 136.22 92.701 137.2 93.678C138.18 94.654 139.76 94.654 140.74 93.678L156.65 77.7678ZM56.4199 78.5H154.88V73.5H56.4199V78.5Z"
              fill="black"
            />
          </svg>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
export default MyAccountPopup;

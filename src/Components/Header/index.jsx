import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./styles";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import CurrencyPopup from "./CurrencyPopup";
import MenuList from "./MenuList";
import { useStateValue } from "../../store/state";

import logo from "../../Assets/Homepage Assets/Group.png";
import swal from "sweetalert2";
import axios from "axios";
import Constant from "../../Constant";
import { SessionExpiredLogout } from "../../utilities";

const Header = ({ classes }) => {
  const [{ currency, gt, geo, customnostore, generalTrigger }, dispatch] =
    useStateValue();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropDownValues, setdropDownValues] = useState({
    hub: 0,
    conditions: 0,
    eta: 0,
  });
  useEffect(() => {
    const getCurrentURL = window.location.href;
    const getlastSegmentOfUrl = getCurrentURL.substring(
      getCurrentURL.lastIndexOf("/") + 1
    );
    if (getlastSegmentOfUrl !== "products") {
      window.localStorage.setItem(
        "filterProductsDropdown",
        JSON.stringify(dropDownValues)
      );
    }
    if (!getCurrentURL.includes("sellerprofile")) {
      window.localStorage.setItem(
        "filterProductsDropdown_seller_profile",
        JSON.stringify(dropDownValues)
      );
    }
  }, [location]);

  let isSignedIn = JSON.parse(localStorage.getItem("userdata"));

  const user = JSON.parse(localStorage.getItem("userdata"));
  useEffect(async () => {
    if (
      localStorage.getItem("token") &&
      user?.group_id === 5 &&
      currency?.currency_id
    ) {
      dispatch({
        type: "SET_IS_SIMPLE_LOADING",
        value: true,
      });
      try {
        const cartdata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/cartList`,
          data: {
            data: {
              customer_id: user?.id,
              currency_id: currency?.currency_id,
            },
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch({
          type: "CART__DATA",
          data: cartdata?.data,
        });
        dispatch({
          type: "SET_IS_SIMPLE_LOADING",
          value: false,
        });
      } catch (e) {
        if (e.response.status === 401) {
          SessionExpiredLogout();
        }
        dispatch({
          type: "SET_IS_SIMPLE_LOADING",
          value: false,
        });
      }
    }
  }, [currency, gt, localStorage.getItem("userdata")]);

  useEffect(() => {
    if (user?.group_id === 5 && currency?.currency_id) {
      async function fetchData() {
        try {
          const wishlistdata = await axios({
            method: "post",
            url: `${Constant.baseUrl()}/getwishlist`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: {
              requestParams: {
                customer_id: user?.id,
                currency_id: currency?.currency_id,
              },
            },
          });
          dispatch({
            type: "WHISHLIST_DATA",
            data: wishlistdata?.data,
          });
        } catch (e) {
          if (e.response.status === 401) {
            SessionExpiredLogout();
          }
        }
      }
      fetchData();
    }
  }, [currency, generalTrigger, localStorage.getItem("userdata")]);
  const SigninPopUP = () => {
    dispatch({
      type: "SET_SIGNIN_OPEN_CLOSE",
      value: true,
    });
  };

  const RegistrationPop = () => {
    dispatch({
      type: "SET_REGISTER_OPEN_CLOSE",
      value: true,
    });
  };
  const SignOut = () => {
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
            navigate("/");
            window.location.reload();
          }, 1000);
        }
      });
  };
  return (
    <div className={classes.header_main} id="Header-header_main-2">
      <AppBar position="static">
        <Toolbar className={classes.header_toolbar}>
          <MenuList />
          <div className={classes.company_logo}>
            {/* //height="48px" width="140px" */}
            <Link to={`/${customnostore ? customnostore : geo?.country_name}`}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className={classes.title_main}>
            <Typography variant="h6" className={classes.title}>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/aboutus`}
                className={classes.middle}
              >
                About Us
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/products`}
              >
                Products
              </Link>
              <span>New</span>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/sell-on-texub`}
              >
                {" "}
                Sell On TEXUB{" "}
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/buy-on-texub`}
              >
                {" "}
                Buy On TEXUB{" "}
              </Link>
            </Typography>
            {/* <Typography variant="h6" className={classes.title}>
              <Link to={`/${customnostore ? customnostore : geo?.country_name}/Faqs`}> FAQ</Link>
            </Typography> */}
            <Typography variant="h6" className={classes.title}>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/Contactus`}
              >
                {" "}
                Contact Us{" "}
              </Link>
            </Typography>
          </div>

          {
            !isSignedIn?.group_id ? (
              <div className={classes.header_button_main}>
                <Button
                  className={classes.header_button_register}
                  onClick={() => RegistrationPop()}
                >
                  Register
                </Button>
                <Button
                  className={classes.header_button_signin}
                  onClick={() => SigninPopUP()}
                >
                  Sign In
                </Button>
              </div>
            ) : (
              // isSignedIn?.group_id === 1 ? (
              <div className={classes.header_button_main}>
                <Button
                  className={classes.header_button_signin}
                  onClick={() => SignOut()}
                >
                  Sign Out
                </Button>
              </div>
            )
            // ) : (
            //   ""
            // )
          }
          <CurrencyPopup />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Header);

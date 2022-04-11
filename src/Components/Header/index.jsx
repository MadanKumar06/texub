import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const Header = ({ classes }) => {
  const [{ currency, cart, gt }, dispatch] = useStateValue();
  let isSignedIn = JSON.parse(localStorage.getItem("userdata"));

  useEffect(async () => {
    debugger
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (localStorage.getItem("token")) {
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
        console.log(cartdata?.data)
        dispatch({
          type: "CART__DATA",
          data: cartdata?.data,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [currency, gt]);

  console.log(gt)

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
            window.location.reload();
            window.location.href = "/";
          }, 1000);
        }
      });
  };
  return (
    <div className={classes.header_main}>
      <AppBar position="static">
        <Toolbar className={classes.header_toolbar}>
          <MenuList />
          <div className={classes.company_logo}>
            {/* //height="48px" width="140px" */}
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className={classes.title_main}>
            <Typography variant="h6" className={classes.title}>
              <Link to="/aboutus">About Us</Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/Products">Products</Link>
              <span>New</span>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/coming-soon"> Sell On TEXUB </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/coming-soon"> Buy On TEXUB </Link>
            </Typography>
            {/* <Typography variant="h6" className={classes.title}>
              <Link to="/Faqs"> FAQ</Link>
            </Typography> */}
            <Typography variant="h6" className={classes.title}>
              <Link to="/Contactus"> Contact Us </Link>
            </Typography>
          </div>

          {!isSignedIn?.group_id ? (
            <div className={classes.header_button_main}>
              <Button
                className={classes.header_button_register}
                onClick={() => RegistrationPop()}
              >
                {/* <Link to="/register"> Register </Link> */}
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
            <div className={classes.header_button_main}>
              <Button
                className={classes.header_button_signin}
                onClick={() => SignOut()}
              >
                Sign Out
              </Button>
            </div>
          )}
          <CurrencyPopup />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Header);

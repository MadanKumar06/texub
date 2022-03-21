import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import CurrencyPopup from "./CurrencyPopup";
import MenuList from "./MenuList";
import { useStateValue } from "../../store/state";

import logo from "../../Assets/Homepage Assets/Group.png";

const Header = ({ classes }) => {
  const [{}, dispatch] = useStateValue();

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
            <Typography variant="h6" className={classes.title}>
              <Link to="/Faqs"> FAQ</Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/Contactus"> Contact Us </Link>
            </Typography>
          </div>
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
          <CurrencyPopup />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Header);

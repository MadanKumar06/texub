import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignIn } from "../SignIn/SignIn";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import CurrencyPopup from "./CurrencyPopup";
import MenuList from "./MenuList";
import logo from "../../Assets/Homepage Assets/Group.png";
import RegiterPopup from "../../Pages/Register/RegisterPopup/SectionLeft";

const Header = ({ classes }) => {
  const [isSignin, setisSignin] = useState(false);
  const [registerPopUp, setRegisterPopUp] = useState(false);
  const Signin = () => {
    setisSignin(!isSignin);
  };
  const RegistrationPop = (event) => {
    setRegisterPopUp(event);
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
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/Sellontexhub"> Sell On TEXUB </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/Buyontexhub"> Buy On TEXUB </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/"> FAQ</Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link to="/Contactus"> Contact Us </Link>
            </Typography>
          </div>
          <div className={classes.header_button_main}>
            <Button
              className={classes.header_button_register}
              onClick={() => setRegisterPopUp(true)}
            >
              {/* <Link to="/register"> Register </Link> */}
              Register
            </Button>
            <Button
              className={classes.header_button_signin}
              onClick={() => Signin()}
            >
              Sign In
            </Button>
          </div>
          <CurrencyPopup />
        </Toolbar>
      </AppBar>
      {isSignin && <SignIn isSignin={setisSignin} />}
      {registerPopUp && <RegiterPopup openPopUp={RegistrationPop} />}
    </div>
  );
};

export default withStyles(styles)(Header);
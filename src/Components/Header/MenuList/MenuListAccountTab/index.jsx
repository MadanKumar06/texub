import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles";

import PropTypes from "prop-types";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  ListItemText,
  ListItem,
  List,
  Collapse,
  Button,
  Stack,
  ListItemButton,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import {
  ExpandMore,
  ExpandLess,
  AppRegistration,
  ExitToApp,
} from "@mui/icons-material";

import Departments from "./DepartmentJson";
import mycart_image from "../../../../Assets/User/shopping-bag (2).png";
import whishlist_image from "../../../../Assets/User/Icon.png";
import dashboardLogo from "../../../../Assets/CommonImage/MyAccountMegamenu/menu.png";
import myOrderLogo from "../../../../Assets/CommonImage/MyAccountMegamenu/shopping-bag.png";
import auctionsLogo from "../../../../Assets/CommonImage/MyAccountMegamenu/auction.png";
import logoutLogo from "../../../../Assets/CommonImage/MyAccountMegamenu/logout.png";
import account_circle from "../../../../Assets/User/user (3).png";
import { useStateValue } from "../../../../store/state";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const BasicTabs = ({ classes, handleSideBarClose }) => {
  const [value, setValue] = React.useState(0);
  const [{}, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const RegistrationPop = (event) => {
    handleSideBarClose("left", false);
    setTimeout(() => {
      dispatch({
        type: "SET_REGISTER_OPEN_CLOSE",
        value: true,
      });
    }, 1000 / 2);
  };

  const SigninPopUP = () => {
    handleSideBarClose("left", false);
    setTimeout(() => {
      dispatch({
        type: "SET_SIGNIN_OPEN_CLOSE",
        value: true,
      });
    }, 1000 / 2);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const myAccountList = [
    {
      image: dashboardLogo,
      name: "Dashboard",
    },
    {
      image: myOrderLogo,
      name: " My Orders",
    },
    {
      image: auctionsLogo,
      name: "Auctions",
    },
    {
      image: logoutLogo,
      name: "Logout",
    },
  ];
  return (
    <Box sx={{ width: "100%" }} className={classes.main_boxt_conatainer}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className={classes.tab_conatainer}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          <Tab label="Account" className={classes.tab_account} />
          <Tab label="Menu" className={classes.tab_Menu} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className={classes.sub_tab_conatainer}>
        <ListItemButton onClick={handleClick}>
          <img src={account_circle} alt="" />
          <ListItemText primary={"My Account"} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            onClick={() => handleSideBarClose("left", false)}
            component="div"
            disablePadding
          >
            {myAccountList?.map((itm) => (
              <div key={itm?.name} className={classes.dropdown_collapse_list}>
                <Link className={classes.link_in_tab} to={`/`}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <img src={itm?.image} alt="" />
                    <ListItemText primary={`${itm?.name}`} />
                  </ListItemButton>
                </Link>
              </div>
            ))}
          </List>
        </Collapse>
        <Link
          className={classes.link_in_tab}
          to="/"
          onClick={() => handleSideBarClose("left", false)}
        >
          <ListItem button>
            <img src={whishlist_image} alt="" />
            <ListItemText primary={"My Wishlist"} />
          </ListItem>
        </Link>
        <Link
          className={classes.link_in_tab}
          to="/mycart"
          onClick={() => handleSideBarClose("left", false)}
        >
          <ListItem button>
            <img src={mycart_image} alt="" />
            <ListItemText primary={"My Cart"} />
          </ListItem>
        </Link>
        <Stack direction="row" spacing={2} className={classes.stackmenu_button}>
          <Button
            variant="contained"
            startIcon={<AppRegistration />}
            className={classes.menuButton}
            onClick={() => RegistrationPop()}
          >
            Register
          </Button>
          <Button
            variant="contained"
            endIcon={<ExitToApp />}
            className={classes.menuButton}
            onClick={() => SigninPopUP()}
          >
            SignIn
          </Button>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.sub_tab_conatainer}>
        <List className={classes.dropdowm_list_menu}>
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary="Department"
              className={classes.dropdowm_list_menu_sub}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              onClick={() => handleSideBarClose("left", false)}
              component="div"
              disablePadding
            >
              {Departments?.map((itm) => (
                <div key={itm?.name} className={classes.dropdown_collapse_list}>
                  <Link className={classes.link_in_tab} to={`/`}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`${itm?.name}`} />
                    </ListItemButton>
                  </Link>
                </div>
              ))}
            </List>
          </Collapse>
        </List>
        <List onClick={() => handleSideBarClose("left", false)}>
          <Link className={classes.link_in_tab} to="/aboutus">
            <ListItem button>
              <ListItemText primary={"About Us"} />
            </ListItem>
          </Link>
          <Link className={classes.link_in_tab} to="/products">
            <ListItem button>
              <ListItemText primary={"Products"} />
            </ListItem>
          </Link>
          <Link className={classes.link_in_tab} to="/Sellontexhub">
            <ListItem button>
              <ListItemText primary={"Sell On TEXUB"} />
            </ListItem>
          </Link>
          <Link className={classes.link_in_tab} to="/Buyontexhub">
            <ListItem button>
              <ListItemText primary={"Buy On TEXUB"} />
            </ListItem>
          </Link>
          {/* <Link className={classes.link_in_tab} to="/">
            <ListItem button>
              <ListItemText primary={"FAQ"} />
            </ListItem>
          </Link> */}

          <Link className={classes.link_in_tab} to="/Contactus">
            <ListItem button>
              <ListItemText primary={"Contact Us"} />
            </ListItem>
          </Link>
        </List>
      </TabPanel>
    </Box>
  );
};

export default withStyles(styles)(BasicTabs);

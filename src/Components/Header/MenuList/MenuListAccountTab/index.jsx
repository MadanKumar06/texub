import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Departments from "./DepartmentJson";
import {
  ListItemText,
  ListItem,
  List,
  Collapse,
  Button,
  Stack
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import ListItemButton from "@mui/material/ListItemButton";
import {
  ExpandMore,
  ExpandLess,
  AccountCircle,
  Favorite,
  ShoppingBag,
  AppRegistration,
  ExitToApp,
} from "@material-ui/icons";

import { Link } from "react-router-dom";
import styles from "./styles";
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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
        <Link className={classes.link_in_tab} to="/">
          <ListItem button>
            <AccountCircle />
            <ListItemText primary={"My Account"} />
          </ListItem>
        </Link>
        <Link className={classes.link_in_tab} to="/">
          <ListItem button>
            <Favorite />
            <ListItemText primary={"My Wishlist"} />
          </ListItem>
        </Link>
        <Link className={classes.link_in_tab} to="/">
          <ListItem button>
            <ShoppingBag />
            <ListItemText primary={"My Cart"} />
          </ListItem>
        </Link>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="DepartMent" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List
              onClick={() => handleSideBarClose("left", false)}
              component="div"
              disablePadding
            >
              {Departments?.map((itm) => (
                <div>
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
          <Link className={classes.link_in_tab} to="/Products">
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
          <Link className={classes.link_in_tab} to="/">
            <ListItem button>
              <ListItemText primary={"FAQ"} />
            </ListItem>
          </Link>

          <Link className={classes.link_in_tab} to="/Contactus">
            <ListItem button>
              <ListItemText primary={"Contact Us"} />
            </ListItem>
          </Link>
        </List>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<AppRegistration />}
            className={classes.menuButton}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            endIcon={<ExitToApp />}
            className={classes.menuButton}
          >
            Send
          </Button>
          </Stack>
      </TabPanel>
    </Box>
  );
};

export default withStyles(styles)(BasicTabs);

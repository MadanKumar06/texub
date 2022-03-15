import React from "react";
import styles from "./styles";

import { Button, Menu, MenuItem } from "@mui/material";
import { withStyles } from "@mui/styles";
import { ExpandMore } from "@mui/icons-material";

import aed from "../../../Assets/CommonImage/Currency switcher/Mask Group 3.png";
import usd from "../../../Assets/CommonImage/Currency switcher/dollar-symbol.png";
import inr from "../../../Assets/CommonImage/Currency switcher/Group 1132.png";

const Currency = [
  {
    name: "INR",
    image: inr,
  },
  {
    name: "USD",
    image: usd,
  },
  {
    name: "AED",
    image: aed,
  },
];

const CurrencyPopup = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState({
    name: "INR",
    image: inr,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setSelectedValue({
      name: event.name,
      image: event.image,
    });
    setAnchorEl(null);
  };
  return (
    <div className={classes.header_dropdown}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img src={selectedValue?.image} alt="" />
        {selectedValue?.name}
        <ExpandMore />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menulist_item}
      >
        {Currency?.map((item) => (
          <MenuItem
            name="name"
            key={item?.name}
            onClick={(e) => handleChange(item)}
          >
            <img src={item?.image} alt="" />
            {item?.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default withStyles(styles)(CurrencyPopup);

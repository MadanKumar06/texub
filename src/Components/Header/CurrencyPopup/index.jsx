import React from "react";
import {  Button, Menu, MenuItem } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import { ExpandMore } from "@material-ui/icons";
import styles from "./styles";

const Currency = [
  {
    currency_name: "USD - US Dollar",
  },
  {
    currency_name: "INR - Indian Rupee",
  },
  {
    currency_name: "AED - UAE Dirham",
  },
];

const CurrencyPopup = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState({
    currency_name: "INR - Indian Rupee",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setSelectedValue({
      currency_name: event.currency_name,
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
        {selectedValue?.currency_name}
        <ExpandMore />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Currency?.map((item) => (
          <MenuItem name="currency_name" onClick={(e) => handleChange(item)}>
            {item?.currency_name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default withStyles(styles)(CurrencyPopup);

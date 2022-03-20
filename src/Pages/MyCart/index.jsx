import React from "react";
import "./styles.scss";
import { Stack, Button, Breadcrumbs, Typography } from "@mui/material";
import MyCartTable from "./MyCartTable";
import { Link } from "react-router-dom";
import shopping_image from "../../Assets/MyCart/Group 956.png";

const Mycart = () => {
  return (
    <div className="my_cart_main">
      <div className="my_cart_image_block">
        <img src={shopping_image} alt="" />
        <p>Shopping Cart</p>
      </div>
      <div className="my_cart_breadcrumbs">
        <Stack spacing={2}>
          <Breadcrumbs separator=">>" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <Typography key="4" color="#002D56">
              Cart
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <MyCartTable />

      <div className="my_cart_footer">
        <Button className="my_cart_bottom_button_shopping">
          <span>Continue Shopping</span>
        </Button>
        <Button className="my_cart_bottom_button_pending_invoice">
          <span>Add To Pending Invoice</span>
        </Button>
      </div>
    </div>
  );
};

export default Mycart;

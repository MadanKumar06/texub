import React, { useState } from "react";
import "./styles.scss";

import { Rating, Button, Menu, MenuItem } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import { MoreVert } from "@mui/icons-material";

const WhislistTable = ({ tableData, tableDataHeader }) => {
  //open more option at resolution 767px and below
  const [openMoreOPtion, setOpenMoreOption] = useState(null);
  const handleClickForOpenMoreOption = (event) => {
    setOpenMoreOption(event.currentTarget);
  };
  const handleCloseForOpenMoreOption = () => {
    setOpenMoreOption(null);
  };

  return (
    <div className="wishlist_table_container">
      <div className="whishlist_table_header">
        <p className="header_title">{tableDataHeader}</p>
        <MoreVert
          className="more_option"
          onClick={handleClickForOpenMoreOption}
        />
        <Menu
          id="simple-menu"
          anchorEl={openMoreOPtion}
          keepMounted
          open={Boolean(openMoreOPtion)}
          onClose={handleCloseForOpenMoreOption}
          className="menulist_item"
        >
          <MenuItem>Add All To Cart</MenuItem>
          <MenuItem>Delete List</MenuItem>
        </Menu>
        <div className="header_link">
          <p>Add All To Cart</p>
          <p>Delete List</p>
        </div>
      </div>
      <div className="table_boby_block">
        {tableData?.map((itm, index) => (
          <div className="table_block">
            <div className="product_info_block">
              <div className="product_image">
                <img src={itm?.products?.products_img} alt="" />
              </div>
              <div className="products_info">
                <p className="product_name">{itm?.products?.products_name}</p>
                <p className="product_price">
                  <span>INR</span>
                  {itm?.products?.products_price}
                </p>
              </div>
              <div className="rating_block">
                <div className="rating">
                  <Rating
                    className="ratings"
                    name="simple-controlled"
                    value={3}
                    onChange={(event, newValue) => {
                      //   setValue(newValue);
                    }}
                  />
                  <p className="reviews"> 543 Reviews</p>
                </div>
                <p className="seller_id">
                  <span>Seller ID :</span>
                  {itm?.products?.seller_id}
                </p>
              </div>
            </div>

            <div className="Hub__quantity__block">
              <div className="Hub__quantity__sub_block">
                <span>Hub</span>
                <div className="content">
                  <div className="hub_info">
                    <p>{itm?.products?.products_hub}</p>
                  </div>
                  <div className="quantity_info">
                    <div className="qty_change">
                      <Remove
                        className="item_decrease"
                        // onClick={() =>
                        //   handleChange(
                        //     parseInt(itm?.quantity) >= 2
                        //       ? parseInt(itm?.quantity) - 1
                        //       : 1,
                        //     index
                        //   )
                        // }
                      />
                      <span className="input_text">
                        {" "}
                        {itm?.products?.products_quantity}
                      </span>
                      <Add
                        className="item_increase"
                        // onClick={() =>
                        //   handleChange(parseInt(itm?.quantity) + 1, index)
                        // }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button className="pending-invoice-btn">
                  <span> Add to Pending Invoice</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhislistTable;

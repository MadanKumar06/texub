import React, { useState, useEffect } from "react";
import "./styles.scss";

import { Link } from "react-router-dom";
import { Clear } from "@mui/icons-material";
import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import brand_logo from "../../../Assets/Productlist/Brand_icon.png";
import { Rating } from "@mui/material";

const MiniCartList = ({ handleSideBarClose }) => {
  const [value, setValue] = React.useState(4);
  const [isCartData, setIsCartData] = useState(0);
  useEffect(() => {
    setIsCartData(minicartListJson);
  }, []);
  const handleChange = (event, index) => {
    setIsCartData(
      isCartData?.map((item, ind) => {
        if (index === ind) {
          return {
            ...item,
            quantity: event,
          };
        } else {
          return item;
        }
      })
    );
  };
  const minicartListJson = [
    {
      seller_id: "12121",
      model_name: "PAVILION MODEL14-DV0054TU",
      hub: "MUMBAI",
      price: "66,999",
      quantity: "60",
      total: "4,019,940",
    },
    {
      seller_id: "12121",
      model_name: "PAVILION MODEL14-DV0054TU",
      hub: "MUMBAI",
      price: "66,999",
      quantity: "60",
      total: "4,019,940",
    },
    {
      seller_id: "12121",
      model_name: "PAVILION MODEL14-DV0054TU",
      hub: "MUMBAI",
      price: "66,999",
      quantity: "60",
      total: "4,019,940",
    },
  ];
  return (
    <div className="minicart_list_main">
      <header className="minicart_header">
        <Clear
          className="clear_btn"
          onClick={() => handleSideBarClose("right", false)}
        />
        <h6>Mini Cart</h6>
      </header>
      <div className="minicart_list_content">
        {isCartData?.length &&
          isCartData?.map((itm, index) => (
            <div className="minicart_section_container">
              <div className="section_left">
                <img src={brand_logo} alt="" />
              </div>
              <div className="section_right">
                <p className="seller_id">
                  Seller ID : <span>{itm?.seller_id} </span>
                </p>
                <div className="modal__hub">
                  <p className="modal_name">{itm?.model_name}</p>
                  <p className="hub">
                    <span>Hub</span>
                    {itm?.hub}
                  </p>
                </div>
                <div className="rating_main">
                  <Rating
                    className="ratings"
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <p className="reviews"> 543 Reviews</p>
                </div>
                <p className="detail_link">Details</p>
                <div className="price_block">
                  <p className="price">
                    <span>INR</span>
                    {itm?.price}
                    <span> /Unit</span>
                  </p>
                  <div className="quantity">
                    <div className="qty_change">
                      <RemoveIcon
                        className="item_decrease"
                        onClick={() =>
                          handleChange(
                            parseInt(itm?.quantity) >= 2
                              ? parseInt(itm?.quantity) - 1
                              : 1,
                            index
                          )
                        }
                      />
                      <span className="input_text">{itm?.quantity}</span>
                      <AddIcon
                        className="item_increase"
                        onClick={() =>
                          handleChange(parseInt(itm?.quantity) + 1, index)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="total_block">
                  <span>TOTAL</span>
                  <p>
                    <span>INR</span> {itm?.total}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <footer className="minicart_footer">
        <div className="minicart_total">
          <p className="title_total">TOTAL</p>
          <p className="total_price">
            <span>INR</span>10,729,830
          </p>
        </div>
        <div className="minicart_btn">
          <Link to="/mycart" onClick={() => handleSideBarClose("right", false)}>
            <Button className="minicart_bottom_button_cart">
              <span>Go To Cart</span>
            </Button>
          </Link>
          <Link
            to="/pending-invoice"
            onClick={() => handleSideBarClose("right", false)}
          >
            <Button className="minicart_bottom_button_pending_invoice">
              <span>Add To Pending Invoice</span>
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default MiniCartList;

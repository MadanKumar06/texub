import React, { useEffect, useState } from "react";
import "./styles.scss";

import { Rating, Button, Menu, MenuItem } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import Constant from "../../../../Constant";
import { useStateValue } from "../../../../store/state";

const WhislistTable = ({ tableData, tableDataHeader, folderdata }) => {
  //open more option at resolution 767px and below
  const [openMoreOPtion, setOpenMoreOption] = useState(null);
  const handleClickForOpenMoreOption = (event) => {
    setOpenMoreOption(event.currentTarget);
  };
  const handleCloseForOpenMoreOption = () => {
    setOpenMoreOption(null);
  };
  const [folderid, setfolderid] = useState();
  useEffect(() => {
    folderdata?.filter((fd) => {
      if (fd.wishlist_name === tableDataHeader) {
        setfolderid(fd);
      }
    });
  }, [folderdata]);

  const [{ currency }, dispatch] = useStateValue();
  const [wdata, setwdata] = useState();

  useEffect(() => {
    console.log(tableData);
    if (tableData?.length > 0) {
      let temp = tableData?.map((td) => ({
        ...td,
        moq: td?.texub_product_moq,
      }));
      setwdata(temp);
    }
  }, [tableData]);

  const wishlistdelete = async () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const deletewish = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/wishlist/deleteAll`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          requestParams: {
            multiwishlist_id: parseInt(folderid?.id),
            customer_id: user?.id,
          },
        },
      });
      console.log(deletewish.data);
    } catch (e) {
      console.log(e);
    }
  };

  const addalltocart = () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    wdata?.filter(async (w) => {
      try {
        const addcart = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/addToCart`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            pendingProducts: {
              customer_id: user?.id,
              productId: w?.product_id,
              price: w?.texub_product_price,
              qty: w?.texub_product_moq,
              hub: w?.texub_product_hub,
              currency: currency,
              sellerId: w?.seller_id,
            },
          },
        });
        dispatch({
          type: "CART__TRIGGER",
        });
      } catch (e) {
        console.log(e);
      }
    });
  };

  const increment = (value, index) => {
    debugger;
    setwdata(
      wdata.map((itm, wd) => {
        if (index === wd) {
          return {
            ...itm,
            texub_product_moq: value,
          };
        } else {
          return itm;
        }
      })
    );
  };

  const decrement = (value, index) => {
    debugger;
    setwdata(
      wdata.map((itm, wd) => {
        if (index === wd) {
          return {
            ...itm,
            texub_product_moq: value,
          };
        } else {
          return itm;
        }
      })
    );
  };

  console.log(wdata);

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
          <MenuItem onClick={addalltocart}>Add All To Cart</MenuItem>
          <MenuItem onClick={wishlistdelete}>Delete List</MenuItem>
        </Menu>
        <div className="header_link">
          <p onClick={addalltocart}>Add All To Cart</p>
          <p onClick={wishlistdelete}>Delete List</p>
        </div>
      </div>
      <div className="table_boby_block">
        {wdata?.length > 0
          ? wdata?.map((itm, index) => (
              <div className="table_block">
                <div className="product_info_block">
                  <div className="product_image">
                    <img src={itm?.texub_product_brand_image} alt="" />
                  </div>
                  <div className="products_info">
                    <p className="product_name">{itm?.product_name}</p>
                    <p className="product_price">
                      <span>{itm?.texub_product_currency}</span>
                      {itm?.texub_product_price}
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
                      {itm?.seller_id}
                    </p>
                  </div>
                </div>

                <div className="Hub__quantity__block">
                  <div className="Hub__quantity__sub_block">
                    <span>Hub</span>
                    <div className="content">
                      <div className="hub_info">
                        <p>{itm?.texub_product_hub_name}</p>
                      </div>
                      <div className="quantity_info">
                        <div className="qty_change">
                          <Remove
                            className={`${
                              parseInt(itm.texub_product_moq) >
                              parseInt(itm.moq)
                                ? "item_increase"
                                : "item_decrease"
                            }`}
                            onClick={() =>
                              decrement(
                                parseInt(itm.texub_product_moq) >
                                  parseInt(itm.moq)
                                  ? parseInt(itm.texub_product_moq) - 1
                                  : parseInt(itm.moq),
                                index
                              )
                            }
                          />
                          <span className="input_text">
                            {" "}
                            {itm?.texub_product_moq}
                          </span>
                          <Add
                            className={`${
                              parseInt(itm.moq) <
                              parseInt(itm.texub_product_stock)
                                ? "item_increase"
                                : "item_decrease"
                            }`}
                            onClick={() =>
                              increment(
                                parseInt(itm.texub_product_stock) >
                                  parseInt(itm.texub_product_moq)
                                  ? parseInt(itm.texub_product_moq) + 1
                                  : parseInt(itm.texub_product_moq),
                                index
                              )
                            }
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
            ))
          : ""}
      </div>
    </div>
  );
};

export default WhislistTable;

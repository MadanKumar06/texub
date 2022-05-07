import React, { useEffect, useState } from "react";
import "./styles.scss";

import { Rating, Button, Menu, MenuItem } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import Constant from "../../../../Constant";
import { useStateValue } from "../../../../store/state";
import swal from "sweetalert2";

import WishlistEdit from "../image/wishlist-edit.png";
import WishlistDelete from "../image/wishlist-delete.png";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

const WhislistTable = ({
  tableData,
  tableDataHeader,
  item_id,
  setWishListAgain,
  wishListAgain,
}) => {
  //open more option at resolution 767px and below
  const [openMoreOPtion, setOpenMoreOption] = useState(null);
  const handleClickForOpenMoreOption = (event) => {
    setOpenMoreOption(event.currentTarget);
  };
  const handleCloseForOpenMoreOption = () => {
    setOpenMoreOption(null);
  };
  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

  const [{ currency }, dispatch] = useStateValue();
  const [wdata, setwdata] = useState();

  useEffect(() => {
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
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    try {
      const deletewish = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/wishlist/deleteAll`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          requestParams: {
            multiwishlist_id: parseInt(item_id),
            customer_id: user?.id,
          },
        },
      });
      dispatch({
        type: "SET_GENERAL_TRINGGER",
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });

      if (deletewish?.data?.[0]?.status) {
        setWishListAgain(!wishListAgain);
        swal.fire({
          text: `${deletewish?.data?.[0]?.message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        setWishListAgain(!wishListAgain);
      } else {
        swal.fire({
          text: `${deletewish?.data?.[0]?.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };

  const addwishtocart = async (value) => {
    const user = JSON.parse(localStorage.getItem("userdata"));
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
            productId: value?.product_id,
            price: value?.texub_product_price,
            qty: value?.texub_product_moq,
            hub: value?.texub_product_hub_id,
            currency: currency?.currency_id,
            sellerId: value?.seller_id,
          },
        },
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      dispatch({
        type: "CART__TRIGGER",
      });
      if (addcart?.data?.[0]?.status) {
        swal.fire({
          text: `${addcart?.data?.[0]?.message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        swal.fire({
          text: `${addcart?.data?.[0]?.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };

  const addalltocart = () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
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
              hub: w?.texub_product_hub_id,
              currency: currency?.currency_id,
              sellerId: w?.seller_id,
            },
          },
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        dispatch({
          type: "CART__TRIGGER",
        });
        if (addcart?.data?.[0]?.status) {
          swal.fire({
            text: `${addcart?.data?.[0]?.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          swal.fire({
            text: `${addcart?.data?.[0]?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (e) {
        console.log(e);
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      }
    });
  };

  const increment = (value, index) => {
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

  const handleWishlistSingleItemDelete = async (id) => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    const user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const deleteSinglewishlist = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/wishlist/delete`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          requestParams: {
            item_id: id,
            customer_id: user?.id,
          },
        },
      });
      dispatch({
        type: "SET_GENERAL_TRINGGER",
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (deleteSinglewishlist?.data?.[0]?.status) {
        setWishListAgain(!wishListAgain);
        swal.fire({
          text: `${deleteSinglewishlist?.data?.[0]?.message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        swal.fire({
          text: `${deleteSinglewishlist?.data?.[0]?.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };

  const addalltopending = () => {
    console.log(wdata);
    wdata?.filter((w) => {
      AddToCartAndPendingInvoice(w);
    });
  };

  const AddToCartAndPendingInvoice = (info) => {
    let storedata = JSON.parse(localStorage.getItem("storedata"));
    const user = JSON.parse(localStorage.getItem("userdata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      pendingProducts: {
        store_id: storedata?.store_id,
        customer_id: user?.id,
        productId: info?.product_id,
        price: info?.texub_product_price,
        qty: info?.texub_product_moq,
        hub: info?.texub_product_hub_id,
        currency: currency?.currency_id,
        sellerId: info?.seller_id,
      },
    };
    axios
      .post(`${Constant.baseUrl()}/addToPendingInvoice`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (res?.data?.[0]?.status) {
          swal.fire({
            text: `${res.data?.[0]?.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
          dispatch({
            type: "SET_PDP_POPUP_OPEN_CLOSE",
            value: false,
          });
          dispatch({
            type: "CART__TRIGGER",
          });
        } else {
          swal.fire({
            text: `${res.data?.[0]?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        swal.fire({
          text: `${error?.response?.data?.message || error.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  const [name, setname] = useState(false);
  const [newname, setnewname] = useState();
  const editname = () => {
    setnewname(tableDataHeader);
    setname(!name);
  };

  const savename = async () => {
    if (newname === undefined) return;
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const change = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/wishlist/editName`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          requestParams: {
            customer_id: user?.id,
            wishlist_id: item_id,
            name: newname,
          },
        },
      });
      setname(!name);
      swal.fire({
        text: "Folder Name Changed Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      dispatch({
        type: "SET_GENERAL_TRINGGER",
      });
    } catch (e) {
      console.log(e);
      setname(!name);
    }
  };

  return (
    <div className="wishlist_table_container">
      <div className="whishlist_table_header">
        <div className="wishlist-first-text">
          {name ? (
            <>
              <input
                className="folderinput"
                value={newname}
                onChange={(e) => setnewname(e.target.value)}
                type="text"
              />
              <span className="wishlist-edit-img" onClick={savename}>
                <SaveAsOutlinedIcon />
              </span>
            </>
          ) : (
            <>
              <p className="header_title">{tableDataHeader}</p>
              <span className="wishlist-edit-img" onClick={editname}>
                <img src={WishlistEdit} alt="" />
              </span>
            </>
          )}
        </div>
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
          <MenuItem onClick={() => addalltocart()}>Add All To Cart</MenuItem>
          <MenuItem onClick={() => addalltopending()}>
            Add All To Pending Invoice
          </MenuItem>
          <MenuItem onClick={() => wishlistdelete()}>Delete List</MenuItem>
        </Menu>
        <div className="header_link">
          <p onClick={() => addalltocart()}>Add All To Cart</p>
          <p onClick={() => addalltopending()}>Add All To Pending Invoice</p>
          <p onClick={() => wishlistdelete()}>Delete List</p>
        </div>
      </div>
      <div className="table_boby_block">
        <div className="table_body_section">
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
                        {formatToCurrency(parseInt(itm?.texub_product_price))}
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
                        {itm?.seller_code}
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
                    <div className="wishlist-btn-info">
                      <span
                        className="wishlist-delete-btn"
                        onClick={() =>
                          handleWishlistSingleItemDelete(itm?.wishlit_item_id)
                        }
                      >
                        <img src={WishlistDelete} alt="" />
                      </span>
                      <Button
                        className="add-cart-btn"
                        onClick={() => addwishtocart(itm)}
                      >
                        <span>Add to Cart</span>
                      </Button>
                      <Button
                        className="pending-invoice-btn"
                        onClick={() => AddToCartAndPendingInvoice(itm)}
                      >
                        <span> Add to Pending Invoice</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default WhislistTable;

import React, { useEffect, useState, useRef } from "react";
import "./styles.scss";

import { Rating, Button, Menu, MenuItem } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import Constant from "../../../../Constant";
import { useStateValue } from "../../../../store/state";
import swal from "sweetalert2";
import AllertMessage from "../../../../Components/PendingInvoiceAlertPopup";

import WishlistEdit from "../image/wishlist-edit.png";
import WishlistDelete from "../image/wishlist-delete.png";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { SessionExpiredLogout } from "../../../../utilities";

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
  const [isAddalltoPendingInvoice, setisAddalltoPendingInvoice] =
    useState(false);
  const [allert, setallert] = useState(false);
  const [allertData, setallertData] = useState("");
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

  const [review, setreview] = useState();
  useEffect(() => {
    setreview(localStorage.getItem("review_status"));
  }, [localStorage.getItem("review_status")]);

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
            currency_id: currency?.currency_id,
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
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (e.response.status === 401) {
        SessionExpiredLogout();
      }
    }
  };

  const addwishtocart = async (value) => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (value?.out_of_stock === 1) {
      swal.fire({
        text: "Stock is not available",
        icon: "warning",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
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
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (e.response.status === 401) {
          SessionExpiredLogout();
        }
      }
    }
  };

  const [addToCartFinalCall, setaddToCartFinalCall] = useState([]);
  const i = useRef(0);
  const user = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    if (addToCartFinalCall?.length) {
      let data = {
        pendingProducts: {
          customer_id: user?.id,
          productId: addToCartFinalCall?.[0]?.product_id,
          price: addToCartFinalCall?.[0]?.texub_product_price,
          qty: addToCartFinalCall?.[0]?.texub_product_moq,
          hub: addToCartFinalCall?.[0]?.texub_product_hub_id,
          currency: currency?.currency_id,
          sellerId: addToCartFinalCall?.[0]?.seller_id,
        },
      };
      axios
        .post(`${Constant.baseUrl()}/addToCart`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(async (res) => {
          if (res?.data?.[0]?.status) {
            i.current = i.current + 1;
            let t = wdata[i.current];
            if (i.current < wdata?.length) {
              setaddToCartFinalCall([t]);
            }
            if (i.current === wdata?.length) {
              dispatch({
                type: "SET_IS_LOADING",
                value: false,
              });
            }
            swal.fire({
              text: `${res?.data?.[0]?.message}`,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            i.current = i.current + 1;
            let t = wdata[i.current];
            if (i.current < wdata?.length) {
              setaddToCartFinalCall([t]);
            }
            if (i.current === wdata?.length) {
              dispatch({
                type: "SET_IS_LOADING",
                value: false,
              });
            }
            swal.fire({
              text: `${res?.data?.[0]?.message}`,
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
          i.current = i.current + 1;
          let t = wdata[i.current];
          if (i.current < wdata?.length) {
            setaddToCartFinalCall([t]);
          }
          if (i.current === wdata?.length) {
            dispatch({
              type: "SET_IS_LOADING",
              value: false,
            });
          }
          if (error.response.status === 401) {
            SessionExpiredLogout();
          } else {
            swal.fire({
              text: `${error?.response?.data?.message || error.message}`,
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
    }
  }, [addToCartFinalCall]);

  const addalltocart = async () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    i.current = 0;
    setaddToCartFinalCall([wdata?.[0]]);
  };

  const increment = (value, index) => {
    setwdata(
      wdata?.map((itm, wd) => {
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
      wdata?.map((itm, wd) => {
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
            currency_id: currency?.currency_id,
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

  const [addToPendingInvoiceFinalCall, setAddToPendingInvoiceFinalCall] =
    useState([]);
  const j = useRef(0);
  useEffect(() => {
    if (addToPendingInvoiceFinalCall?.length) {
      debugger;
      let storedata = JSON.parse(localStorage.getItem("storedata"));
      let data = {
        pendingProducts: {
          store_id: storedata?.store_id,
          item_id: "0",
          customer_id: user?.id,
          productId: addToPendingInvoiceFinalCall?.[0]?.data?.product_id
            ? addToPendingInvoiceFinalCall?.[0]?.data?.product_id
            : addToPendingInvoiceFinalCall?.[0]?.product_id,
          price: addToPendingInvoiceFinalCall?.[0]?.data?.texub_product_price
            ? addToPendingInvoiceFinalCall?.[0]?.data?.texub_product_price
            : addToPendingInvoiceFinalCall?.[0]?.texub_product_price,
          qty: addToPendingInvoiceFinalCall?.[0]?.data?.texub_product_moq
            ? addToPendingInvoiceFinalCall?.[0]?.data?.texub_product_moq
            : addToPendingInvoiceFinalCall?.[0]?.texub_product_moq,
          hub: addToPendingInvoiceFinalCall?.[0]?.data?.texub_product_hub_id
            ? addToPendingInvoiceFinalCall?.[0]?.data?.texub_product_hub_id
            : addToPendingInvoiceFinalCall?.[0]?.texub_product_hub_id,
          currency: currency?.currency_id,
          sellerId: addToPendingInvoiceFinalCall?.[0]?.data?.seller_id
            ? addToPendingInvoiceFinalCall?.[0]?.data?.seller_id
            : addToPendingInvoiceFinalCall?.[0]?.seller_id,
        },
      };

      axios
        .post(`${Constant.baseUrl()}/addToPendingInvoice`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(async (res) => {
          if (res?.data?.[0]?.status) {
            j.current = j.current + 1;
            let t = wdata[j.current];
            if (j.current < wdata?.length) {
              setAddToPendingInvoiceFinalCall([t]);
            }
            if (j.current === wdata?.length) {
              dispatch({
                type: "SET_IS_LOADING",
                value: false,
              });
            }
            swal.fire({
              text: `${res?.data?.[0]?.message}`,
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            j.current = j.current + 1;
            let t = wdata[j.current];
            if (j.current < wdata?.length) {
              setAddToPendingInvoiceFinalCall([t]);
            }
            if (i.current === wdata?.length) {
              dispatch({
                type: "SET_IS_LOADING",
                value: false,
              });
            }
            swal.fire({
              text: `${res?.data?.[0]?.message}`,
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
          j.current = j.current + 1;
          let t = wdata[j.current];
          if (j.current < wdata?.length) {
            setAddToPendingInvoiceFinalCall([t]);
          }
          if (j.current === wdata?.length) {
            dispatch({
              type: "SET_IS_LOADING",
              value: false,
            });
          }
          if (error.response.status === 401) {
            SessionExpiredLogout();
          } else {
            swal.fire({
              text: `${error?.response?.data?.message || error.message}`,
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
    }
  }, [addToPendingInvoiceFinalCall]);

  const addalltopending = async () => {
    setallert(false);
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    j.current = 0;
    setAddToPendingInvoiceFinalCall([wdata?.[0]]);
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
            currency_id: currency?.currency_id,
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

  const AddpendingInvoiceAlert = (event) => {
    setallert(event);
  };

  const isAvailableStock_PendingInvoince = (value) => {
    if (value?.out_of_stock === 1) {
      swal.fire({
        text: "Stock is not available",
        icon: "warning",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      setallert(true);
      setallertData(value);
    }
  };
  console.log("wdata");
  console.log(wdata);
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
                onKeyPress={(e) => e.key === "Enter" && savename()}
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
          <MenuItem
            onClick={() => addalltocart()}
            style={{
              textDecoration: "underline",
              color: "#5C6369",
              fontWeight: "600",
            }}
          >
            Add All To Cart
          </MenuItem>
          <MenuItem
            onClick={() => addalltopending()}
            style={{
              textDecoration: "underline",
              color: "#5C6369",
              fontWeight: "600",
            }}
          >
            Add All To Pending Invoice
          </MenuItem>
          <MenuItem
            onClick={() => wishlistdelete()}
            style={{
              textDecoration: "underline",
              color: "#5C6369",
              fontWeight: "600",
            }}
          >
            Delete List
          </MenuItem>
        </Menu>
        <div className="header_link">
          <p onClick={() => addalltocart()}>Add All To Cart</p>
          <p
            onClick={() => {
              setallert(true);
              setisAddalltoPendingInvoice(true);
            }}
          >
            Add All To Pending Invoice
          </p>
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
                      {itm?.texub_product_brand_image ? (
                        <img
                          src={itm?.texub_product_brand_image}
                          className="brand_img_section"
                          alt="No Brands"
                          title={itm?.texub_product_brand}
                        />
                      ) : (
                        <span>{itm?.texub_product_brand}</span>
                      )}
                    </div>
                    <div className="products_info">
                      <p className="product_name">{itm?.product_name}</p>
                      <p className="product_price">
                        {itm?.out_of_stock === 1 ? (
                          <span>-</span>
                        ) : (
                          <>
                            <span>{itm?.texub_product_currency}</span>
                            {formatToCurrency(
                              parseInt(itm?.texub_product_price)
                            )}{" "}
                          </>
                        )}
                      </p>
                    </div>
                    <div className="rating_block">
                      <div className="rating">
                        {review == 0 ? (
                          ""
                        ) : (
                          <>
                            <Rating
                              className="ratings"
                              name="simple-controlled"
                              value={3}
                              onChange={(event, newValue) => {
                                //   setValue(newValue);
                              }}
                            />
                            <p className="reviews"> 543 Reviews</p>
                          </>
                        )}
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
                        onClick={() => {
                          isAvailableStock_PendingInvoince(itm);
                          // setallert(true);
                          // setallertData(itm);
                        }}
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
      {allert && (
        <AllertMessage
          AddpendingInvoiceAlert={AddpendingInvoiceAlert}
          handleIsValidUser={addalltopending}
          allertData={allertData}
          isAddalltoPendingInvoice={isAddalltoPendingInvoice}
          addalltopending={addalltopending}
          setisAddalltoPendingInvoice={setisAddalltoPendingInvoice}
        />
      )}
    </div>
  );
};

export default WhislistTable;

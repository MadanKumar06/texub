import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Button, Typography, Box } from "@mui/material";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  InputLabel,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useParams, useLocation } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import swal from "sweetalert2";
import { useStateValue } from "../../../store/state";
import PhoneInput from "react-phone-input-2";
//assets
import Devilvery_address_image_1 from "../../../Assets/CheckoutPage/Group 911.png";
import Devilvery_address_image_2 from "../../../Assets/CheckoutPage/Group 912.png";
import Checkout_Texub_logo from "../../../Assets/CheckoutPage/checkout_texub_logo.png";
import Constant from "../../../Constant";
import axios from "axios";
import moment from "moment";
import { getAdminToken } from "../../../utilities";

const Checkout = () => {
  const [{ currency, geo }, dispatch] = useStateValue();
  const [mobile_number_countryCode, setMobile_number_countryCode] =
    useState("ae");
  const [buyercode, setbuyercode] = useState();
  let checkoutDataFromLocal = JSON.parse(
    localStorage.getItem("invoice_checkout")
  );
  useEffect(() => {
    let userdata = JSON.parse(localStorage.getItem("userdata"));
    userdata?.custom_attributes?.filter((ud) => {
      if (ud?.attribute_code === "customer_code") {
        setbuyercode(ud?.value);
      }
    });
  }, []);
  useEffect(() => {
    if (geo) {
      let temp = geo?.country_code?.toLowerCase();
      setMobile_number_countryCode(temp);
    }
  }, [geo]);

  const [addressdata, setaddressdata] = useState({
    organization_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    pincode: "",
    country: "",
    lastname: "",
    firstname: "",
    state: "",
    billtype: "texub_shipping",
  });

  useEffect(() => {
    document
      .getElementById("Header-header_main-2")
      .classList.remove("Header-header_main-2");
    document
      .getElementById("Header-header_main-2")
      .classList.add("Header-header_main-2_no_display");

    document
      .getElementById("user_details_main_container")
      .classList.remove("user_details_main_container");
    document
      .getElementById("user_details_main_container")
      .classList.add("user_details_main_container_no_display");
  }, []);
  const [selectadd, setselectadd] = useState();

  useEffect(() => {
    if (
      checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
        ?.billing_address_id !== null
    ) {
      setselectadd(
        checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
          ?.billing_address_id
      );
    }
  }, [checkoutDataFromLocal?.invoice_checkout_data]);

  useEffect(() => {
    if (checkoutDataFromLocal?.invoice_checkout_data?.length) {
      let t =
        checkoutDataFromLocal?.invoice_checkout_data?.length &&
        checkoutDataFromLocal?.invoice_checkout_data?.[0]?.address_list?.filter(
          (itm) =>
            itm?.address_id ===
            checkoutDataFromLocal?.invoice_checkout_data?.[0]?.invoice
              ?.shipping_address_id
        );
      selectaddress(t?.[0]);
    }
  }, [checkoutDataFromLocal?.invoice_checkout_data]);
  const selectaddress = (itm) => {
    if (
      checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
        ?.pending_invoice_status > "3"
    )
      return;
    setselectadd(itm?.address_id);
    let t = itm?.state_id === 0 ? itm?.state : itm?.state_id;
    setaddressdata({
      organization_name: itm?.company,
      address_line1: itm?.Street[0],
      address_line2: itm?.Street[1],
      city: itm?.city,
      state: t,
      pincode: itm?.postcode,
      country: itm?.country_id,
      id: itm?.address_id,
      firstname: itm?.firstname,
      lastname: itm?.lastname,
    });
  };

  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

  const handleChange = () => {
    window.onbeforeprint = function (event) {
      document.getElementById("print_btn").classList.remove("print_btn");
      document
        .getElementById("print_btn")
        .classList.add("print_btn_no_display");
    };
    window.onafterprint = function (event) {
      document
        .getElementById("print_btn")
        .classList.remove("print_btn_no_display");
      document.getElementById("print_btn").classList.add("print_btn");
    };
    window.print();
  };
  return (
    <div className="checkout_main_container_print" id="Checkout_page">
      <div className="checkout_info_list">
        <div className="order_id_info">
          <div className="orderid_section">
            <span className="orderinfo_name">Order ID</span>
            <span className="orderinfo_value">
              {
                checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                  ?.pending_invoice_id
              }
            </span>
          </div>
        </div>
        <div className="order_total_info">
          <div className="ordertal_section">
            <span className="orderinfo_name">Total Amount</span>

            <span className="orderinfo_value">
              <span className="ordertotal_symbol">
                {currency?.currency_code}
              </span>{" "}
              {checkoutDataFromLocal?.shipping_method === "texub_shipping" ? (
                <span>
                  {formatToCurrency(
                    parseInt(
                      checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                        ?.grand_total_with_freight
                    )
                  )}
                </span>
              ) : (
                <span>
                  {formatToCurrency(
                    parseInt(
                      checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                        ?.grand_total_without_freight
                    )
                  )}
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="order_status_info">
          <div className="orderstatus_section">
            <span className="orderinfo_name">Order Status</span>
            <span className="orderinfo_value">Pending</span>
          </div>
        </div>
      </div>

      <div className="checkout_order_info">
        <div className="checkout_order-infosection">
          <div className="checkout_logo_img">
            <div className="checklogo_svg">
              <img
                className="checkout_texub_logo"
                src={Checkout_Texub_logo}
                alt=""
              />
            </div>
          </div>
          <div className="checkout_order_basic_info">
            <div className="order_basic_info">
              <span className="order_basic_title">Order No</span>
              <Divider orientation="vertical" />
              <span className="order_basic_value">
                {
                  checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                    ?.pending_invoice_id
                }
              </span>
            </div>
            <div className="order_basic_info">
              <span className="order_basic_title">Date</span>
              <Divider orientation="vertical" />
              <span className="order_basic_value">
                {moment(
                  checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice?.date
                ).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="order_basic_info">
              <span className="order_basic_title">Due Date</span>
              <Divider orientation="vertical" />
              <span className="order_basic_value">
                {moment(
                  checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                    ?.due_date
                ).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="order_basic_info">
              <span className="order_basic_title">Buyer ID</span>
              <Divider orientation="vertical" />
              <span className="order_basic_value">{buyercode}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="section_left">
        <div className="section_left_info">
          <ul>
            <li
              className={`block_A ${
                checkoutDataFromLocal?.shipping_method === "texub_shipping" ||
                checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                  ?.pending_invoice_status === "3"
                  ? "block_A1"
                  : "additional"
              }`}
            >
              <img
                className="delivery_address_img"
                src={Devilvery_address_image_1}
                alt=""
              />
              <p className="delivery_address_title"> Delivery Methods</p>

              <div className="shipping_info">
                <div className="shipping_list_section">
                  <div className="shipping_list">
                    <FormControl className="shipping_list">
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={checkoutDataFromLocal?.shipping_method}
                        // aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="pick_up_from_hub"
                          control={<Radio />}
                          label="Pick Up From The Hub"
                        />
                        <FormControlLabel
                          value="texub_shipping"
                          control={<Radio />}
                          label="TEXUB Shipping"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="shipping_charges_info">
                  {checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                    ?.pending_invoice_status === "2" &&
                    checkoutDataFromLocal?.shipping_method ===
                      "texub_shipping" && (
                      <div className="shipping_charges_section">
                        <span className="shipping_text">
                          Shipping Charges :
                        </span>
                        <span className="shipping_awit">
                          Awaiting for Prices
                        </span>
                      </div>
                    )}
                  {checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                    ?.pending_invoice_status === "3" && (
                    <div className="shipping_charges_section">
                      <span className="shipping_text">Shipping Charges :</span>
                      <span className="shipping_price">
                        <span>{currency?.currency_code}</span>{" "}
                        {parseFloat(
                          checkoutDataFromLocal?.invoice_checkout_data[0]
                            ?.invoice?.shipping_amount
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="aside_block">
                {checkoutDataFromLocal?.shipping_method === "texub_shipping" ? (
                  <div className="aside_block_A">
                    <div className="delivery_address_section">
                      <div className="delivery_address_list">
                        {checkoutDataFromLocal?.invoice_checkout_data[0]?.address_list?.map(
                          (itm) => (
                            <>
                              {itm?.shipping_billing == "1" ? (
                                <div
                                  className={`delivery_address_content ${
                                    selectadd === itm?.address_id && "border"
                                  }`}
                                >
                                  <div className="billing_title">
                                    {itm?.default_billing == 1 ? (
                                      <p>Default Shipping Address</p>
                                    ) : (
                                      <p></p>
                                    )}
                                  </div>
                                  <p className="user_name">
                                    {itm?.firstname} {itm?.lastname}
                                  </p>
                                  <p className="item_address">{itm?.company}</p>
                                  <p className="item_address">
                                    {itm?.Street[0]}
                                  </p>
                                  <p className="item_address">
                                    {itm?.Street[1]}
                                  </p>
                                  <span className="item_address">
                                    {itm?.city}
                                    {" - "}
                                    {itm?.country_code}
                                  </span>
                                  <span className="item_address">
                                    {itm?.state}
                                  </span>
                                  <span className="item_address">
                                    {itm?.postcode}{" "}
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aside_block_A">
                    <div className="delivery_address_section pickup_hub">
                      <div className="pickup_address_section">
                        <div className="address_fields">
                          <InputLabel>Business Name : </InputLabel>
                          <span>
                            {
                              checkoutDataFromLocal?.pickup_form_data
                                ?.bussiness_name
                            }
                          </span>
                        </div>
                        <div className="address_fields">
                          <InputLabel>Contact Person Name : </InputLabel>
                          <span>
                            {
                              checkoutDataFromLocal?.pickup_form_data
                                ?.contact_person
                            }
                          </span>
                        </div>
                      </div>

                      <div className="pickup_address_section">
                        <div className="address_fields">
                          <InputLabel>E-Mail Address : </InputLabel>
                          <span>
                            {
                              checkoutDataFromLocal?.pickup_form_data
                                ?.email_address
                            }
                          </span>
                        </div>
                        <div className="address_fields">
                          <InputLabel>Mobile Number : </InputLabel>
                          <span>
                            +
                            {
                              checkoutDataFromLocal?.pickup_form_data
                                ?.mobile_number
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
            {checkoutDataFromLocal?.shipping_method === "pick_up_from_hub" ||
            checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
              ?.pending_invoice_status === "3" ? (
              <li className="block_B">
                <img
                  className="payment_image"
                  src={Devilvery_address_image_2}
                  alt=""
                />
                <p className="payment_title"> Payment Method</p>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={checkoutDataFromLocal?.payment}
                  name="radio-buttons-group"
                >
                  <div className="payment_info">
                    {checkoutDataFromLocal?.invoice_checkout_data[0]?.payment_methods?.map(
                      (item) => (
                        <div className="payment_footer_block_1">
                          <div className="footer_main">
                            <div className="footer_content">
                              <FormControlLabel
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </RadioGroup>
              </li>
            ) : (
              <p></p>
            )}
          </ul>
        </div>
      </div>
      <div className="checkout_payment_section">
        {checkoutDataFromLocal?.shipping_method === "pick_up_from_hub" ||
        checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
          ?.pending_invoice_status === "3" ? (
          <div className="order_details_main">
            <div className="checkout_order_basic_info">
              <div className="checkoutorder_basic_info">
                <span className="checkoutorder_info_title">Sub-Total</span>
                <Divider orientation="vertical" />
                <span className="orderinfo_value">
                  <span className="ordertotal_symbol">
                    {/* {currency?.currency_code} */}
                    {
                      checkoutDataFromLocal?.invoice_checkout_data?.[0]
                        ?.invoice_items?.[0]?.currency
                    }
                  </span>
                  {formatToCurrency(
                    parseInt(
                      checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                        ?.subtotal
                    )
                  )}
                </span>
              </div>
              <div className="checkoutorder_basic_info">
                <span className="checkoutorder_info_title">Tax</span>
                <Divider orientation="vertical" />
                <span className="orderinfo_value">
                  <span className="ordertotal_symbol">
                    {/* {currency?.currency_code} */}
                    {
                      checkoutDataFromLocal?.invoice_checkout_data?.[0]
                        ?.invoice_items?.[0]?.currency
                    }
                  </span>
                  {formatToCurrency(
                    parseInt(
                      checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                        ?.tax
                    )
                  )}
                </span>
              </div>
              <div className="checkoutorder_basic_info">
                <span className="checkoutorder_info_title">Freight</span>
                <Divider orientation="vertical" />
                <span className="orderinfo_value">
                  <span className="ordertotal_symbol">
                    {/* {currency?.currency_code} */}
                    {
                      checkoutDataFromLocal?.invoice_checkout_data?.[0]
                        ?.invoice_items?.[0]?.currency
                    }
                  </span>{" "}
                  {formatToCurrency(
                    parseInt(
                      checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                        ?.shipping_amount
                    )
                  )}
                </span>
              </div>
              <div className="checkoutorder_basic_info">
                <span className="checkoutorder_info_title">
                  Payment Processing Charge
                </span>
                <Divider orientation="vertical" />
                <span className="orderinfo_value">
                  <span className="ordertotal_symbol">
                    {/* {currency?.currency_code} */}
                    {
                      checkoutDataFromLocal?.invoice_checkout_data?.[0]
                        ?.invoice_items?.[0]?.currency
                    }
                  </span>{" "}
                  0
                </span>
              </div>
              <div className="checkout_total_order_section">
                <span className="checkout_total_order__info_title">
                  Total Order value
                </span>
                <span className="checkout_total_order__price">
                  <span className="checkout_total_orde_symbol">
                    {currency?.currency_code}
                  </span>
                  {checkoutDataFromLocal?.shipping_method ===
                  "texub_shipping" ? (
                    <span>
                      {formatToCurrency(
                        parseInt(
                          checkoutDataFromLocal?.invoice_checkout_data[0]
                            ?.invoice?.grand_total_with_freight
                        )
                      )}
                    </span>
                  ) : (
                    <span>
                      {formatToCurrency(
                        parseInt(
                          checkoutDataFromLocal?.invoice_checkout_data[0]
                            ?.invoice?.grand_total_without_freight
                        )
                      )}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="checkout_placeorder_section">
              {checkoutDataFromLocal?.invoice_checkout_data[0]?.invoice
                ?.pending_invoice_status === "3" &&
                checkoutDataFromLocal?.shipping_method ===
                  "pick_up_from_hub" && (
                  <div className="remark_section">
                    <span className="remart_title">Remarks :</span>
                    <span className="remart_text">
                      Fwd & Pick Up / R&A International Logistics / 61/234, Hrbr
                      Layout Bangalore - 560043. Docs Needed. Provide Actual
                      Dims / Provide Copy Of The Invoice And Serials, Fwd Pick
                      Up/ R&A Internal
                    </span>
                  </div>
                )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="order_details_main">
        <div className="print_btn" id="print_btn">
          <Button
            className="button-text btn-secondary invoice_print"
            onClick={() => handleChange()}
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="30.000000pt"
              height="30.000000pt"
              viewBox="0 0 30.000000 30.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
                fill="#ffffff"
                stroke="none"
              >
                <path
                  d="M60 245 c0 -12 17 -15 90 -15 73 0 90 3 90 15 0 12 -17 15 -90 15
-73 0 -90 -3 -90 -15z"
                />
                <path
                  d="M27 204 c-4 -4 -7 -32 -7 -62 0 -45 3 -55 20 -59 13 -3 20 -14 20
-29 0 -24 2 -24 90 -24 88 0 90 0 90 24 0 15 7 26 21 29 18 5 20 12 17 64 l-3
58 -121 3 c-66 1 -123 -1 -127 -4z m193 -104 l0 -50 -70 0 -70 0 0 50 0 50 70
0 70 0 0 -50z"
                />
              </g>
            </svg>
            Print
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

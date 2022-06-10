import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import "./styles.scss";
import { Add } from "@mui/icons-material";
import { Button, Typography, Box } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { ArrowBackIosNew } from "@mui/icons-material";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  InputLabel,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link, useParams, useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import swal from "sweetalert2";
import { useStateValue } from "../../../store/state";
import PhoneInput from "react-phone-input-2";
//assets
import Edit_image from "../../../Assets/CheckoutPage/Group 913.png";
import Devilvery_address_image_1 from "../../../Assets/CheckoutPage/Group 911.png";
import Devilvery_address_image_2 from "../../../Assets/CheckoutPage/Group 912.png";
import Checkout_Texub_logo from "../../../Assets/CheckoutPage/checkout_texub_logo.png";
import Constant from "../../../Constant";
import axios from "axios";
import moment from "moment";
import { getAdminToken } from "../../../utilities";

const Checkout = () => {
  const [shipping_method, setShipping_method] = useState("texub_shipping");
  const [{ currency, geo }, dispatch] = useStateValue();

  const [mobile_number_countryCode, setMobile_number_countryCode] =
    useState("ae");
  const [buyercode, setbuyercode] = useState();
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
  const [quotedata, setqutoedata] = useState([]);
  const { quoteid } = useParams();

  const [payment, setpayment] = useState("banktransfer");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
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
  const [pickup_form_data, setpickup_form_data] = useState({
    bussiness_name: "",
    contact_person: "",
    email_address: "",
    mobile_number: "",
  });
  const [pickup_form_data_valid, setpickup_form_data_valid] = useState({
    bussiness_name: "",
    contact_person: "",
    email_address: "",
    mobile_number: "",
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

  useEffect(() => {
    const fetchCountryData = () => {
      axios
        .get(Constant.baseUrl() + "/getCountryList", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setCountryList(res?.data);
        })
        .catch((err) => {});
    };
    fetchCountryData();
  }, []);

  useEffect(() => {
    if (addressdata?.country) {
      const fetchCountryData = () => {
        let data = {
          countryCode: addressdata?.country,
        };
        axios
          .post(Constant.baseUrl() + "/stateList", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setStateList(res?.data);
          })
          .catch((err) => {});
      };
      fetchCountryData();
    }
  }, [addressdata?.country]);

  const [localgt, setlocalgt] = useState(false);
  const saveaddress = async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let stateDropDown =
      stateList?.length &&
      stateList?.filter((itm) => itm?.value == addressdata?.state);
    try {
      const addressadd = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/saveShippingAddress`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        data: {
          customerId: user?.id,
          addressId: addressdata?.id ? addressdata?.id : 0,
          addressType:
            (addressdata?.billtype === "texub_shipping" && 1) ||
            (addressdata?.billtype === undefined && 1) ||
            (addressdata?.billtype === "texub_billing" && 0),
          address: {
            company: addressdata?.organization_name,
            country_id: addressdata?.country,
            street1: addressdata?.address_line1,
            street2: addressdata?.address_line2,
            postcode: addressdata?.pincode,
            city: addressdata?.city,
            region: {
              region: stateDropDown?.[0]?.title
                ? stateDropDown?.[0]?.title
                : addressdata?.state,
              region_id: stateDropDown?.[0]?.value
                ? stateDropDown?.[0]?.value
                : "",
            },
          },
        },
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (selectadd) {
        swal.fire({
          text: "Address Updated Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        swal.fire({
          text: "Address Created Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      setlocalgt(!localgt);
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });

      console.log(e);
    }
  };

  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    try {
      const quote = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/getOrderCheckoutData`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          orderData: {
            quote_id: quoteid,
            // customerId: user?.id
          },
        },
      });
      setqutoedata(quote?.data);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  }, [quoteid, localgt]);
  const [selectadd, setselectadd] = useState();

  useEffect(() => {
    if (quotedata[0]?.invoice?.billing_address_id !== null) {
      setselectadd(quotedata[0]?.invoice?.billing_address_id);
    }
  }, [quotedata]);

  useEffect(() => {
    if (quotedata?.length) {
      let t =
        quotedata?.length &&
        quotedata?.[0]?.address_list?.filter(
          (itm) => (itm?.default_billing && itm?.default_shipping) == 1
        );
      selectaddress(t?.[0]);
    }
  }, [quotedata]);
  const selectaddress = (itm) => {
    if (quotedata[0]?.invoice?.pending_invoice_status > "3") return;
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
  const navigate = useNavigate();

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
              {quotedata[0]?.invoice?.pending_invoice_id}
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
              {formatToCurrency(parseInt(quotedata[0]?.invoice?.grand_total))}
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
                {quotedata[0]?.invoice?.pending_invoice_id}
              </span>
            </div>
            <div className="order_basic_info">
              <span className="order_basic_title">Date</span>
              <Divider orientation="vertical" />
              <span className="order_basic_value">
                {moment(quotedata[0]?.invoice?.date).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="order_basic_info">
              <span className="order_basic_title">Due Date</span>
              <Divider orientation="vertical" />
              <span className="order_basic_value">
                {moment(quotedata[0]?.invoice?.due_date).format("DD/MM/YYYY")}
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
                shipping_method === "texub_shipping" ||
                quotedata[0]?.invoice?.pending_invoice_status === "3"
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
                        defaultValue={"texub_shipping"}
                        // aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                      >
                        <FormControlLabel
                          // value={shipping_method}
                          value="pick_up_from_hub"
                          control={<Radio />}
                          label="Pick Up From The Hub"
                          onClick={() => setShipping_method("pick_up_from_hub")}
                        />
                        <FormControlLabel
                          value="texub_shipping"
                          // value={shipping_method}
                          control={
                            <Radio
                              onClick={() =>
                                setShipping_method("texub_shipping")
                              }
                            />
                          }
                          label="TEXUB Shipping"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="shipping_charges_info">
                  {quotedata[0]?.invoice?.pending_invoice_status === "2" && (
                    <div className="shipping_charges_section">
                      <span className="shipping_text">Shipping Charges :</span>
                      <span className="shipping_awit">Awaiting for Prices</span>
                    </div>
                  )}
                  {quotedata[0]?.invoice?.pending_invoice_status === "3" && (
                    <div className="shipping_charges_section">
                      <span className="shipping_text">Shipping Charges :</span>
                      <span className="shipping_price">
                        <span>{currency?.currency_code}</span>{" "}
                        {parseFloat(
                          quotedata[0]?.invoice?.shipping_amount
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="aside_block">
                {shipping_method === "texub_shipping" ? (
                  <div className="aside_block_A">
                    <div className="delivery_address_section">
                      <div className="delivery_address_list">
                        {quotedata[0]?.address_list?.map((itm) => (
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
                                <p className="item_address">{itm?.Street[0]}</p>
                                <p className="item_address">{itm?.Street[1]}</p>
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
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aside_block_A">
                    <div className="delivery_address_section pickup_hub">
                      <div className="pickup_address_section">
                        <div className="address_fields">
                          <InputLabel>Business Name</InputLabel>
                          <TextField
                            id="bussiness_name"
                            placeholder="Business Name (As Per The Trade License)"
                            className="inputfield-box"
                            name="bussiness_name"
                            variant="outlined"
                            value={pickup_form_data?.bussiness_name}
                            onChange={(e) => {
                              setpickup_form_data((prevState) => ({
                                ...prevState,
                                bussiness_name: e.target.value,
                              }));
                              setpickup_form_data_valid((prevState) => ({
                                ...prevState,
                                bussiness_name: "",
                              }));
                            }}
                          />
                          {pickup_form_data_valid?.bussiness_name && (
                            <p style={{ color: "red" }}>
                              {pickup_form_data_valid?.bussiness_name}
                            </p>
                          )}
                        </div>
                        <div className="address_fields">
                          <InputLabel>Contact Person Name</InputLabel>
                          <TextField
                            id="contact_person"
                            placeholder="Contact Person Name"
                            className="inputfield-box"
                            name="contact_person"
                            variant="outlined"
                            value={pickup_form_data?.contact_person}
                            onChange={(e) => {
                              setpickup_form_data((prevState) => ({
                                ...prevState,
                                contact_person: e.target.value,
                              }));
                              setpickup_form_data_valid((prevState) => ({
                                ...prevState,
                                contact_person: "",
                              }));
                            }}
                          />
                          {pickup_form_data_valid?.contact_person && (
                            <p style={{ color: "red" }}>
                              {pickup_form_data_valid?.contact_person}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pickup_address_section">
                        <div className="address_fields">
                          <InputLabel>E-Mail Address</InputLabel>
                          <TextField
                            id="email_address"
                            placeholder="E-Mail Address"
                            className="inputfield-box"
                            name="email_address"
                            variant="outlined"
                            value={pickup_form_data?.email_address}
                            onChange={(e) => {
                              setpickup_form_data((prevState) => ({
                                ...prevState,
                                email_address: e.target.value,
                              }));
                              setpickup_form_data_valid((prevState) => ({
                                ...prevState,
                                email_address: "",
                              }));
                            }}
                          />
                          {pickup_form_data_valid?.email_address && (
                            <p style={{ color: "red" }}>
                              {pickup_form_data_valid?.email_address}
                            </p>
                          )}
                        </div>
                        <div className="address_fields">
                          <InputLabel>Mobile Number</InputLabel>
                          <PhoneInput
                            country={mobile_number_countryCode}
                            id="mobile_number"
                            fullWidth
                            enableSearch={true}
                            countryCodeEditable={false}
                            className="inputfield-box"
                            name="mobile_number"
                            InputLabelProps={{
                              shrink: true,
                              required: true,
                            }}
                            value={pickup_form_data?.mobile_number}
                            onChange={(e) => {
                              setpickup_form_data((prevState) => ({
                                ...prevState,
                                mobile_number: e,
                              }));
                              setpickup_form_data_valid((prevState) => ({
                                ...prevState,
                                mobile_number: "",
                              }));
                            }}
                            variant="outlined"
                          />
                          {pickup_form_data_valid?.mobile_number && (
                            <p style={{ color: "red" }}>
                              {pickup_form_data_valid?.mobile_number}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
            {shipping_method === "pick_up_from_hub" ||
            quotedata[0]?.invoice?.pending_invoice_status === "3" ? (
              <li className="block_B">
                <img
                  className="payment_image"
                  src={Devilvery_address_image_2}
                  alt=""
                />
                <p className="payment_title"> Payment Method</p>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={quotedata[0]?.payment_methods[0]?.value}
                  name="radio-buttons-group"
                >
                  <div className="payment_info">
                    {quotedata[0]?.payment_methods.map((item) => (
                      <div className="payment_footer_block_1">
                        <div className="footer_main">
                          <div className="footer_content">
                            <FormControlLabel
                              value={item.value}
                              control={
                                <Radio onClick={() => setpayment(item.value)} />
                              }
                              label={item.label}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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
        {shipping_method === "pick_up_from_hub" ||
        quotedata[0]?.invoice?.pending_invoice_status === "3" ? (
          <div className="order_details_main">
            <div className="checkout_order_basic_info">
              <div className="checkoutorder_basic_info">
                <span className="checkoutorder_info_title">Sub-Total</span>
                <Divider orientation="vertical" />
                <span className="orderinfo_value">
                  <span className="ordertotal_symbol">
                    {/* {currency?.currency_code} */}
                    {quotedata?.[0]?.invoice_items?.[0]?.currency}
                  </span>
                  {formatToCurrency(parseInt(quotedata[0]?.invoice?.subtotal))}
                </span>
              </div>
              <div className="checkoutorder_basic_info">
                <span className="checkoutorder_info_title">Tax</span>
                <Divider orientation="vertical" />
                <span className="orderinfo_value">
                  <span className="ordertotal_symbol">
                    {/* {currency?.currency_code} */}
                    {quotedata?.[0]?.invoice_items?.[0]?.currency}
                  </span>
                  {formatToCurrency(parseInt(quotedata[0]?.invoice?.tax))}
                </span>
              </div>
              <div className="checkoutorder_basic_info">
                <span className="checkoutorder_info_title">Freight</span>
                <Divider orientation="vertical" />
                <span className="orderinfo_value">
                  <span className="ordertotal_symbol">
                    {/* {currency?.currency_code} */}
                    {quotedata?.[0]?.invoice_items?.[0]?.currency}
                  </span>{" "}
                  {formatToCurrency(
                    parseInt(quotedata[0]?.invoice?.shipping_amount)
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
                    {quotedata?.[0]?.invoice_items?.[0]?.currency}
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
                  {formatToCurrency(
                    parseInt(quotedata[0]?.invoice?.grand_total)
                  )}
                </span>
              </div>
            </div>
            <div className="checkout_placeorder_section">
              {quotedata[0]?.invoice?.pending_invoice_status === "3" &&
                shipping_method === "pick_up_from_hub" && (
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
        )}
      </div>
    </div>
  );
};

export default Checkout;

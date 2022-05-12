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
import { useStateValue } from "../../store/state";
import PhoneInput from "react-phone-input-2";
//assets
import Edit_image from "../../Assets/CheckoutPage/Group 913.png";
import Devilvery_address_image_1 from "../../Assets/CheckoutPage/Group 911.png";
import Devilvery_address_image_2 from "../../Assets/CheckoutPage/Group 912.png";
import Checkout_Texub_logo from "../../Assets/CheckoutPage/checkout_texub_logo.png";
import Constant from "../../Constant";
import axios from "axios";
import moment from "moment";
import { isEmailValid, getAdminToken } from "../../utilities";

function formatToCurrency(price) {
  return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
}

const Checkout = () => {
  const [shipping_method, setShipping_method] = useState("texub_shipping");
  const [open, setOpen] = useState({
    open: "",
    openClose: false,
  });
  const [buyercode, setbuyercode] = useState();
  useEffect(() => {
    let userdata = JSON.parse(localStorage.getItem("userdata"));
    userdata?.custom_attributes?.filter((ud) => {
      if (ud?.attribute_code === "customer_code") {
        setbuyercode(ud?.value);
      }
    });
  }, []);

  const handleOpen = (event) => {
    if (event === "edit_new_address") {
      setOpen({
        open: event,
        openClose: true,
      });
    } else {
      setOpen({
        open: event,
        openClose: true,
      });
      setaddressdata({});
    }
  };
  const handleClose = () =>
    setOpen({
      open: "",
      openClose: false,
    });
  const [quotedata, setqutoedata] = useState([]);
  const { quoteid } = useParams();
  const [{ currency, geo, customnostore }, dispatch] = useStateValue();
  const [pickup, setpickup] = useState({
    bussiness_name: "",
    contact_person: "",
    email_address: "",
    mobile_number: "",
  });
  const [payment, setpayment] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [formerror, setformerror] = useState({
    bussiness_name: true,
    contact_person: true,
    email_address: true,
    mobile_number: true,
  });
  //  const handleMobileChangeInput = (event) => {
  //   pickup((prevState) => ({
  //     ...prevState,
  //     mobile_number: event,
  //   }));
  //   onpickup("");
  // };
  // const onpickup = (e) => {
  //   if (e.target.name === "email_address") {
  //     if (isEmailValid(e.target.value)) {
  //       setpickup({ ...pickup, [e.target.name]: e.target.value });
  //       setformerror({ ...formerror, [e.target.name]: true });
  //     }
  //   } else {
  //     setpickup({ ...pickup, [e.target.name]: e.target.value });
  //     setformerror({ ...formerror, [e.target.name]: true });
  //   }
  // };
  const onpickup = (e) => {
    setpickup({ ...pickup, [e.target.name]: e.target.value });
    setformerror({ ...formerror, [e.target.name]: true });
  };

  console.log(payment);
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  const handleMobileChangeInput = (event) => {
    setpickup((prevState) => ({
      ...prevState,
      mobile_number: event,
    }));
    // if (event.length === 12) {
    //   setformerror({ ...formerror, mobile_number: true });
    // } else if (event.length !== 12) {
    //   setformerror({ ...formerror, mobile_number: false });
    // }
  };
  const [addressdata, setaddressdata] = useState({
    organization_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    pincode: "",
    billtype: "",
    country: "",
    lastname: "",
    firstname: "",
  });

  const addressadd = (e) => {
    debugger;
    setaddressdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const [localgt, setlocalgt] = useState(false);
  const saveaddress = async () => {
    let street = [addressdata?.address_line1, addressdata?.address_line2];
    let user = JSON.parse(localStorage.getItem("userdata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
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
          addressType: addressdata?.billtype === "texub_shipping" ? 1 : 0,
          address: {
            company: addressdata?.organization_name,
            country_id: addressdata?.country,
            street: street,
            postcode: addressdata?.pincode,
            city: addressdata?.city,
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
      seteditradio(false);
      handleClose();
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

  const [editradio, seteditradio] = useState(false);
  const editaddress = (id) => {
    let temp = quotedata[0]?.address_list?.filter(
      (al) => al?.address_id === id
    );
    setaddressdata((prev) => ({
      ...prev,
      organization_name: temp?.[0]?.company,
      address_line1: temp?.[0]?.Street[0],
      address_line2: temp?.[0]?.Street[1],
      city: temp?.[0]?.city,
      pincode: temp?.[0]?.postcode,
      country: temp?.[0]?.country_id,
      id: temp?.[0]?.address_id,
      billtype: "texub_shipping",
    }));
    debugger;
    seteditradio(true);
    handleOpen("edit_new_address");
  };

  console.log(addressdata);

  const selectaddress = (itm) => {
    if (quotedata[0]?.invoice?.pending_invoice_status !== "1") return;
    setselectadd(itm?.address_id);
    setaddressdata({
      organization_name: itm?.company,
      address_line1: itm?.Street[0],
      address_line2: itm?.Street[1],
      city: itm?.city,
      pincode: itm?.postcode,
      country: itm?.country_id,
      id: itm?.address_id,
      firstname: itm?.firstname,
      lastname: itm?.lastname,
    });
  };

  const shippingamount = async () => {
    if (
      quotedata[0]?.invoice?.pending_invoice_status === "1" &&
      shipping_method === "pick_up_from_hub"
    ) {
      if (
        !formerror?.bussiness_name ||
        !formerror?.contact_person ||
        !formerror?.email_address ||
        !formerror?.contact_person
      ) {
        return swal.fire({
          text: "Please Fill the form before creating order",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
    if (selectadd === undefined) {
      return swal.fire({
        text: "Please Select Address before requesting quote",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let storedata = JSON.parse(localStorage.getItem("storedata"));
    try {
      const getamount = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/shippingAmountRequested`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          quoteId: quoteid,
          storeId: storedata?.store_id,
          customer_address_id: selectadd,
        },
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      swal.fire({
        text: "Quote Requested Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };

  const raisequote = async () => {
    // if (
    //   quotedata[0]?.invoice?.pending_invoice_status !== "3" &&
    //   shipping_method === "pick_up_from_hub"
    // ) {
    //   if (
    //     !formerror?.bussiness_name ||
    //     !formerror?.contact_person ||
    //     !formerror?.email_address ||
    //     !formerror?.contact_person
    //   ) {
    //     return swal.fire({
    //       text: "Please Fill the form before creating order",
    //       icon: "error",
    //       showConfirmButton: false,
    //       timer: 3000,
    //     });
    //   }
    // }
    if (
      quotedata[0]?.invoice?.pending_invoice_status !== "3" &&
      shipping_method === "pick_up_from_hub"
    ) {
      if (!pickup.bussiness_name) {
        setformerror((prevState) => ({
          ...prevState,
          bussiness_name: false,
        }));
      }
      if (!pickup.contact_person) {
        setformerror((prevState) => ({
          ...prevState,
          contact_person: false,
        }));
      }
      if (!pickup.email_address) {
        setformerror((prevState) => ({
          ...prevState,
          email_address: false,
        }));
      } else if (!isEmailValid(pickup?.email_address)) {
        setformerror((prevState) => ({
          ...prevState,
          email_address: false,
        }));
      }
      if (!pickup.mobile_number) {
        setformerror((prevState) => ({
          ...prevState,
          mobile_number: false,
        }));
      } else if (pickup?.mobile_number.length < 5) {
        setformerror((prevState) => ({
          ...prevState,
          mobile_number: false,
        }));
      } else {
        setformerror((prevState) => ({
          ...prevState,
          mobile_number: true,
        }));
      }
    }
    if (shipping_method === "texub_shipping" && !selectadd) {
      return console.log(selectadd);
    }
    // return console.log(selectadd)
    let user = JSON.parse(localStorage.getItem("userdata"));
    let storedata = JSON.parse(localStorage.getItem("storedata"));
    let itemsdata = [];
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });

    var country = user?.custom_attributes?.filter(
      (itm) => itm?.attribute_code === "customer_country"
    );
    quotedata[0]?.invoice_items?.filter((qd) => {
      itemsdata.push({
        base_discount_amount: 0,
        base_original_price: qd?.price,
        base_price: qd?.price,
        base_price_incl_tax: qd?.price,
        base_row_invoiced: 0,
        base_row_total: qd?.row_total,
        base_tax_amount: 0,
        base_tax_invoiced: 0,
        discount_amount: 0,
        discount_percent: 0,
        free_shipping: 0,
        is_virtual: 0,
        name: qd?.product_name,
        original_price: qd?.price,
        price: qd?.price,
        price_incl_tax: qd?.price,
        product_id: qd?.product_id,
        product_type: "simple",
        qty_ordered: qd.qty,
        row_total: qd?.price,
        row_total_incl_tax: qd?.price,
        sku: qd?.sku,
        store_id: storedata?.store_id,
        quote_item_id: qd?.item_id,
        extension_attributes: {
          seller_id: qd?.seller_id,
          item_hub: qd?.hub_id,
          item_currency: qd?.currency_id,
        },
      });
    });
    try {
      const postquote = await axios({
        method: "post",
        url: `${Constant.baseUrl2()}/orders`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        data: {
          entity: {
            base_currency_code: currency?.currency_code,
            base_discount_amount: 0,
            base_grand_total: quotedata[0]?.invoice?.grand_total,
            base_shipping_amount: quotedata[0]?.invoice?.shipping_amount,
            base_subtotal: quotedata[0]?.invoice?.subtotal,
            base_tax_amount: quotedata?.[0]?.invoice?.tax,
            customer_email: user?.email,
            customer_firstname: addressdata?.firstname,
            customer_group_id: 5,
            customer_id: user?.id,
            customer_is_guest: 0,
            customer_lastname: addressdata?.lastname,
            customer_note_notify: 1,
            discount_amount: 0,
            email_sent: 1,
            coupon_code: "",
            discount_description: "",
            grand_total: quotedata[0]?.invoice?.grand_total,
            is_virtual: 0,
            order_currency_code: currency?.currency_code,
            shipping_amount: quotedata[0]?.invoice?.shipping_amount,
            shipping_description: "",
            state: "new",
            status: "pending",
            store_currency_code: currency?.currency_code,
            store_id: 1,
            store_name: storedata?.name,
            subtotal: quotedata[0]?.invoice?.subtotal,
            subtotal_incl_tax: quotedata?.[0]?.invoice?.subtotal_with_tax,
            tax_amount: quotedata?.[0]?.invoice?.tax,
            total_item_count: quotedata?.[0]?.invoice?.items_qty,
            total_qty_ordered: quotedata?.[0]?.invoice?.items_qty,
            weight: 0,
            quote_id: quotedata[0]?.invoice?.quote_id,
            items: itemsdata,
            billing_address: {
              address_type: "billing",
              city: addressdata?.city,
              country_id: country?.[0]?.value,
              customer_address_id:
                shipping_method === "texub_shipping" && addressdata?.id
                  ? addressdata?.id
                  : user?.default_shipping,
              email: user?.email,
              firstname: user?.firstname,
              lastname: user?.lastname,
              postcode: addressdata?.pincode,
              region: "Tamil Nadu",
              region_code: "TN",
              region_id: 563,
              street: [addressdata?.address_line1, addressdata?.address_line2],
              telephone: 123,
            },
            payment: {
              method:
                payment !== null
                  ? payment
                  : quotedata[0]?.payment_methods?.[0]?.value,
            },
            extension_attributes: {
              pending_invoice_status:
                quotedata[0]?.invoice?.pending_invoice_status,
              pending_invoice_id: quotedata[0]?.invoice?.pending_invoice_id,
              invoice_currency: currency?.currency_id,
              contact_business_name: pickup?.bussiness_name,
              contact_person_name: pickup?.contact_person,
              contact_email_address: pickup?.email_address,
              contact_phone: pickup?.mobile_number,
              shipping_assignments: [
                {
                  shipping: {
                    address: {
                      address_type: "shipping",
                      city: addressdata?.city,
                      country_id: country?.[0]?.value,
                      customer_address_id:
                        shipping_method === "texub_shipping" && addressdata?.id
                          ? addressdata?.id
                          : user?.default_shipping,
                      email: user?.email,
                      firstname: user?.firstname,
                      lastname: user?.lastname,
                      postcode: addressdata?.pincode,
                      region: "Tamil Nadu",
                      region_code: "TN",
                      region_id: 563,
                      street: [
                        addressdata?.address_line1,
                        addressadd?.address_line2,
                      ],
                      telephone: 123,
                    },
                    method:
                      quotedata[0]?.invoice?.pending_invoice_status === "3"
                        ? "flatrate_flatrate"
                        : "instore_instore",
                  },
                },
              ],
            },
          },
        },
      });
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      swal.fire({
        text: "Order Placed",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate(
        `/${customnostore ? customnostore : geo?.country_name}/ordersuccess`
      );
      setpickup({
        bussiness_name: "",
        contact_person: "",
        email_address: "",
        mobile_number: "",
      });
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      console.log(e);
    }
  };
  const navigate = useNavigate();
  let permissions = JSON.parse(localStorage.getItem("permissions"));
  let placeorder =
    permissions?.length === 0
      ? false
      : permissions?.some(
          (per) =>
            per?.value === "can-place-order" && per?.permission_value === 0
        );
  console.log(quotedata[0]?.payment_methods);

  const handleChange = () => {
    var printContents = document.getElementById("Checkout_page").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    document.body.className = "checkout_main_container";
    window.print();
    document.body.innerHTML = originalContents;
  };
  return (
    <div className="checkout_main_container" id="Checkout_page">
      <div className="checkout_info_list">
        <div className="checkout_back_toggle">
          <p
            onClick={() => navigate(-1)}
            style={{ color: "white", cursor: "pointer" }}
          >
            <ArrowBackIosNew />
          </p>
        </div>
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
        <div className="order_apply_btns">
          <div className="order_apply-btn">
            <Link
              to={`/${
                customnostore ? customnostore : geo?.country_name
              }/products`}
              style={{ textDecoration: "none" }}
            >
              <Button className="button-text btn-primary clear checkout-apply-btn">
                Continue Shopping
              </Button>
            </Link>
          </div>
          <div
            className="checkoutlist__download"
            onClick={() => handleChange()}
          >
            <svg
              id="Icon"
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 40 40"
            >
              <rect id="Area" width="40" height="40" fill="#fff" opacity="0" />
              <g id="Icon-2" data-name="Icon" transform="translate(4.5 4.5)">
                <path
                  id="Path"
                  d="M35.5,22.5v6a3.245,3.245,0,0,1-3.444,3H7.944a3.245,3.245,0,0,1-3.444-3v-6"
                  transform="translate(-4.5 -0.5)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
                <path
                  id="Path-2"
                  data-name="Path"
                  d="M10.5,15,20,22.5,29.5,15"
                  transform="translate(-4.5 -2.346)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
                <line
                  id="Line"
                  y1="18"
                  transform="translate(15.5)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />{" "}
              </g>
            </svg>
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
              <p className="delivery_address_title">Select Delivery Methods</p>

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
                          label="Texub Shipping"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="shipping_charges_info">
                  {/* {quotedata[0]?.invoice?.pending_invoice_status === '1' &&
                    <div className="shipping_charges_section">
                      <span className="shipping_text">Shipping Charges :</span>
                      <span className="shipping_price">
                        <span>INR</span> {parseFloat(quotedata[0]?.invoice?.shipping_amount).toFixed(2)}
                      </span>
                    </div>
                  } */}
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
                          <div
                            className={`delivery_address_content ${
                              selectadd === itm?.address_id && "border"
                            }`}
                            onClick={() => selectaddress(itm)}
                          >
                            <div className="billing_title">
                              {itm?.shipping_billing == 1 ? (
                                <p>Default Shipping Address</p>
                              ) : (
                                <p></p>
                              )}
                              {quotedata[0]?.invoice?.pending_invoice_status ===
                                "1" && (
                                <div
                                  className="edit_address"
                                  onClick={() => editaddress(itm?.address_id)}
                                >
                                  <img src={Edit_image} alt="" />
                                  <span>Edit</span>
                                </div>
                              )}
                            </div>

                            <p className="user_name">
                              {itm?.firstname} {itm?.lastname}
                            </p>
                            <p className="item_address">
                              {itm?.Street[0]} {itm?.Street[1]}
                            </p>
                            <span className="item_address">{itm?.city} </span>
                            <span className="item_address">
                              {itm?.country_id}{" "}
                            </span>
                            <span className="item_address">
                              {itm?.postcode}{" "}
                            </span>
                          </div>
                        ))}
                        {quotedata[0]?.invoice?.pending_invoice_status ===
                          "1" && (
                          <div
                            className={`aside_block_B delivery_address_content ${
                              quotedata[0]?.invoice?.pending_invoice_status ===
                                "1" && "add_address"
                            }`}
                          >
                            <div
                              className="delivery_address_add"
                              onClick={() => handleOpen("add_new_address")}
                            >
                              <Add className="add_icon" />
                              <span>Add New Address</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="delivery_customer_info">
                      <div className="delivery_email_info">
                        {DeliveryEmailJson?.map((itm) => (
                          <div className="delivery_email_content">
                            <div className="email_address">
                              <img src={checkout_mail} alt="" />
                              <span className="user_name">{itm?.name}</span>
                            </div>
                            <p className="item_address">{itm?.address}</p>
                          </div>
                        ))}
                      </div>
                      <div className="deliverycall_info">
                        {DeliveryCallJson?.map((itm) => (
                          <div className="delivery_call_content">
                            <div className="call_address">
                              <img src={checkout_call} alt="" />
                              <span className="user_name">{itm?.name}</span>
                            </div>
                            <p className="item_address">{itm?.address}</p>
                          </div>
                        ))}
                      </div>
                    </div> */}
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
                            value={pickup?.bussiness_name}
                            onChange={(e) => onpickup(e)}
                          />
                          {!formerror?.bussiness_name && (
                            <p style={{ color: "red" }}>
                              Please Enter your Business name
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
                            value={pickup?.contact_person}
                            onChange={(e) => onpickup(e)}
                          />
                          {!formerror?.contact_person && (
                            <p style={{ color: "red" }}>
                              Please Enter your Contact Person name
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
                            value={pickup?.email_address}
                            onChange={(e) => onpickup(e)}
                          />
                          {!formerror?.email_address && (
                            <p style={{ color: "red" }}>
                              Please Enter your Email Address
                            </p>
                          )}
                        </div>
                        <div className="address_fields">
                          <InputLabel>Mobile Number</InputLabel>
                          {/* <PhoneInput
                              country={"in"}
                              id="mobile_number"
                              fullWidth
                              label="Mobile Number"
                             className="inputfield-box"
                              name="mobile_number"
                              placeholder="Mobile number"
                              value={pickup?.mobile}
                              inputProps={{
                                label: "Mobile Number",
                                required: true,
                              }}
                             onChange={(e) => onpickup(e)}
                              variant="outlined"
                            /> */}
                          <PhoneInput
                            country={"in"}
                            id="mobile_number"
                            fullWidth
                            enableSearch={true}
                            countryCodeEditable={false}
                            className="inputfield-box"
                            name="mobile_number"
                            value={pickup?.mobile_number}
                            InputLabelProps={{
                              shrink: true,
                              required: true,
                            }}
                            onChange={(e) => handleMobileChangeInput(e)}
                            variant="outlined"
                          />

                          {/* <TextField
                            id="mobile_number"
                            placeholder="9890985433"
                            className="inputfield-box"
                            name="mobile_number"
                            variant="outlined"
                            value={pickup?.mobile}
                            onChange={(e) => onpickup(e)}
                          /> */}
                          {!formerror?.mobile_number && (
                            <p style={{ color: "red" }}>
                              Please Enter your Mobile Number
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
                <p className="payment_title">Select Payment Method</p>
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
                              label={""}
                            />
                            <p className="footer_title">
                              {item.label}
                              {/* {quotedata[0]?.payment_methods?.label} */}
                            </p>
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
                    {currency?.currency_code}
                  </span>
                  {formatToCurrency(parseInt(quotedata[0]?.invoice?.subtotal))}
                </span>
              </div>
              <div className="checkoutorder_basic_info">
                <span className="checkoutorder_info_title">Tax</span>
                <Divider orientation="vertical" />
                <span className="orderinfo_value">
                  <span className="ordertotal_symbol">
                    {currency?.currency_code}
                  </span>
                  {formatToCurrency(parseInt(quotedata[0]?.invoice?.tax))}
                </span>
              </div>
              <div className="checkoutorder_basic_info">
                <span className="checkoutorder_info_title">Freight</span>
                <Divider orientation="vertical" />
                <span className="orderinfo_value">
                  <span className="ordertotal_symbol">
                    {currency?.currency_code}
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
                    {currency?.currency_code}
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
              <div className="checkout_btns">
                {!placeorder && (
                  <Button className="placeorder_btn" onClick={raisequote}>
                    Place Your Order
                  </Button>
                )}
                <Button
                  className="placeorder_cancel_btn"
                  onClick={() => navigate(-1)}
                >
                  Go To Pending Invoice
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="order_details_main">
            <div className="texub_shipping_btns">
              <Button
                className="texub_cancel_btn"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              {/* <Button className="texub_cancel_btn">Cancel</Button> */}
              {quotedata[0]?.invoice?.pending_invoice_status === "1" && (
                <Button
                  className="texub_quote_btn btn-secondary"
                  onClick={shippingamount}
                >
                  Request Quote
                </Button>
              )}
              {quotedata[0]?.invoice?.pending_invoice_status === "2" && (
                <Button className="texub_quote_btn btn-secondary">
                  Quote Requested
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open?.openClose}
          onClose={handleClose}
          disableRestoreFocus={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="add_address_popup"
        >
          <div className="address_popup_main">
            <div className="address_popup_block">
              <Clear
                className="clear_btn address_popup_clear_btn"
                onClick={() => handleClose()}
              />
              <Box>
                <Typography
                  className="address_title"
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Add New Address
                </Typography>
                <div className="address_selection_block">
                  <div className="address_list">
                    <FormControl className="shipping_list_address">
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="billtype"
                        onChange={(e) => addressadd(e)}
                        defaultValue={"texub_shipping"}
                      >
                        <FormControlLabel
                          value="texub_billing"
                          control={<Radio />}
                          label="Billing Address"
                          disabled={editradio}
                        />
                        <FormControlLabel
                          value="texub_shipping"
                          control={<Radio />}
                          label="Shipping Address"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>

                <div className="address_field_block">
                  <div className="address_fields">
                    <InputLabel>Organization Name</InputLabel>
                    <TextField
                      id="organization_name"
                      name="organization_name"
                      placeholder="Organization Name"
                      fullWidth
                      className="inputfield-box"
                      variant="outlined"
                      onChange={(e) => addressadd(e)}
                      value={addressdata?.organization_name}
                    />
                  </div>
                  <div className="address_fields">
                    <InputLabel>Address Line 1</InputLabel>
                    <TextField
                      id="address_line1"
                      placeholder="Flat/Building/Block"
                      className="inputfield-box"
                      name="address_line1"
                      variant="outlined"
                      onChange={(e) => addressadd(e)}
                      value={addressdata?.address_line1}
                    />
                  </div>
                </div>
                <div className="address_field_block">
                  <div className="address_fields">
                    <InputLabel>Address Line 2</InputLabel>
                    <TextField
                      id="address_line2"
                      placeholder="Sub-urb/Town"
                      className="inputfield-box"
                      name="address_line2"
                      variant="outlined"
                      onChange={(e) => addressadd(e)}
                      value={addressdata?.address_line2}
                    />
                  </div>
                  <div className="address_fields">
                    <InputLabel>Pincode</InputLabel>
                    <TextField
                      id="pincode"
                      placeholder="Pincode"
                      className="inputfield-box"
                      name="pincode"
                      variant="outlined"
                      onChange={(e) => addressadd(e)}
                      value={addressdata?.pincode}
                    />
                  </div>
                </div>

                <div className="address_field_block">
                  <div className="address_fields">
                    <InputLabel>City</InputLabel>
                    <TextField
                      id="city"
                      placeholder="City"
                      className="inputfield-box"
                      name="city"
                      variant="outlined"
                      onChange={(e) => addressadd(e)}
                      value={addressdata?.city}
                    />
                  </div>
                  {/* <div className="address_fields">
                    <InputLabel id="address_field">State</InputLabel>
                    <FormControl className="address_select_field_box">
                      <Select
                        labelId="demo-simple-select-label"
                        id="selection_box_block"
                        label="state"
                        name="state"
                        placeholder="State"
                        onChange={(e) => addressadd(e)}
                        value={addressdata?.state}
                      >
                        {countryList?.map((cl) => (
                          <MenuItem value={cl?.value}>{cl?.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                   */}
                  <div className="address_fields">
                    <InputLabel id="address_field">Country</InputLabel>
                    <FormControl
                      className="address_select_field_box"
                      sx={{
                        "& .MuiOutlinedInput-root:hover": {
                          "& > fieldset": {
                            borderColor: "#DDB363",
                          },
                        },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": {
                            border: "1px solid #DDB363",
                          },
                        },
                      }}
                    >
                      <Select
                        labelId="demo-simple-select-label"
                        id="selection_box_block"
                        label="Country"
                        name="country"
                        className="inputfield-box"
                        onChange={addressadd}
                        value={addressdata?.country}
                        displayEmpty
                        renderValue={(value) =>
                          value ? value : <em>Country</em>
                        }
                      >
                        {countryList?.map((cl) => (
                          <MenuItem value={cl?.value}>{cl?.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                {/* <div className="address_field_block">
                  <div className="address_fields">
                    <InputLabel id="address_field">Country</InputLabel>
                    <FormControl className="address_select_field_box">
                      <Select
                        labelId="demo-simple-select-label"
                        id="selection_box_block"
                        label="Country"
                        name="country"
                        fullWidth
                        placeholder="Country"
                        onChange={(e) => addressadd(e)}
                        value={addressdata?.country}
                      >
                        {countryList?.map((cl) => (
                          <MenuItem value={cl?.value}>{cl?.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="empty_div"></div>
                </div> */}

                <div className="address_popup_btns">
                  <Button
                    className="address_cancel_btn"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </Button>
                  <Button className="address_save_btn" onClick={saveaddress}>
                    Save Changes
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Checkout;

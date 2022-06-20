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

const Checkout = () => {
  const [shipping_method, setShipping_method] = useState("texub_shipping");
  const [open, setOpen] = useState({
    open: "",
    openClose: false,
  });
  const [{ currency, geo, customnostore }, dispatch] = useStateValue();

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
  const handleClose = () => {
    seteditradio(false);
    setOpen({
      open: "",
      openClose: false,
    });
    setaddressvalidation({
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
  };
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

  const [addressvalidation, setaddressvalidation] = useState({
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

  const pickupFormValidation = () => {
    let errorHandle = false;
    if (shipping_method === "pick_up_from_hub") {
      if (!pickup_form_data?.bussiness_name) {
        document.getElementById("bussiness_name")?.focus();
        setpickup_form_data_valid((prevState) => ({
          ...prevState,
          bussiness_name: "Please enter the business name.",
        }));
        errorHandle = true;
      }
      if (!pickup_form_data?.contact_person) {
        document.getElementById("contact_person")?.focus();
        setpickup_form_data_valid((prevState) => ({
          ...prevState,
          contact_person: "Please enter the contact person.",
        }));
        errorHandle = true;
      }
      if (!pickup_form_data?.email_address) {
        document.getElementById("email_address")?.focus();
        setpickup_form_data_valid((prevState) => ({
          ...prevState,
          email_address: "Please enter the email.",
        }));
        errorHandle = true;
      } else if (!isEmailValid(pickup_form_data?.email_address)) {
        document.getElementById("email_address")?.focus();
        setpickup_form_data_valid((prevState) => ({
          ...prevState,
          email_address: "Please enter the valid email.",
        }));
        errorHandle = true;
      }
      if (!pickup_form_data?.mobile_number) {
        document.getElementById("mobile_number")?.focus();
        setpickup_form_data_valid((prevState) => ({
          ...prevState,
          mobile_number: "Please enter the mobile number.",
        }));
        errorHandle = true;
      }
      if (!errorHandle) {
        placeOrderApicCall();
      }
    } else if (
      quotedata[0]?.invoice?.pending_invoice_status === "3" &&
      shipping_method === "texub_shipping"
    ) {
      placeOrderApicCall();
    }
  };

  const placeOrderApicCall = async (event) => {
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
    let billing_or_shipping = quotedata[0]?.address_list?.filter(
      (itm) => itm?.address_id == quotedata[0]?.invoice?.billing_address_id
    );

    let stateDropDown =
      stateList?.length &&
      stateList?.filter((itm) => itm?.value == addressdata?.state);
    quotedata[0]?.invoice_items?.filter((qd) => {
      itemsdata.push({
        base_discount_amount: qd?.base_discount_amount,
        base_original_price: qd?.price,
        base_price: qd?.price,
        base_price_incl_tax: qd?.base_price_incl_tax,
        base_row_invoiced: 0,
        base_row_total: qd?.base_row_total,
        base_tax_amount: qd?.base_tax_amount,
        base_tax_invoiced: 0,
        discount_amount: qd?.discount_amount,
        discount_percent: qd?.discount_percent,
        free_shipping: 0,
        is_virtual: 0,
        name: qd?.product_name,
        original_price: qd?.price,
        price: qd?.price,
        price_incl_tax: qd?.price_incl_tax,
        product_id: qd?.product_id,
        product_type: "simple",
        qty_ordered: qd.qty,
        row_total: qd?.row_total,
        row_total_incl_tax: qd?.row_total_incl_tax,
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
    let grand_total =
      shipping_method === "texub_shipping"
        ? quotedata[0]?.invoice?.grand_total_with_freight
        : quotedata[0]?.invoice?.grand_total_without_freight;
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
            base_grand_total: grand_total,
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
            grand_total: grand_total,
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
                shipping_method === "texub_shipping"
                  ? billing_or_shipping?.[0]?.address_id
                  : user?.default_shipping,
              email:
                shipping_method === "texub_shipping"
                  ? billing_or_shipping?.[0]?.address_id
                  : user?.email,
              firstname:
                shipping_method === "texub_shipping"
                  ? billing_or_shipping?.[0]?.firstname
                  : user?.firstname,
              lastname:
                shipping_method === "texub_shipping"
                  ? billing_or_shipping?.[0]?.lastname
                  : user?.lastname,
              postcode:
                shipping_method === "texub_shipping"
                  ? billing_or_shipping?.[0]?.postcode
                  : addressdata?.pincode,
              region: stateDropDown?.[0]?.title
                ? stateDropDown?.[0]?.title
                : addressdata?.state,
              region_code: "",
              region_id: stateDropDown?.[0]?.value
                ? stateDropDown?.[0]?.value
                : "",
              street:
                shipping_method === "texub_shipping"
                  ? billing_or_shipping?.[0]?.Street
                  : [addressdata?.address_line1, addressdata?.address_line2],
              telephone: 123,
            },
            payment: {
              method: payment,
            },
            extension_attributes: {
              pending_invoice_status:
                quotedata[0]?.invoice?.pending_invoice_status,
              pending_invoice_id: quotedata[0]?.invoice?.pending_invoice_id,
              invoice_currency: currency?.currency_id,
              contact_business_name: pickup_form_data?.bussiness_name,
              contact_person_name: pickup_form_data?.contact_person,
              contact_email_address: pickup_form_data?.email_address,
              contact_phone: pickup_form_data?.mobile_number,
              shipping_assignments: [
                {
                  shipping: {
                    address: {
                      address_type: "shipping",
                      city: addressdata?.city,
                      country_id: country?.[0]?.value,
                      customer_address_id:
                        shipping_method === "texub_shipping"
                          ? billing_or_shipping?.[0]?.address_id
                          : user?.default_shipping,
                      email:
                        shipping_method === "texub_shipping"
                          ? billing_or_shipping?.[0]?.address_id
                          : user?.email,
                      firstname:
                        shipping_method === "texub_shipping"
                          ? billing_or_shipping?.[0]?.firstname
                          : user?.firstname,
                      lastname:
                        shipping_method === "texub_shipping"
                          ? billing_or_shipping?.[0]?.lastname
                          : user?.lastname,
                      postcode:
                        shipping_method === "texub_shipping"
                          ? billing_or_shipping?.[0]?.postcode
                          : addressdata?.pincode,
                      region: stateDropDown?.[0]?.title
                        ? stateDropDown?.[0]?.title
                        : addressdata?.state,
                      region_code: "",
                      region_id: stateDropDown?.[0]?.value
                        ? stateDropDown?.[0]?.value
                        : "",
                      street:
                        shipping_method === "texub_shipping"
                          ? billing_or_shipping?.[0]?.Street
                          : [
                              addressdata?.address_line1,
                              addressdata?.address_line2,
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
      if (payment === "banktransfer") {
        navigate(
          `/${customnostore ? customnostore : geo?.country_name}/ordersuccess/${
            postquote?.data?.entity_id
          }`
        );
      } else {
        navigate(
          `/${
            customnostore ? customnostore : geo?.country_name
          }/buyerdashboard/myorder`
        );
      }
      setpickup_form_data_valid({
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

    if (shipping_method === "texub_shipping" && !selectadd) {
      return console.log(selectadd);
    }
  };

  const addressadd = (e) => {
    setaddressdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleaddressvalidation = () => {
    let errorhandle = false;
    // if(!addressdata?.billtype) {
    //   setaddressvalidation(prevstate => ({
    //     ...prevstate,
    //     billtype: 'Please select Address Type'
    //   }))
    //   errorhandle = true
    // }
    if (!addressdata?.address_line1) {
      setaddressvalidation((prevstate) => ({
        ...prevstate,
        address_line1: "Please type Address Line 1",
      }));
      errorhandle = true;
    }
    if (!addressdata?.address_line2) {
      setaddressvalidation((prevstate) => ({
        ...prevstate,
        address_line2: "Please type Address Line 2",
      }));
      errorhandle = true;
    }
    if (!addressdata?.organization_name) {
      setaddressvalidation((prevstate) => ({
        ...prevstate,
        organization_name: "Please type Organization Name",
      }));
      errorhandle = true;
    }
    if (!addressdata?.country) {
      setaddressvalidation((prevstate) => ({
        ...prevstate,
        country: "Please select Country",
      }));
      errorhandle = true;
    }
    if (!addressdata?.pincode) {
      setaddressvalidation((prevstate) => ({
        ...prevstate,
        pincode: "Please type Pincode",
      }));
      errorhandle = true;
    }
    if (!addressdata?.city) {
      setaddressvalidation((prevstate) => ({
        ...prevstate,
        city: "Please type city name",
      }));
      errorhandle = true;
    }
    if (!errorhandle) {
      saveaddress();
    }
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
      seteditradio(false);
      handleClose();
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      seteditradio(false);
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
    let t = temp?.[0]?.state_id === 0 ? temp?.[0]?.state : temp?.[0]?.state_id;
    setaddressdata((prev) => ({
      ...prev,
      organization_name: temp?.[0]?.company,
      address_line1: temp?.[0]?.Street[0],
      address_line2: temp?.[0]?.Street[1],
      city: temp?.[0]?.city,
      pincode: temp?.[0]?.postcode,
      country: temp?.[0]?.country_id,
      id: temp?.[0]?.address_id,
      state: t,
      billtype: "texub_shipping",
    }));
    seteditradio(true);
    handleOpen("edit_new_address");
  };

  useEffect(() => {
    if (quotedata?.length) {
      let t =
        quotedata?.length &&
        quotedata?.[0]?.address_list?.filter(
          (itm) =>
            itm?.address_id === quotedata?.[0]?.invoice?.shipping_address_id
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

  const shippingamount = async () => {
    if (
      quotedata[0]?.invoice?.pending_invoice_status === "1" &&
      shipping_method === "pick_up_from_hub"
    ) {
      if (
        !pickup_form_data_valid?.bussiness_name ||
        !pickup_form_data_valid?.contact_person ||
        !pickup_form_data_valid?.email_address ||
        !pickup_form_data_valid?.contact_person
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
  const navigate = useNavigate();
  let permissions = JSON.parse(localStorage.getItem("permissions"));
  let placeorder =
    permissions?.length === 0
      ? false
      : permissions?.some(
          (per) =>
            per?.value === "can-place-order" && per?.permission_value === 0
        );
  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }
  useEffect(() => {
    localStorage.setItem(
      "invoice_checkout",
      JSON.stringify({
        shipping_method: shipping_method,
        invoice_checkout_data: quotedata,
        addressdata: addressdata,
        payment: payment,
        pickup_form_data: pickup_form_data,
      })
    );
  }, [payment, shipping_method, addressdata, quotedata, pickup_form_data]);
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
              {shipping_method === "texub_shipping" ? (
                <span>
                  {formatToCurrency(
                    parseInt(quotedata[0]?.invoice?.grand_total_with_freight)
                  )}
                </span>
              ) : (
                <span>
                  {formatToCurrency(
                    parseInt(quotedata[0]?.invoice?.grand_total_without_freight)
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
          <Link
            to={{
              pathname: `/${
                customnostore ? customnostore : geo?.country_name
              }/checkout-invoice/${quoteid}`,
            }}
            state={{ data: "test" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="checkoutlist__download">
              <svg
                id="Icon"
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 40 40"
              >
                <rect
                  id="Area"
                  width="40"
                  height="40"
                  fill="#fff"
                  opacity="0"
                />
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
          </Link>
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
                          label="TEXUB Shipping"
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
                  {quotedata[0]?.invoice?.pending_invoice_status === "2" &&
                    shipping_method === "texub_shipping" && (
                      <div className="shipping_charges_section">
                        <span className="shipping_text">
                          Shipping Charges :
                        </span>
                        <span className="shipping_awit">
                          Awaiting for Prices
                        </span>
                      </div>
                    )}
                  {quotedata[0]?.invoice?.pending_invoice_status === "3" &&
                    shipping_method === "texub_shipping" && (
                      <div className="shipping_charges_section">
                        <span className="shipping_text">
                          Shipping Charges :
                        </span>
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
                                onClick={() =>
                                  parseInt(
                                    quotedata[0]?.invoice
                                      ?.pending_invoice_status
                                  ) <= "1" && selectaddress(itm)
                                }
                              >
                                <div className="billing_title">
                                  {itm?.default_billing == 1 ? (
                                    <p>Default Shipping Address</p>
                                  ) : (
                                    <p></p>
                                  )}
                                  {quotedata[0]?.invoice
                                    ?.pending_invoice_status === "1" && (
                                    <div
                                      className="edit_address"
                                      onClick={() =>
                                        editaddress(itm?.address_id)
                                      }
                                    >
                                      <img src={Edit_image} alt="" />
                                      <span>Edit</span>
                                    </div>
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
                            // value={pickup?.bussiness_name}
                            // onChange={(e) => onpickup(e)}
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
                            // value={pickup?.contact_person}
                            // onChange={(e) => onpickup(e)}
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
                            // value={pickup?.email_address}
                            // onChange={(e) => onpickup(e)}
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
                            // value={pickup?.mobile_number}
                            InputLabelProps={{
                              shrink: true,
                              required: true,
                            }}
                            // onChange={(e) => handleMobileChangeInput(e)}
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
                  {shipping_method === "texub_shipping" ? (
                    <span>
                      {formatToCurrency(
                        parseInt(quotedata[0]?.invoice?.shipping_amount)
                      )}
                    </span>
                  ) : (
                    <span>0</span>
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
                  {shipping_method === "texub_shipping" ? (
                    <span>
                      {formatToCurrency(
                        parseInt(
                          quotedata[0]?.invoice?.grand_total_with_freight
                        )
                      )}
                    </span>
                  ) : (
                    <span>
                      {formatToCurrency(
                        parseInt(
                          quotedata[0]?.invoice?.grand_total_without_freight
                        )
                      )}
                    </span>
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
                  <Button
                    className="placeorder_btn"
                    onClick={() => pickupFormValidation()}
                  >
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
          // onClose={handleClose}
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
                    {/* {addressvalidation?.billtype ? <p style={{ color: 'red' }}>{addressvalidation?.billtype}</p> : ""} */}
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
                      onChange={(e) => {
                        addressadd(e);
                        setaddressvalidation((prevState) => ({
                          ...prevState,
                          organization_name: "",
                        }));
                      }}
                      value={addressdata?.organization_name}
                    />
                    {addressvalidation?.organization_name ? (
                      <p style={{ color: "red" }}>
                        {addressvalidation?.organization_name}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="address_fields">
                    <InputLabel>Address Line 1</InputLabel>
                    <TextField
                      id="address_line1"
                      placeholder="Flat/Building/Block"
                      className="inputfield-box"
                      name="address_line1"
                      variant="outlined"
                      onChange={(e) => {
                        addressadd(e);
                        setaddressvalidation((prevState) => ({
                          ...prevState,
                          address_line1: "",
                        }));
                      }}
                      value={addressdata?.address_line1}
                    />
                    {addressvalidation?.address_line1 ? (
                      <p style={{ color: "red" }}>
                        {addressvalidation?.address_line1}
                      </p>
                    ) : (
                      ""
                    )}
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
                      onChange={(e) => {
                        addressadd(e);
                        setaddressvalidation((prevState) => ({
                          ...prevState,
                          address_line2: "",
                        }));
                      }}
                      value={addressdata?.address_line2}
                    />
                    {addressvalidation?.address_line2 ? (
                      <p style={{ color: "red" }}>
                        {addressvalidation?.address_line2}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="address_fields">
                    <InputLabel>Pincode</InputLabel>
                    <TextField
                      id="pincode"
                      placeholder="Pincode"
                      className="inputfield-box"
                      name="pincode"
                      variant="outlined"
                      onChange={(e) => {
                        addressadd(e);
                        setaddressvalidation((prevState) => ({
                          ...prevState,
                          pincode: "",
                        }));
                      }}
                      value={addressdata?.pincode}
                    />
                    {addressvalidation?.pincode ? (
                      <p style={{ color: "red" }}>
                        {addressvalidation?.pincode}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="address_field_block">
                  <div className="address_fields check_country">
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
                        onChange={(e) => {
                          addressadd(e);
                          setaddressdata((prev) => ({
                            ...prev,
                            state: "",
                          }));
                          setaddressvalidation((prevState) => ({
                            ...prevState,
                            country: "",
                          }));
                        }}
                        value={addressdata?.country}
                        displayEmpty
                        renderValue={(value) =>
                          value ? (
                            countryList?.filter(
                              (cl) => cl?.value === value
                            )?.[0]?.label
                          ) : (
                            <em>Country</em>
                          )
                        }
                      >
                        {countryList?.map((cl) => (
                          <MenuItem value={cl?.value}>{cl?.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {addressvalidation?.country ? (
                      <p style={{ color: "red" }}>
                        {addressvalidation?.country}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>

                  {stateList?.length > 0 ? (
                    <div className="address_fields check_country">
                      <InputLabel id="address_field">State</InputLabel>
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
                          label="State"
                          name="state"
                          className="inputfield-box"
                          onChange={(e) => {
                            addressadd(e);
                            setaddressvalidation((prevState) => ({
                              ...prevState,
                              state: "",
                            }));
                          }}
                          value={addressdata?.state}
                          displayEmpty
                          renderValue={(value) =>
                            value ? (
                              stateList?.filter((cl) => cl?.value == value)?.[0]
                                ?.label
                            ) : (
                              <em>State</em>
                            )
                          }
                        >
                          {stateList?.length &&
                            stateList?.map((cl) => (
                              <MenuItem value={cl?.value}>{cl?.label}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      {addressvalidation?.state ? (
                        <p style={{ color: "red" }}>
                          {addressvalidation?.state}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div className="address_fields">
                      <InputLabel>State</InputLabel>
                      <TextField
                        id="state"
                        placeholder="State"
                        className="inputfield-box"
                        name="state"
                        variant="outlined"
                        onChange={(e) => {
                          addressadd(e);
                          setaddressvalidation((prevState) => ({
                            ...prevState,
                            state: "",
                          }));
                        }}
                        value={addressdata?.state}
                      />
                      {addressvalidation?.state ? (
                        <p style={{ color: "red" }}>
                          {addressvalidation?.state}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
                <div className="address_field_block city_row">
                  <div className="address_fields">
                    <InputLabel>City</InputLabel>
                    <TextField
                      id="city"
                      placeholder="City"
                      className="inputfield-box"
                      name="city"
                      variant="outlined"
                      onChange={(e) => {
                        addressadd(e);
                        setaddressvalidation((prevState) => ({
                          ...prevState,
                          city: "",
                        }));
                      }}
                      value={addressdata?.city}
                    />
                    {addressvalidation?.city ? (
                      <p style={{ color: "red" }}>{addressvalidation?.city}</p>
                    ) : (
                      ""
                    )}
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
                  <Button
                    className="address_save_btn"
                    onClick={handleaddressvalidation}
                  >
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

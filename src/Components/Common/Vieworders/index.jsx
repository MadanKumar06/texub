import React, { useState, useEffect } from "react";
import "./styles.scss";
import { ArrowBackIosNew } from "@mui/icons-material";
import MUITable from "../../Common/MUITable";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";
import { getAdminToken } from "../../../utilities";
import swal from "sweetalert2";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";

const options = {
  filter: false,
  filterType: "dropdown",
  responsive: "vertical",
  selectableRows: "none",
  download: false,
  print: false,
  sort: false,
  viewColumns: false,
  search: false,
};
function formatToCurrency(price) {
  return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
}

const columns = [
  {
    name: "product_name",
    label: "PRODUCT NAME",
    options: {
      customBodyRender: (value, tablemeta) => {
        let brand_image = tablemeta?.rowData[5];
        let description = tablemeta?.rowData[6];
        return (
          <div className="productname">
            <img src={brand_image} alt="" className="image"></img>
            <div className="product">
              <span className="modal_name">{value}</span>
              <span className="modal_content">{description}</span>
            </div>
          </div>
        );
      },
    },
  },
  {
    name: "sku",
    label: "SKU",
    options: {
      customBodyRender: (value) => {
        return <div className="vieworers_sky">{value}</div>;
      },
    },
  },
  {
    name: "quantity",
    label: "QUANTITY",
    options: {
      customBodyRender: (value) => {
        return <div className="vieworders_quantity">{value}</div>;
      },
    },
  },
  {
    name: "unit_price",
    label: "UNIT PRICE",
    options: {
      customBodyRender: (value) => {
        return (
          <div className="vieworders_price">
            <span className="inr">
              {" "}
              {JSON.parse(localStorage.getItem("currency"))?.currency_code}
            </span>
            <span className="price"> {formatToCurrency(parseInt(value))} </span>
          </div>
        );
      },
    },
  },
  {
    name: "order_total",
    label: "SUB-TOTAL",
    options: {
      customBodyRender: (value) => {
        return (
          <div className="vieworders_total">
            <span className="inr">
              {" "}
              {JSON.parse(localStorage.getItem("currency"))?.currency_code}
            </span>
            <span className="price">{formatToCurrency(parseInt(value))} </span>
          </div>
        );
      },
    },
  },
  {
    name: "product_brand_image",
    label: " ",
    options: {
      display: false,
    },
  },
  {
    name: "description",
    label: " ",
    options: {
      display: false,
    },
  },
];
const Index = ({ setisVieworders, setisOrders, viewDetail }) => {
  const [radiogroup, setRadioGroup] = useState(1);
  const [{}, dispatch] = useStateValue();

  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  const handleAPICall = (event) => {
    let data = {
      itemId: viewDetail?.[0]?.item_id,
      orderStatus: event,
    };
    axios
      .post(Constant.baseUrl() + "/updateSellerOrderStatus", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (res?.data?.[0]?.status) {
          swal.fire({
            text: `${res?.data?.[0]?.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          swal.fire({
            text: `${res?.data?.[0]?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        swal.fire({
          text: `${err?.response?.data?.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  return (
    <div className="vieworders_main">
      <div className="vieworders_heading_section">
        <p className="id_heading">
          Pending Invoice No. #{" "}
          <span className="id">{viewDetail?.[0]?.quote_id}</span>
        </p>
        <Button className="button-text btn-secondary">Attach Invoice</Button>
      </div>
      <MUITable
        columns={columns}
        table={viewDetail?.length ? viewDetail : ""}
        options={options}
        className="vieworders__table"
      />
      <div className="status_change_container">
        <FormControl component="fieldset" className="radio_btn_container">
          <FormLabel component="legend" className="select_text">
            Update the order status
          </FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue=""
            className="radio_group"
          >
            <FormControlLabel
              value="Confirm"
              control={<Radio color="secondary" />}
              label={
                <>
                  <p className="confirm status">Confirm</p>
                </>
              }
              labelPlacement="top"
              onClick={() => {
                setRadioGroup(1);
                handleAPICall(1);
              }}
            />
            <FormControlLabel
              value="Dispatched"
              control={<Radio color="secondary" />}
              label={
                <>
                  <p className="dispatched status">Dispatched</p>
                </>
              }
              labelPlacement="top"
              onClick={() => {
                setRadioGroup(2);
                handleAPICall(2);
              }}
            />
            <FormControlLabel
              value="Delivered"
              control={<Radio color="secondary" />}
              label={
                <>
                  <p className="delivered status">Delivered</p>
                </>
              }
              labelPlacement="top"
              onClick={() => {
                setRadioGroup(3);
                handleAPICall(3);
              }}
            />
            <FormControlLabel
              value="Cancelled"
              control={<Radio color="secondary" />}
              label={
                <>
                  <p className="cancelled status">Cancelled</p>
                </>
              }
              labelPlacement="top"
              onClick={() => {
                setRadioGroup(4);
                handleAPICall(4);
              }}
            />
          </RadioGroup>
        </FormControl>
      </div>
      {/* <div className="vieworders__detailscontainer">
        <p className="vieworders__bg"></p>
        <div className="vieworders_detail_section">
          <p className="heading">Order Details</p>
          <div className="details">
            <div className="hr_line">
              <hr></hr>
            </div>
            <div className="vieworder_address">
              <div className="address_section">
                <div className="vieworders_shippingaddress_section">
                  <div className="vieworders_shippingaddress">
                    {shippingaddress.map((item) => (
                      <li key={item.id} className="vieworders_list">
                        <span className="heading">{item.heading}</span>
                        <span className="name"> {item.name}</span>
                        <span className="address">{item.address}</span>
                      </li>
                    ))}
                  </div>
                  <div className="vieworders_payment_section">
                    <p className="payment_heading">Shipping Method</p>
                    <p className="payment_type">Flat Rate-Fixed</p>
                  </div>
                </div>
                <div className="vieworders_shippingaddress_section">
                  <div className="vieworders_shippingaddress">
                    {billingaddress.map((item) => (
                      <li key={item.id} className="vieworders_list">
                        <span className="heading">{item.heading}</span>
                        <span className="name"> {item.name}</span>
                        <span className="address">{item.address}</span>
                      </li>
                    ))}
                  </div>
                  <div className="vieworders_payment_section">
                    <p className="payment_heading">Payment Method</p>
                    <p className="payment_type">Check (Off-Line)</p>
                  </div>
                </div>
              </div>
              <div className="vieworders_total">
                {total.map((item) => (
                  <li key={item.id} className="vieworders_list">
                    <span className="total_heading"> {item.subtotal}</span>
                    <span className="total_amount">
                      <span className="currency">INR</span> {item.amount}
                    </span>
                  </li>
                ))}
                <hr className="hr"></hr>
                {totalamount.map((item) => (
                  <li key={item.id} className="vieworders_list">
                    <div className="taxes">
                      <span className="total_amount_heading">
                        {" "}
                        {item.subtotal}{" "}
                      </span>
                      <span className="gst">(incl.GST)</span>
                    </div>
                    <span className="total_amount">
                      <span className="currency">INR</span> {item.amount}
                    </span>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="invoices__footer">
        <div
          className="invoices__container"
          onClick={() => {
            setisVieworders(false);
            setisOrders(true);
          }}
        >
          <ArrowBackIosNew />
          <span>Back</span>
        </div>
      </div>
    </div>
  );
};
export default Index;

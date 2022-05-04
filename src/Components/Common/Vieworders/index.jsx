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
  StepLabel,
  Step,
  Stepper,
  Box,
} from "@mui/material";

const steps = [
  {
    label: "PO Received",
    date: "02/05/2022",
    time: "12:02:22",
  },
  {
    label: "PO Confirmed",
    date: "02/05/2022",
    time: "12:02:22",
  },
  {
    label: "PO Delivered",
    date: "02/05/2022",
    time: "12:02:22",
  },
  {
    label: "PO Dispatched",
    date: "02/05/2022",
    time: "12:02:22",
  },
];

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
    name: "eta",
    label: "ETA",
    options: {
      customBodyRender: (value) => {
        return <div className="vieworders_eta">5</div>;
      },
    },
  },
  {
    name: "quantity",
    label: "QUANTITY",
    options: {
      customBodyRender: (value) => {
        return <div className="vieworders_quantity">{parseInt(value)}</div>;
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

  // stepper
  const [activeStep, setActiveStep] = useState(1);

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
                setActiveStep(2);
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
                setActiveStep(3);
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
                setActiveStep(4);
              }}
            />
            <Button
              className="button-text btn-secondary inventory_register"
              onClick={() => handleAPICall(radiogroup)}
            >
              Submit
            </Button>
          </RadioGroup>
        </FormControl>
      </div>

      <div className="purchase_order_status">
        <div className="purchase_order_section">
          <span className="purhcase_order_title">PURCHASE ORDER STATUS</span>
        </div>
        <Box sx={{ width: "100%" }} className="purchase_status_stepper">
          <Stepper activeStep={activeStep}>
            {steps?.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>
                    <p className="stepper_label">{label?.label}</p>
                    <div className="stepper_time_date">
                      <p className="date">{label?.date}</p>
                      <p className="time"> {label?.time}</p>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </div>
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
        <Button className="button-text btn-ternary  order_cancel_btn">
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default Index;

import React, { useState, useEffect } from "react";
import "./styles.scss";
import { ArrowBackIosNew, Clear } from "@mui/icons-material";
import MUITable from "../../Common/MUITable";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";
import { getAdminToken, SessionExpiredLogout } from "../../../utilities";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import swal from "sweetalert2";
import moment from "moment";
import { Modal, Backdrop } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

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
import uploadImage from "../../../Assets/CommonImage/KYC Form/Export.png";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#DDB363",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#DDB363",
      borderTopStyle: "solid",
      opacity: "1",
    },
  },
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#DDB363",
      borderTopStyle: "dashed",
      opacity: "0.6",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const options = {
  filter: false,
  filterType: "dropdown",
  responsive: "vertical",
  selectableRows: "none",
  download: false,
  print: false,
  pagination: false,
  sort: false,
  viewColumns: false,
  search: false,
  textLabels: {
    body: {
      noMatch: (
        <div className="no_data_found">
          {/* <img src={NodataFound} alt="No data Found" /> */}
          <p>No data Found...</p>
        </div>
      ),
    },
  },
};
function formatToCurrency(price) {
  return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
}

const columns = [
  {
    name: "name",
    label: "PRODUCT NAME",
    options: {
      customBodyRender: (value, tablemeta) => {
        let brand_image = tablemeta?.rowData[8];
        let brandName = tablemeta?.rowData[11];
        console.log(brandName);
        let description = tablemeta?.rowData[9];

        return (
          <div className="productname">
            <div className="brand_image">
              {brand_image ? (
                <img src={brand_image} alt="" />
              ) : (
                <span>{brandName}</span>
              )}
            </div>
            <div className="product">
              <span className="modal_name">{value}</span>
              <div className="product_description_info">{description}</div>
            </div>
          </div>
        );
      },
    },
  },
  {
    name: "product_name",
    label: " ",
    options: {
      display: false,
      customBodyRender: (value, tablemeta) => {
        let description = tablemeta?.rowData[9];
        return <div>{description}</div>;
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
        return (
          <div className="vieworders_eta">
            {value} {value == 1 ? "Day" : "Days"}
          </div>
        );
      },
    },
  },
  {
    name: "qty",
    label: "QUANTITY",
    options: {
      customBodyRender: (value) => {
        return <div className="vieworders_quantity">{parseInt(value)}</div>;
      },
    },
  },
  {
    name: "hub",
    label: "HUB",
    options: {
      customBodyRender: (value) => {
        return <div className="vieworders_hub">{value}</div>;
      },
    },
  },
  {
    name: "price",
    label: "UNIT PRICE",
    options: {
      customBodyRender: (value, tablemeta) => {
        let currency = tablemeta?.rowData[10];
        return (
          <div className="vieworders_price">
            <span className="inr">{currency}</span>
            <span className="price"> {formatToCurrency(parseInt(value))} </span>
          </div>
        );
      },
    },
  },
  {
    name: "total",
    label: "SUB-TOTAL",
    options: {
      customBodyRender: (value, tablemeta) => {
        let currency = tablemeta?.rowData[10];
        return (
          <div className="vieworders_total">
            <span className="inr">{currency}</span>
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
  {
    name: "currency",
    label: " ",
    options: {
      display: false,
    },
  },
  {
    name: "product_brand_name",
    label: " ",
    options: {
      display: false,
    },
  },
];

const Index = () => {
  const [radiogroup, setRadioGroup] = useState(1);
  const [trigger, setTrigger] = useState(false);
  const [{}, dispatch] = useStateValue();
  const history = useLocation();
  const navigate = useNavigate();
  const viewDetailOrder = history?.state;
  const [transactionDetailOpenClose, setTransactionDetailOpenClose] =
    useState(false);

  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  //model open and close -(onclick serial number link)
  const handleOpen = () => {
    setTransactionDetailOpenClose(true);
  };
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    else {
      setTransactionDetailOpenClose(false);
    }
  };
  const ConfirmAttachment = (File, temp) => {
    swal
      .fire({
        title: "Are you sure?",
        text: `You Need to Attach ${File?.name} File!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Attach Invoice!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleAttachment(temp);
        }
      });
  };
  const handleImageChange = (event) => {
    toBase64(event.target?.files[0], event.target?.files[0]?.type);
  };
  const toBase64 = (File, type) => {
    var reader = new FileReader();
    reader.readAsDataURL(File);
    reader.onload = function () {
      if (type === "image/png") {
        let temp = reader.result?.replace("data:image/png;base64,", "png;");

        ConfirmAttachment(File, temp);
      } else if (type === "application/pdf") {
        let temp = reader.result?.replace(
          "data:application/pdf;base64,",
          "pdf;"
        );

        ConfirmAttachment(File, temp);
      } else if (type === "image/jpeg") {
        let temp = reader.result?.replace("data:image/jpeg;base64,", "jpeg;");
        ConfirmAttachment(File, temp);
      }
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const handleAttachment = (event) => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      item_id: viewDetailOrder?.[0]?.po_id,
      attachment: event,
    };
    axios
      .post(Constant.baseUrl() + "/invoiceAttachment", data, {
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
        if (err.response.status === 401) {
          SessionExpiredLogout();
        } else {
          swal.fire({
            text: `${err?.response?.data?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  };

  const handleAPICall = (event) => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      poId: viewDetailOrder?.[0]?.po_id,
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
          setTrigger(!trigger);
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
        if (err.response.status === 401) {
          SessionExpiredLogout();
        } else {
          swal.fire({
            text: `${err?.response?.data?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  };

  // stepper
  const [activeStep, setActiveStep] = useState(0);
  const [statusFromAPI, setStatusFromAPI] = useState([]);
  useEffect(() => {
    const fetchTableData = async () => {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      try {
        const tabledata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/OrderStatusLogList`,
          data: {
            itemId: viewDetailOrder?.[0]?.po_id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        setStatusFromAPI(tabledata?.data);
        if (tabledata?.data?.length) {
          let temp =
            tabledata?.data?.[3]?.status === "3"
              ? 4
              : tabledata?.data?.[2]?.status === "2"
              ? 3
              : tabledata?.data?.[1]?.status === "1"
              ? 2
              : tabledata?.data?.[0]?.status === "0"
              ? 1
              : 1;

          setActiveStep(temp);
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
    fetchTableData();
  }, [trigger]);

  const [radio_orde_rstatus, setradio_orde_rstatus] = useState("");
  const [isCancelledOrder, setisCancelledOrder] = useState("");
  const handleChange = (e) => {
    setradio_orde_rstatus(e.target.value);
  };
  useEffect(() => {
    if (activeStep === 1) {
      if (viewDetailOrder?.[0]?.po_status === "4") {
        setisCancelledOrder("cancelled");
      } else {
        setradio_orde_rstatus("");
      }
    } else if (activeStep === 2) {
      if (viewDetailOrder?.[0]?.po_status === "4") {
        setisCancelledOrder("cancelled");
      } else {
        setradio_orde_rstatus("Confirm");
      }
    } else if (activeStep === 3) {
      if (viewDetailOrder?.[0]?.po_status === "4") {
        setisCancelledOrder("cancelled");
      } else {
        setradio_orde_rstatus("Dispatched");
      }
    } else if (activeStep === 4) {
      if (viewDetailOrder?.[0]?.po_status === "4") {
        setisCancelledOrder("cancelled");
      } else {
        setradio_orde_rstatus("Delivered");
      }
    }
  }, [activeStep, viewDetailOrder]);

  const isRadioSelected = () => {
    if (activeStep === 1 && radio_orde_rstatus === "") {
      setRadioGroup(0);
      swal.fire({
        title: "Important!",
        text: "Please select the confirm",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Select",
      });
    } else {
      handleAPICall(radiogroup);
    }
  };

  return (
    <div className="vieworders_main">
      <div className="vieworders_heading_section">
        <div className="header_section">
          <p className="id_heading purchase_date">
            Purchase Order Date #{" "}
            <span className="id">
              {viewDetailOrder?.length
                ? moment(viewDetailOrder?.[0].date).format("DD/MM/YYYY")
                : ""}
              {/* {viewDetail?.[0]?.date.split(" ")[0]} */}
            </span>{" "}
            <br />
          </p>
          <p className="id_heading">
            Purchase Order No. #{" "}
            <span className="id">{viewDetailOrder?.[0]?.po_number}</span>
          </p>
        </div>
        <div className="header_section-part-2">
          {viewDetailOrder?.[0]?.transaction_amount &&
            viewDetailOrder?.[0]?.transaction_date &&
            viewDetailOrder?.[0]?.transaction_ref_number &&
            viewDetailOrder?.[0]?.transaction_remarks && (
              <Button
                className="button-text btn-secondary attach_invoice_btn"
                onClick={() => handleOpen()}
              >
                <label className="sub_media_upload_label">
                  Transaction Details
                </label>
              </Button>
            )}
          <Button className="button-text btn-secondary attach_invoice_btn">
            <label
              className="sub_media_upload_label"
              htmlFor="icon-button-file"
            >
              Attach Invoice
              <input
                accept="image/jpeg,image/png,application/pdf"
                id="icon-button-file"
                type="file"
                name="national_id_image"
                onChange={handleImageChange}
              />
              <img
                src={uploadImage}
                alt="auth"
                aria-label="upload picture"
                component="span"
              />
            </label>
          </Button>
        </div>
      </div>
      <MUITable
        columns={columns}
        table={
          viewDetailOrder?.length && viewDetailOrder?.[0]?.items?.length
            ? viewDetailOrder?.[0]?.items
            : []
        }
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
            value={radio_orde_rstatus}
            onChange={handleChange}
            className="radio_group"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 30,
              },
            }}
          >
            <FormControlLabel
              value="Confirm"
              control={
                <Radio
                  className="radio-btn-color"
                  onClick={() => {
                    setRadioGroup(1);
                  }}
                />
              }
              disabled={activeStep !== 1 || isCancelledOrder === "cancelled"}
              label={
                <>
                  <p className="confirm status">Confirm</p>
                </>
              }
              labelPlacement="top"
              /* onClick={() => {
                setRadioGroup(1);
              }} */
            />
            <FormControlLabel
              value="Dispatched"
              control={
                <Radio
                  className="radio-btn-color"
                  onClick={() => {
                    setRadioGroup(2);
                  }}
                />
              }
              disabled={activeStep !== 2 || isCancelledOrder === "cancelled"}
              label={
                <>
                  <p className="dispatched status">Dispatched</p>
                </>
              }
              labelPlacement="top"
              /* onClick={() => {
                setRadioGroup(2);
              }} */
            />
            <FormControlLabel
              value="Delivered"
              control={
                <Radio
                  className="radio-btn-color"
                  onClick={() => {
                    setRadioGroup(3);
                  }}
                />
              }
              disabled={activeStep !== 3 || isCancelledOrder === "cancelled"}
              label={
                <>
                  <p className="delivered status">Delivered</p>
                </>
              }
              labelPlacement="top"
              /* onClick={() => {
                setRadioGroup(3);
              }} */
            />
            <Button
              className="button-text btn-secondary inventory_register"
              onClick={() => {
                isRadioSelected();
              }}
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
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<QontoConnector />}
          >
            {statusFromAPI?.length &&
              statusFromAPI?.map((label, index) => {
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
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
          /* onClick={() => {
            setvieworder(false);
            handleSearchBar(true);
            // setisOrders(true);
          }} */
        >
          <ArrowBackIosNew />
          <span>Back</span>
        </div>
        {isCancelledOrder === "cancelled" ? null : (
          <Button
            className="button-text btn-ternary  order_cancel_btn"
            onClick={() => handleAPICall(4)}
          >
            Cancel Order
          </Button>
        )}
        {/*  <Button
          className="button-text btn-ternary  order_cancel_btn"
          onClick={() => handleAPICall(4)}
        >
          Cancel Order
        </Button> */}
      </div>
      {transactionDetailOpenClose && (
        <Modal
          open={transactionDetailOpenClose}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          disableRestoreFocus={true}
          BackdropProps={{
            timeout: 500,
          }}
          className="serial_number_popup"
        >
          <div className="serial_popup_main" style={{ outline: "none" }}>
            <Clear
              className="clear_btn serial_popup_clear_btn"
              onClick={() => handleClose()}
            />
            <div className="serial_popup_block">
              <p>
                <span> Transaction Amount : </span>
                {viewDetailOrder?.[0]?.transaction_amount}
              </p>
              <p>
                <span>Transaction Date : </span>
                {viewDetailOrder?.[0]?.transaction_date}
              </p>
              <p>
                <span>Transaction Ref Number : </span>
                {viewDetailOrder?.[0]?.transaction_ref_number}
              </p>
              <p>
                <span> Transaction Remarks : </span>
                {viewDetailOrder?.[0]?.transaction_remarks}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default Index;

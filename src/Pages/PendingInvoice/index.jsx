import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import PendingInvoiceTable from "./PendingInvoiceTable";
import {
  TextField,
  Autocomplete,
  FormControlLabel,
  Stack,
  Breadcrumbs,
  Typography,
  Button,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import Constant from "../../Constant";
import { useStateValue } from "../../store/state";
import pending_invoice_image from "../../Assets/PendingInvoice/Group 1051.png";

const PendingInvoice = () => {
  const [{geo}, dispatch] = useStateValue()
  const [pendingInvoiceList, setPendingInvoiceList] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    let data = {
      data: {
        customer_id: user?.id,
      },
    };
    axios
      .post(Constant.baseUrl() + "/pendingInvoiceList", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPendingInvoiceList(res?.data);
      })
      .catch((error) => {});
  }, []);
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="pending_invoice_main_container">
      <div className="pending_invoice_image_block">
        <img src={pending_invoice_image} alt="" />
        <p>Pending Invoice</p>
      </div>
      <div className="pending_invoice_breadcrumbs">
        <Stack spacing={2}>
          <Breadcrumbs separator="››" aria-label="breadcrumb">
            <Link to={`/:${geo?.country_name}`}>Home</Link>
            <Link to={`/:${geo?.country_name}/mycart`}>Cart</Link>
            <Typography key="3" color="#002D56">
              Pending Invoice
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <PendingInvoiceTable pendingInvoiceList={pendingInvoiceList} />

      {/* middle content */}
      <div className="middle_block">
        {/* summary content at left*/}
        <div className="section_left_container">
          <div className="section_left_sub_container">
            <div className="area_left_content">
              <p className="estimate">Estimated Shipping And Tax</p>
              <p className="apply_discount">Apply Discount Code</p>
            </div>
            <div className="area_right_content">
              <p className="title">
                Enter Your Destination To Get A Shipping Estimate
              </p>
              <div className="form_container">
                <div className="form_fields">
                  <label>Country</label>
                  <Autocomplete
                    value={value}
                    // onChange={(event, newValue) => {
                    //   setValue(newValue);
                    // }}
                    // inputValue={inputValue}
                    // onInputChange={(event, newInputValue) => {
                    //   setInputValue(newInputValue);
                    // }}
                    id="controllable-states-demo"
                    options={options}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Country"
                        InputLabelProps={{
                          shrink: false,
                        }}
                      />
                    )}
                  />
                </div>
                <div className="form_fields">
                  <label>State/Province</label>
                  <Autocomplete
                    value={value}
                    // onChange={(event, newValue) => {
                    //   setValue(newValue);
                    // }}
                    // inputValue={inputValue}
                    // onInputChange={(event, newInputValue) => {
                    //   setInputValue(newInputValue);
                    // }}
                    id="controllable-states-demo"
                    options={options}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Please Select A Region/State/Province"
                        InputLabelProps={{
                          shrink: false,
                        }}
                      />
                    )}
                  />
                </div>
                <div className="form_fields">
                  <label>Zip/Postal Code</label>
                  <TextField
                    id="outlined-textarea"
                    label=""
                    className="texfield_zipcode"
                    placeholder="Please Enter Zip/Postal Code"
                    InputLabelProps={{
                      shrink: false,
                    }}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="section_left_container_footer">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={"1"}
              name="radio-buttons-group"
            >
              <div className="footer_main">
                <p className="footer_title">Free Shipping</p>
                <div className="footer_content">
                  <FormControlLabel value="1" control={<Radio />} label={""} />
                  <p className="footer_sub_title">Free</p>
                  <p className="footer_value">
                    <span>INR</span> 0.00
                  </p>
                </div>
              </div>
              <div className="footer_main">
                <p className="footer_title">Flat Rate</p>
                <div className="footer_content">
                  <FormControlLabel value="2" control={<Radio />} label={""} />
                  <p className="footer_sub_title">Fixed</p>
                  <p className="footer_value">
                    <span>INR</span> 750.00
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* summary content at right */}
        <div className="section_right_container">
          <div className="section_right_sub_container">
            <div className="summary_list">
              <p className="summary_list_title">Subtotal</p>
              <p className="summary_list_value">
                <span>INR</span> 10,729,830
              </p>
            </div>
            <div className="summary_list">
              <p className="summary_list_title">Tax</p>
              <p className="summary_list_value">
                <span>INR</span> 0.00
              </p>
            </div>
            <div className="summary_list">
              <p className="summary_list_title">Order Total</p>
              <p className="summary_list_value">
                <span>INR</span> 10,729,830
              </p>
            </div>
          </div>
          <Link to={`/:${geo?.country_name}/checkout`}>
            <Button className="proceed_btn">Proceed To Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PendingInvoice;

import React, { useState, useEffect } from "react";
import "./styles.scss";

import { TextField, InputLabel, Autocomplete, Button } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import Constant from "../../../../Constant";
import { useStateValue } from "../../../../store/state";
import swal from "sweetalert2";

const WantToBuy = () => {
  const [{geo}, dispatch] = useStateValue();
  const [wantTobuyData, setWantToBuyData] = useState({
    part_number: "",
    model_name_number: "",
    product_description: "",
    quantity: "",
    notes: "",
    hub: "",
    main_category: "",
  });
  const [dropdownListFromApi, setDropdownListFromApi] = useState({
    mainCategoryList: [],
    dropDownList: [],
  });
  const [dateChange, setDateChange] = useState(new Date());
  const handleChange = (newValue) => {
    setDateChange(newValue);
  };

  // input state and onchange events
  const handleFormvalue = (event) => {
    setWantToBuyData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setInputValidation("");
  };
  // input validation on onchange
  const [inputValidation, setInputValidation] = useState({
    quantity: "",
    main_category: "",
    hub: "",
    closing_date: "",
  });

  const handleClickValidation = (event) => {
    var errorHandle = false;
    if (!wantTobuyData?.quantity) {
      document.getElementById("quantity")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        quantity: "Please enter the quantity.",
      }));
      errorHandle = true;
    }
    if (!wantTobuyData?.main_category?.label) {
      document.getElementById("main_category")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        main_category: "Please select category.",
      }));
      errorHandle = true;
    }
    if (!wantTobuyData?.hub?.hub_name) {
      document.getElementById("hub")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        hub: "Please select hub.",
      }));
      errorHandle = true;
    }
    // if (wantTobuyData?.closing_date?.toString() === "Invalid Date") {
    //   document.getElementById("closing_date")?.focus();
    //   setInputValidation((prevState) => ({
    //     ...prevState,
    //     closing_date: "Please select date.",
    //   }));
    //   errorHandle = true;
    // }
    if (!errorHandle) {
      FinalWantToBuy();
    }
  };

  //Api to fetch dropdown values
  useEffect(() => {
    const fetchMainCategoryData = () => {
      axios
        .get(Constant.baseUrl() + "/wtbMainCategoryList", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setDropdownListFromApi((prevState) => ({
            ...prevState,
            mainCategoryList: res?.data,
          }));
        })
        .catch((err) => {});
    };
    fetchMainCategoryData();
  }, []);
  //Api to fetch dropdown values
  useEffect(async () => {
    try {
      const updateproductdropdown = await axios({
        method: "get",
        url: `${Constant.baseUrl()}/getUpdateProductDetails`,
      });
      setDropdownListFromApi((prevState) => ({
        ...prevState,
        dropDownList: updateproductdropdown?.data?.[0]?.hub_list,
      }));
    } catch (e) {
      console.log(e);
    }
  }, []);
  console.log(dropdownListFromApi?.dropDownList);
  //API to Register
  const FinalWantToBuy = () => {
    let storedata = JSON.parse(localStorage.getItem('storedata'))
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let id = JSON.parse(localStorage.getItem("userdata"));
    let data = {
      data: {
        store_id: storedata?.store_id,
        buyer_id: id?.id,
        part_number: wantTobuyData?.part_number,
        model_number: wantTobuyData?.model_name_number,
        description: wantTobuyData?.product_description,
        main_category_id: wantTobuyData?.main_category?.value,
        quantity: wantTobuyData?.quantity,
        hub_id: wantTobuyData?.hub?.hub_id,
        notes: wantTobuyData?.notes,
      },
    };
    axios
      .post(Constant.baseUrl() + "/addToWtb", data, {
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

  return (
    <div className="want_to_buy__container">
      <div className="want_to_buy__sub_container">
        <div className="block_1 input_block">
          <div className="block_1_input">
            <TextField
              id="part_number"
              label="Part number"
              fullWidth
              name="part_number"
              placeholder="R7-5700U"
              InputLabelProps={{
                shrink: true,
              }}
              className="inputfield-box"
              onChange={handleFormvalue}
              value={wantTobuyData?.part_number}
              variant="outlined"
            />
          </div>
          <div className="block_1_input">
            <TextField
              id="model_name_number"
              label="Model Name/Number"
              fullWidth
              name="model_name_number"
              placeholder="Lenovo Dpin Yoga 6 Dpin"
              InputLabelProps={{
                shrink: true,
              }}
              className="inputfield-box"
              value={wantTobuyData?.model_name_number}
              onChange={handleFormvalue}
              variant="outlined"
            />
          </div>
        </div>
        <div className="block_2 input_block">
          <TextField
            id="product_description"
            label="Product Description"
            fullWidth
            multiline
            name="product_description"
            rows={5}
            placeholder="Product Description"
            className="inputfield-box"
            InputLabelProps={{
              shrink: true,
              // required: true,
              classes: {
                // asterisk: "asterisk",
              },
            }}
            value={wantTobuyData?.product_description}
            onChange={handleFormvalue}
            variant="outlined"
          />
        </div>
        <div className="block_3 input_block">
          <div className="input_field">
            <div className="block_1_input">
              <Autocomplete
                value={wantTobuyData?.main_category}
                onChange={(event, newValue) => {
                  setWantToBuyData((prevState) => ({
                    ...prevState,
                    main_category: newValue,
                  }));
                }}
                id="controllable-states-demo"
                getOptionLabel={(option) => (option.label ? option.label : "")}
                filterOptions={(options) => options}
                options={dropdownListFromApi?.mainCategoryList}
                fullWidth
                className="inputfield-box auto_complete_input"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Main Category"
                    placeholder="Main Category"
                    InputLabelProps={{
                      shrink: true,
                      required: true,
                      classes: {
                        asterisk: "asterisk",
                      },
                    }}
                  />
                )}
              />
              <InputLabel className="validation_error">
                {inputValidation?.main_category}
              </InputLabel>
            </div>
            <div className="block_1_input">
              <TextField
                id="Quantity"
                label="Quantity"
                fullWidth
                name="quantity"
                placeholder="Enter Quantity"
                InputLabelProps={{
                  shrink: true,
                  required: true,
                  classes: {
                    asterisk: "asterisk",
                  },
                }}
                className="inputfield-box"
                onChange={(event) => {
                  setWantToBuyData((prevState) => ({
                    ...prevState,
                    quantity: event.target.value,
                  }));
                }}
                value={wantTobuyData?.quantity}
                variant="outlined"
              />
              <InputLabel className="validation_error">
                {inputValidation?.quantity}
              </InputLabel>
            </div>
          </div>

          <div className="input_field">
            <div className="block_1_input">
              <Autocomplete
                getOptionLabel={(option) =>
                  option?.hub_name ? option.hub_name : ""
                }
                filterOptions={(options) => options}
                options={
                  dropdownListFromApi?.dropDownList
                    ? dropdownListFromApi?.dropDownList
                    : []
                }
                onChange={(event, newValue) => {
                  setWantToBuyData((prevState) => ({
                    ...prevState,
                    hub: newValue,
                  }));
                }}
                value={wantTobuyData?.hub}
                id="controllable-states-demo"
                fullWidth
                className="inputfield-box auto_complete_input"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Hub"
                    placeholder="Select Hub"
                    InputLabelProps={{
                      shrink: true,
                      required: true,
                      classes: {
                        asterisk: "asterisk",
                      },
                    }}
                  />
                )}
              />
              <InputLabel className="validation_error">
                {inputValidation?.hub}
              </InputLabel>
            </div>
            {/* <div className="block_1_input">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Closing Date"
                  inputFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  value={dateChange}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      className="inputfield-box"
                      placeholder="Select Closing Date"
                      InputLabelProps={{
                        shrink: true,
                        required: true,
                        classes: {
                          asterisk: "asterisk",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <InputLabel className="validation_error">
                {inputValidation?.closing_date}
              </InputLabel>
            </div> */}
          </div>
        </div>
        <div className="block_4 input_block">
          <TextField
            id="notes"
            label="Notes"
            fullWidth
            placeholder="Notes"
            multiline
            rows={5}
            className="inputfield-box"
            value={wantTobuyData?.notes}
            InputLabelProps={{
              shrink: true,
              // required: true,
              classes: {
                // asterisk: "asterisk",
              },
            }}
            onChange={handleFormvalue}
            name="notes"
            variant="outlined"
          />
        </div>
      </div>
      <div className="want_to_buy__footer">
        <div className="want_to_buy__container">
          <Link to={`/${geo?.country_name}/buyerdashboard/dashboard`}>
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          <Button
            className="want_to_buy_btn"
            onClick={() => handleClickValidation()}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WantToBuy;

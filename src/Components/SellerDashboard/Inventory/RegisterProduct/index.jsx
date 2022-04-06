import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  InputLabel,
  TextField,
  Autocomplete,
  Box,
  Button,
} from "@mui/material";
import "./styles.scss";
import axios from "axios";
import swal from "sweetalert2";
import Constant from "../../../../Constant";

function RegisterProduct() {
  const history = useNavigate();
  const [openClosePopOver, setOpenClosePopOver] = useState({
    state: false,
    message: "",
    Status: "",
  });
  const [dropdownListFromApi, setDropdownListFromApi] = useState({
    mainCategoryList: [],
    subCategoryList: [],
    brandsList: [],
    vendor_part_number: "",
    texub_product_id: "",
  });
  const [registerNewProductData, setRegisterNewProductData] = useState({
    main_category: "",
    sub_category: "",
    brands: "",
    other_brands: "",
    modal_number: "",
    description: "",
    upc_number: "",
    other_main_category: "",
    other_sub_category: "",
    vendor_manufacturer_part_number: "",
  });

  //Api to fetch dropdown values
  useEffect(() => {
    const fetchMainCategoryData = () => {
      axios
        .get(Constant.baseUrl() + "/getCategoryList", {
          headers: {
            "Content-Type": "application/json",
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
  useEffect(() => {
    if (registerNewProductData?.main_category?.value !== "mc") {
      const fetchRegionBasedCountryData = () => {
        let data = {
          category_id: registerNewProductData?.main_category?.value,
        };
        axios
          .post(Constant.baseUrl() + "/getSubCategories", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setDropdownListFromApi((prevState) => ({
              ...prevState,
              subCategoryList: res?.data,
            }));
          })
          .catch((err) => {});
      };
      fetchRegionBasedCountryData();
    }
  }, [registerNewProductData?.main_category]);
  useEffect(() => {
    const fetchBrandsData = () => {
      axios
        .get(Constant.baseUrl() + "/getBrandList", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setDropdownListFromApi((prevState) => ({
            ...prevState,
            brandsList: res?.data,
          }));
        })
        .catch((err) => {});
    };
    fetchBrandsData();
  }, []);
  useEffect(() => {
    const fetchTexubProductIdData = () => {
      axios
        .get(Constant.baseUrl() + "/getTexubProductId", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setDropdownListFromApi((prevState) => ({
            ...prevState,
            texub_product_id: res?.data,
          }));
        })
        .catch((err) => {});
    };
    fetchTexubProductIdData();
  }, []);

  const handleVendorChange = (event) => {
    let data = {
      sku: event?.target.value,
    };
    setOpenClosePopOver({
      state: false,
    });
    setRegisterNewProductData((prevState) => ({
      ...prevState,
      vendor_manufacturer_part_number: event.target.value,
    }));
    axios
      .post(Constant.baseUrl() + "/validateSku", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setOpenClosePopOver({
          state: true,
          message: res?.data?.[0]?.message,
          Status: res?.data?.[0]?.status,
        });
      })
      .catch((err) => {});
  };

  const handleOnchange = (event) => {
    setRegisterNewProductData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  console.log(registerNewProductData);

  //API to Register
  const FinalRegisterNewProduct = () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    let customer_token = JSON.parse(localStorage.getItem("customer_auth"));
    debugger;
    let data = {
      product_data: {
        customer_id: user?.id,
        main_category: registerNewProductData?.main_category?.value,
        other_main_category: registerNewProductData?.other_main_category,
        sub_category: registerNewProductData?.sub_category?.value,
        other_sub_category: registerNewProductData?.other_sub_category,
        other_brand_number: "",
        name: registerNewProductData?.modal_number,
        texub_product_id: dropdownListFromApi?.texub_product_id,
        mgs_brand: registerNewProductData?.brands?.brand_id,
        hsn_code: registerNewProductData?.hsn_code,
        sku: registerNewProductData?.vendor_manufacturer_part_number,
        upc_number: registerNewProductData?.upc_number,
        description: registerNewProductData?.description,
      },
    };
    axios
      .post(Constant.baseUrl() + `/createSellerProduct`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customer_token}`,
        },
      })
      .then((res) => {
        if (res.data?.[0]?.status) {
          history("/sellerdashboard/registersuccess");
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
        swal.fire({
          text: `${error?.response?.data?.message || error.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <div className="registerproduct">
      <h1>Register New Product</h1>
      <div className="registerproducts__form">
        <div className="input_separator">
          <div className="registerproducts_inputfields">
            <InputLabel>Model Number</InputLabel>
            <TextField
              id="modal_number"
              name="modal_number"
              placeholder="3604929017"
              fullWidth
              className="inputfield-box"
              value={registerNewProductData?.modal_number}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleOnchange}
              variant="outlined"
            />
          </div>
          <div className="registerproducts_inputfields">
            <InputLabel>Texub Product ID</InputLabel>
            <TextField
              id="product_id"
              name="product_id"
              placeholder="Texub product id"
              fullWidth
              // disabled
              className="inputfield-box"
              readOnly={true}
              value={dropdownListFromApi?.texub_product_id}
              InputLabelProps={{
                shrink: false,
              }}
              variant="outlined"
            />
          </div>
        </div>
        <div className="input_separator">
          <div className="registerproducts_inputfields">
            <InputLabel>Main Category</InputLabel>
            <Autocomplete
              value={registerNewProductData?.main_category}
              name="main_category"
              onChange={(event, newValue) => {
                setRegisterNewProductData((prevState) => ({
                  ...prevState,
                  main_category: newValue,
                }));
              }}
              id="controllable-states-demo"
              getOptionLabel={(option) => (option.label ? option.label : "")}
              filterOptions={(options) => options}
              options={dropdownListFromApi?.mainCategoryList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  className="inputfield-box"
                  placeholder="Select Main Category"
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              )}
            />
          </div>
          {registerNewProductData?.main_category?.value === "mc" ? (
            <div className="registerproducts_inputfields">
              <InputLabel>Other Sub Category</InputLabel>
              <TextField
                id="other_sub_category"
                name="other_sub_category"
                placeholder="Other Sub Category"
                fullWidth
                className="inputfield-box"
                value={registerNewProductData?.other_sub_category}
                InputLabelProps={{
                  shrink: false,
                }}
                variant="outlined"
              />
            </div>
          ) : (
            <div className="registerproducts_inputfields">
              <InputLabel>Sub-Category</InputLabel>
              <Autocomplete
                value={registerNewProductData?.subCategoryList}
                name="sub_category"
                onChange={(event, newValue) => {
                  setRegisterNewProductData((prevState) => ({
                    ...prevState,
                    sub_category: newValue,
                  }));
                }}
                id="controllable-states-demo"
                options={dropdownListFromApi?.subCategoryList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputfield-box"
                    placeholder="Select Sub-Catrgory"
                    fullWidth
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
            </div>
          )}
        </div>
        <div className="input_separator">
          <div className="registerproducts_inputfields">
            {registerNewProductData?.main_category?.value === "mc" && (
              <div className="registerproducts_inputfields">
                <InputLabel>Other Main Category</InputLabel>
                <TextField
                  id="other_main_category"
                  name="other_main_category"
                  placeholder="Other Main Category"
                  fullWidth
                  className="inputfield-box"
                  value={registerNewProductData?.other_main_category}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  variant="outlined"
                  onChange={handleOnchange}
                />
              </div>
            )}
          </div>
          <div className="registerproducts_inputfields">
            {registerNewProductData?.sub_category?.value === "sc" && (
              <div className="registerproducts_inputfields">
                <InputLabel>Other Sub Category</InputLabel>
                <TextField
                  id="other_sub_category"
                  name="other_sub_category"
                  placeholder="Other Sub Category"
                  fullWidth
                  className="inputfield-box"
                  value={registerNewProductData?.other_sub_category}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  variant="outlined"
                  onChange={handleOnchange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="input_separator">
          <div className="registerproducts_inputfields">
            <InputLabel>Brand</InputLabel>
            <Autocomplete
              value={registerNewProductData?.brands}
              name="brands"
              onChange={(event, newValue) => {
                setRegisterNewProductData((prevState) => ({
                  ...prevState,
                  brands: newValue,
                }));
              }}
              id="controllable-states-demo"
              options={dropdownListFromApi?.brandsList}
              getOptionLabel={(option) => (option.name ? option.name : "")}
              filterOptions={(options) => options}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="inputfield-box"
                  placeholder="Brand"
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              )}
            />
          </div>
          <div className="registerproducts_inputfields">
            <InputLabel>HSN Code</InputLabel>
            <TextField
              id="hsn_code"
              name="hsn_code"
              placeholder="22348765"
              fullWidth
              autoFocus={true}
              autoComplete="off"
              className="inputfield-box"
              value={registerNewProductData?.hsn_code}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleOnchange}
              variant="outlined"
            />
          </div>
        </div>
        <div className="input_separator">
          <div className="registerproducts_inputfields">
            <InputLabel>Vendor / Manufacturer part Number</InputLabel>
            <TextField
              id="part_number"
              name="vendor_manufacturer_part_number"
              placeholder="DE-B-0089"
              fullWidth
              className="inputfield-box"
              autoComplete="off"
              value={registerNewProductData?.vendor_manufacturer_part_number}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleVendorChange}
              variant="outlined"
            />
            {openClosePopOver?.state && (
              <p
                className={`${"popover"}${" "}${
                  openClosePopOver?.Status ? "active" : "inActive"
                }`}
              >
                {openClosePopOver?.message}
              </p>
            )}
          </div>
          <div className="registerproducts_inputfields">
            <InputLabel>UPC Number</InputLabel>
            <TextField
              id="upc_number"
              name="upc_number"
              placeholder="3604929017"
              fullWidth
              autoFocus={true}
              autoComplete="off"
              className="inputfield-box"
              value={registerNewProductData?.upc_number}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleOnchange}
              variant="outlined"
            />
          </div>
        </div>
        <div className="registerproducts_inputfields">
          <InputLabel>Description</InputLabel>
          <TextField
            id="outlined-multiline-static_2"
            fullWidth
            multiline
            value={registerNewProductData?.description}
            rows={5}
            name="description"
            onChange={handleOnchange}
            className="inputfield-box"
            InputLabelProps={{
              shrink: false,
              // required: true,
              classes: {
                // asterisk: "asterisk",
              },
            }}
            variant="outlined"
          />
        </div>
      </div>

      <div className="registerproduct__submit">
        <Link to="/sellerdashboard/inventory">
          <span className="registerproduct__back">Back</span>
        </Link>
        <Box>
          <Button
            className="button-text btn-secondary registerproduct__submitbutton"
            onClick={() => FinalRegisterNewProduct()}
          >
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default RegisterProduct;

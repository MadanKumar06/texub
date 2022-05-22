import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputLabel, TextField, Box, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import "./styles.scss";
import axios from "axios";
import swal from "sweetalert2";
import Constant from "../../../../Constant";
import { useStateValue } from "../../../../store/state";
import { isOtherBrands, isOnlySpecialCharacters } from "../../../../utilities";

function RegisterProduct() {
  const [{ geo, customnostore }, dispatch] = useStateValue();
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
    main_category: null,
    sub_category: null,
    brands: null,
    other_brands: null,
    modal_number: null,
    description: null,
    upc_number: null,
    other_main_category: null,
    other_sub_category: null,
    vendor_manufacturer_part_number: null,
  });
  const [inputValidation, setInputValidation] = useState({
    main_category: "",
    other_main_category: "",
    sub_category: "",
    other_sub_category: "",
    other_brands: "",
    brands: "",
    description: "",
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
        .get(Constant.baseUrl() + "/getBrandListRegister", {
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

  const handleClickValidation = (event) => {
    var errorHandle = false;
    if (!registerNewProductData?.main_category) {
      document.getElementById("main_category")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        main_category: "Please select the category.",
      }));
      errorHandle = true;
    }
    if (
      registerNewProductData?.main_category?.value === "mc" &&
      !registerNewProductData?.other_main_category
    ) {
      document.getElementById("other_main_category")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        other_main_category: "Please select the other main category.",
      }));
      errorHandle = true;
    }
    if (
      registerNewProductData?.main_category?.value === "mc" &&
      !registerNewProductData?.other_sub_category
    ) {
      document.getElementById("other_sub_category")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        other_sub_category: "Please select the other sub category.",
      }));
      errorHandle = true;
    }
    if (
      registerNewProductData?.main_category?.value !== "mc" &&
      !registerNewProductData?.sub_category
    ) {
      document.getElementById("sub_category")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        sub_category: "Please select the sub category.",
      }));
      errorHandle = true;
    }
    if (
      registerNewProductData?.sub_category?.value === "sc" &&
      !registerNewProductData?.other_sub_category
    ) {
      document.getElementById("other_sub_category")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        other_sub_category: "Please select the other sub category.",
      }));
      errorHandle = true;
    }
    if (!registerNewProductData?.brands) {
      document.getElementById("brands")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        brands: "Please select the brands.",
      }));
      errorHandle = true;
    } else if (
      // registerNewProductData?.brands?.value === "brand-others" &&

      registerNewProductData?.brands?.value === "other_brands" &&
      !registerNewProductData?.other_brands
    ) {
      document.getElementById("other_brands")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        other_brands: "Please enter the other brands.",
      }));
      errorHandle = true;
    } else if (
      // registerNewProductData?.brands?.value === "brand-others" &&
      registerNewProductData?.brands?.value === "other_brands" &&
      isOnlySpecialCharacters(registerNewProductData?.other_brands)
    ) {
      document.getElementById("other_brands")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        other_brands: "Only special character will not allowed.",
      }));
      errorHandle = true;
    } else if (
      ///registerNewProductData?.brands?.value === "brand-others" &&
      registerNewProductData?.brands?.value === "other_brands" &&
      // isRolesValid(registerNewProductData?.other_brands)
      isOtherBrands(registerNewProductData?.other_brands)
    ) {
      document.getElementById("other_brands")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        other_brands:
          "Please enter Alphabet or (Alphabet, Special Characters and Number)...",
      }));
      errorHandle = true;
    }
    if (!registerNewProductData?.description) {
      document.getElementById("description")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        description: "Please select the description.",
      }));
      errorHandle = true;
    }
    if (!registerNewProductData?.vendor_manufacturer_part_number) {
      document.getElementById("vendor_manufacturer_part_number")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        vendor_manufacturer_part_number:
          "Please select the vendor manufacturer part number.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      // Apicall fuction
      FinalRegisterNewProduct();
    }
  };

  const handleVendorChange = (event) => {
    let data = {
      sku: event?.target.value,
    };
    setInputValidation((prevState) => ({
      ...prevState,
      [event.target.name]: "",
    }));
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
    setInputValidation((prevState) => ({
      ...prevState,
      [event.target.name]: "",
    }));
  };

  //API to Register
  const FinalRegisterNewProduct = () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let data = {
      product_data: {
        bulkupload: 0,
        customer_id: user?.id,
        main_category: registerNewProductData?.main_category?.value,
        other_main_category: registerNewProductData?.other_main_category,
        sub_category: registerNewProductData?.sub_category?.value
          ? registerNewProductData?.sub_category?.value
          : "sc",
        other_sub_category: registerNewProductData?.other_sub_category,
        other_brand_number: registerNewProductData?.other_brands,
        name: registerNewProductData?.modal_number,
        texub_product_id: dropdownListFromApi?.texub_product_id,
        mgs_brand: registerNewProductData?.brands?.value,
        sku: registerNewProductData?.vendor_manufacturer_part_number,
        upc_number: registerNewProductData?.upc_number,
        description: registerNewProductData?.description,
      },
    };
    axios
      .post(Constant.baseUrl() + `/createSellerProduct`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data?.[0]?.status === "true") {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
          history(
            `/${
              customnostore ? customnostore : geo?.country_name
            }/sellerdashboard/registersuccess`,
            { state: "register" }
          );
        } else {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
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
            <InputLabel>
              Main Category
              <small className="asterisk">*</small>
            </InputLabel>
            <Autocomplete
              value={registerNewProductData?.main_category}
              name="main_category"
              onChange={(event, newValue) => {
                setRegisterNewProductData((prevState) => ({
                  ...prevState,
                  main_category: newValue,
                }));
                setInputValidation((prevState) => ({
                  ...prevState,
                  main_category: "",
                }));
              }}
              id="main_category"
              options={dropdownListFromApi?.mainCategoryList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  className={`inputfield-box ${
                    registerNewProductData?.main_category?.value === "mc" &&
                    "other_main_category_box"
                  }`}
                  // className="inputfield-box"
                  placeholder="Select Main Category"
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              )}
            />
            <InputLabel className="validation_error">
              {inputValidation?.main_category}
            </InputLabel>
          </div>
          {registerNewProductData?.main_category?.value !== "mc" && (
            <div className="registerproducts_inputfields">
              <InputLabel>
                Sub-Category <small className="asterisk">*</small>
              </InputLabel>
              <Autocomplete
                value={registerNewProductData?.subCategoryList}
                name="sub_category"
                onChange={(event, newValue) => {
                  setRegisterNewProductData((prevState) => ({
                    ...prevState,
                    sub_category: newValue,
                  }));
                  setInputValidation((prevState) => ({
                    ...prevState,
                    sub_category: "",
                  }));
                }}
                id="sub_category"
                options={dropdownListFromApi?.subCategoryList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputfield-box"
                    placeholder="Select Sub-Category"
                    fullWidth
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
              <InputLabel className="validation_error">
                {inputValidation?.sub_category}
              </InputLabel>
            </div>
          )}
        </div>
        <div className="input_separator">
          <div className="registerproducts_inputfields">
            {registerNewProductData?.main_category?.value === "mc" && (
              <div className="registerproducts_inputfields">
                {/* <InputLabel>
                  Other Main Category <small className="asterisk">*</small>
                </InputLabel> */}
                <TextField
                  id="other_main_category"
                  name="other_main_category"
                  placeholder="Please Specify Other Main Category"
                  fullWidth
                  className="inputfield-box"
                  value={registerNewProductData?.other_main_category}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  variant="outlined"
                  onChange={handleOnchange}
                />
                <InputLabel className="validation_error">
                  {inputValidation?.other_main_category}
                </InputLabel>
              </div>
            )}
          </div>
          <div className="registerproducts_inputfields">
            {(registerNewProductData?.sub_category?.value === "sc" ||
              registerNewProductData?.main_category?.value === "mc") && (
              <div className="registerproducts_inputfields">
                {/* <InputLabel>
                  Other Sub Category <small className="asterisk">*</small>
                </InputLabel> */}
                <TextField
                  id="other_sub_category"
                  name="other_sub_category"
                  placeholder="Please Specify Other Sub Category"
                  fullWidth
                  className="inputfield-box"
                  value={registerNewProductData?.other_sub_category}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  variant="outlined"
                  onChange={handleOnchange}
                />
                <InputLabel className="validation_error">
                  {inputValidation?.other_sub_category}
                </InputLabel>
              </div>
            )}
          </div>
        </div>
        <div className="input_separator">
          <div className="registerproducts_inputfields">
            <InputLabel>
              Brand <small className="asterisk">*</small>
            </InputLabel>
            <Autocomplete
              value={registerNewProductData?.brands}
              name="brands"
              onChange={(event, newValue) => {
                setRegisterNewProductData((prevState) => ({
                  ...prevState,
                  brands: newValue,
                }));
                setInputValidation((prevState) => ({
                  ...prevState,
                  brands: "",
                }));
              }}
              id="brands"
              options={dropdownListFromApi?.brandsList}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="inputfield-box"
                  placeholder="Select Brand"
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              )}
            />
            <InputLabel className="validation_error">
              {inputValidation?.brands}
            </InputLabel>

            {registerNewProductData?.brands?.value === "other_brand" && (
              <div className="registerproducts_inputfields">
                {/* <InputLabel>
                  Other Brands <small className="asterisk">*</small>
                </InputLabel> */}
                <TextField
                  id="other_brands"
                  name="other_brands"
                  placeholder="Please Specify Other brands"
                  fullWidth
                  className="inputfield-box"
                  value={registerNewProductData?.other_brands}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  variant="outlined"
                  onChange={handleOnchange}
                />
                <InputLabel className="validation_error">
                  {inputValidation?.other_brands}
                </InputLabel>
              </div>
            )}
          </div>
          {/* <div className="registerproducts_inputfields">
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
          </div> */}
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
        <div className="input_separator">
          <div className="registerproducts_inputfields vendor_part_number">
            <InputLabel>
              Vendor / Manufacturer part Number{" "}
              <small className="asterisk">*</small>
            </InputLabel>
            <TextField
              id="vendor_manufacturer_part_number"
              name="vendor_manufacturer_part_number"
              placeholder="DE-B-0089"     
              className="inputfield-box"
              autoComplete="off"
              fullWidth
              value={registerNewProductData?.vendor_manufacturer_part_number}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={handleVendorChange}
              variant="outlined"
            />
            <InputLabel className="validation_error">
              {inputValidation?.vendor_manufacturer_part_number}
            </InputLabel>
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
        </div>
        <div className="registerproducts_inputfields">
          <InputLabel>
            Description <small className="asterisk">*</small>
          </InputLabel>
          <TextField
            id="description"
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
          <InputLabel className="validation_error">
            {inputValidation?.description}
          </InputLabel>
        </div>
      </div>

      <div className="registerproduct__submit">
        <Link
          to={`/${
            customnostore ? customnostore : geo?.country_name
          }/sellerdashboard/inventory`}
        >
          <span className="registerproduct__back">Back</span>
        </Link>
        <Box>
          <Button
            className="button-text btn-secondary registerproduct__submitbutton"
            onClick={() => handleClickValidation()}
          >
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default RegisterProduct;

import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { InputLabel, TextField, Autocomplete, Checkbox } from "@mui/material";
import Details from "./Details";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Constant from "../../../../Constant";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Index({ type, pid }) {
  const [count, setcount] = useState([
    {
      count: 0,
      assign_id: "",
      currency_id: "",
      eta: "",
      hub_id: "",
      in_stock: "",
      moq: "",
      mp_id: "",
      price: "",
      igst: "",
      cgst: "",
      sgst: "",
    },
  ]);
  const [olddata, setolddata] = useState([]);
  const [eventcheck, seteventcheck] = useState(false);
  const [test, settest] = useState([]);
  const [updateProductList, setUpdateProductList] = useState({
    width: "",
    conditions: "",
    warranty: "",
    packing: "",
    restrictions: [],
    warcountry: [],
    restricts_country: [],
    resregion: [],
  });

  const [country, setcountry] = useState([]);
  const [restricts_country, setRestricts_country] = useState([]);
  const { navigate } = useNavigate();
  const { id } = useParams();
  const [dummyState, setDummyState] = useState(1);
  const countincrease = () => {
    setDummyState(dummyState + 1);
    setcount((data) => [
      ...data,
      {
        assign_id: "",
        currency_id: "",
        eta: "",
        hub_id: "",
        in_stock: "",
        moq: "",
        mp_id: "",
        price: "",
        igst: "",
        cgst: "",
        sgst: "",
        count: dummyState,
      },
    ]);
  };

  const [inputValidation, setInputValidation] = useState({
    conditions: "",
    warranty: "",
    warranty_days: "",
    resregion: "",
    rescountry: "",
    packing_details: "",
    dimension: "",
    restrictions: "",
    notes: "",
  });
  const handleClickValidation = (event) => {
    var errorHandle = false;
    if (!updateProductList?.conditions) {
      document.getElementById("conditions")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        conditions: "Please select the conditions.",
      }));
      errorHandle = true;
    }
    if (!updateProductList?.warranty) {
      document.getElementById("warranty")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        warranty: "Please select the warranty type.",
      }));
      errorHandle = true;
    }
    if (!updateform?.warranty_days) {
      document.getElementById("warranty_days")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        warranty_days: "Please select the warranty days.",
      }));
      errorHandle = true;
    }
    if (!updateProductList?.packing) {
      document.getElementById("packing")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        packing: "Please select the packing details.",
      }));
      errorHandle = true;
    }
    if (!updateProductList?.restrictions) {
      document.getElementById("restrictions")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        restrictions: "Please select the restrictions.",
      }));
      errorHandle = true;
    }
    // if (
    //   !updateform?.product_length ||
    //   !updateform?.heigth ||
    //   !updateform?.width ||
    //   !updateform?.weight
    // ) {
    //   document.getElementById("dimension")?.focus();
    //   setInputValidation((prevState) => ({
    //     ...prevState,
    //     dimension: "Please select the dimension.",
    //   }));
    //   errorHandle = true;
    // }
    if (!updateform?.notes) {
      document.getElementById("notes")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        notes: "Please select the notes.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      // Apicall fuction
      updateProduct();
    }
  };

  console.log(updateProductList);
  useEffect(() => {
    if (type !== "Update New Product Details") return;
    const data = async () => {
      const user = JSON.parse(localStorage.getItem("userdata"));
      try {
        const formdata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/getEditFormData`,
          data: {
            product_id: id,
            seller_id: user?.id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setolddata(formdata?.data[0]);
        let temp = formdata?.data[0]?.sub_products?.map((itm, ind) => ({
          ...itm,
          count: ind,
        }));
        setcount(temp);
      } catch (e) {
        console.log(e);
      }
    };
    data();
  }, [id, eventcheck]);

  useEffect(() => {
    if (olddata.length === 0) return;
    let temp = [];
    olddata.warranty_country?.length &&
      olddata.warranty_country.filter((wc) =>
        country.filter((c) => {
          if (wc === c.value) {
            temp.push(c);
          }
        })
      );
    updateProductList.warcountry = temp;
    updateProductList.restrictions = olddata?.restrictions;
  }, [olddata]);

  useEffect(() => {
    if (olddata.length === 0) return;
    let temp = [];
    olddata.restricted_region?.length &&
      olddata.restricted_region.filter((wc) =>
        region.filter((c) => {
          if (wc === c.region_id) {
            temp.push(c);
          }
        })
      );
    updateProductList.resregion = temp;
  }, [olddata]);

  useEffect(() => {
    if (restricts_country.length === 0) return;
    let temp = [];
    olddata.restricted_country?.length &&
      olddata.restricted_country.filter((wc) =>
        restricts_country?.filter((c) => {
          if (wc === c.value) {
            temp.push(c);
          }
        })
      );
    updateProductList.restricts_country = temp;
  }, [restricts_country]);

  useEffect(() => {
    // if(isMounted) {
    setupdateform((prevState) => ({
      ...prevState,
      width: olddata?.width,
      height: olddata?.height,
      product_length: olddata?.product_length,
      weight: olddata?.weight,
      warranty_days: olddata?.warranty_days,
    }));
    dropdownListFromApi?.dropDownList?.condition_list?.filter(
      (d) =>
        d.value === olddata?.product_condition &&
        setUpdateProductList((prevState) => ({
          ...prevState,
          conditions: d,
        }))
    );

    dropdownListFromApi?.dropDownList?.warranty_type?.filter(
      (d) =>
        d.value === olddata?.warranty_type &&
        setUpdateProductList((prevState) => ({
          ...prevState,
          warranty: d,
        }))
    );
    dropdownListFromApi?.dropDownList?.packing_details?.filter(
      (d) =>
        d.value === olddata?.packing_details &&
        setUpdateProductList((prevState) => ({
          ...prevState,
          packing: d,
        }))
    );
    region?.length &&
      region?.filter(
        (d) =>
          d.region_id === olddata?.restricted_region &&
          setUpdateProductList((prevState) => ({
            ...prevState,
            resregion: d,
          }))
      );
    restrictvalue?.filter(
      (d) =>
        d.value === olddata?.restrictions &&
        setUpdateProductList((prevState) => ({
          ...prevState,
          restrictions: d,
        }))
    );

    country?.filter(
      (d) =>
        d.value === olddata?.warranty_country &&
        setUpdateProductList((prevState) => ({
          ...prevState,
          warcountry: d,
        }))
    );
    // }
  }, [olddata]);

  const [dropdownListFromApi, setDropdownListFromApi] = useState({
    dropDownList: [],
  });

  //Api to fetch dropdown values
  useEffect(async () => {
    try {
      const updateproductdropdown = await axios({
        method: "get",
        url: `${Constant.baseUrl()}/getUpdateProductDetails`,
      });
      setDropdownListFromApi((prevState) => ({
        ...prevState,
        dropDownList: Object.assign({}, ...updateproductdropdown?.data),
      }));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deleterow = async (value1, value2) => {
    try {
      const rowdelete = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/deleteProduct`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          product_id: value1,
        },
      });
      seteventcheck(!eventcheck);
    } catch (e) {
      console.log(e);
    }
    if (!value1) {
      setcount(count.filter((item, i) => i !== value2));
    }
  };

  const [hubList, setHubList] = useState();

  const [pdetails, setpdetails] = useState([]);
  const [updateform, setupdateform] = useState({
    product_length: "",
    width: "",
    height: "",
    weight: "",
    warranty_days: "",
    notes: "",
  });

  const updateProduct = async () => {
    let productdata = [];
    count.filter((data) => {
      if (data?.hub_id) {
        productdata.push(data);
      }
    });
    let restrictedcountries = updateProductList?.restricts_country?.map(
      (country) => country.value
    );
    let warrantycountries = [];
    updateProductList?.warcountry?.filter((country) =>
      warrantycountries.push(country.value)
    );
    let user = JSON.parse(localStorage.getItem("userdata"));
    let productDetailSave = productdata?.filter((itm) => !itm?.assign_id);
    let productDetailEdit = productdata?.filter((itm) => itm?.assign_id);
    if (productDetailSave?.length) {
      try {
        const updatepform = await axios({
          method: "post",
          url: `${Constant.baseUrl()}${"/saveProductPrice"}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            data: {
              bulk_upload: 0,
              customer_id: user?.id,
              product_id: id,
              product_condition: updateProductList?.conditions?.value,
              other_condition: 1,
              warranty_type: updateProductList?.warranty?.value,
              warranty_country: warrantycountries.toString(),
              warranty_days: updateform?.warranty_days,
              packing_details: updateProductList?.packing?.value,
              // no_pieces_per: updateProductList?.carton_packing,
              no_pieces_per: 125,
              width: updateform?.width,
              height: updateform?.height,
              product_length: updateform?.product_length,
              weight: updateform?.weight,
              restrictions: updateProductList?.restrictions?.value,
              restricted_region: updateProductList?.resregion?.region_id,
              restricted_country: restrictedcountries.toString(),
              description: updateform?.notes,
              product_details: productDetailSave,
            },
          },
        });
        if (type === "Add Product Details") {
          navigate("/sellerdashboard/addsuccess");
        } else {
          navigate("/sellerdashboard/updatesuccess");
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (productDetailEdit?.length) {
      try {
        const updatepform = await axios({
          method: "post",
          url: `${Constant.baseUrl()}${"/editProductPrice"}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            data: {
              bulk_upload: 0,
              customer_id: user?.id,
              product_id: id,
              product_condition: updateProductList?.conditions?.value,
              other_condition: 1,
              warranty_type: updateProductList?.warranty?.value,
              warranty_country: warrantycountries.toString(),
              warranty_days: updateform?.warranty_days,
              packing_details: updateProductList?.packing?.value,
              // no_pieces_per: updateProductList?.carton_packing,
              no_pieces_per: 125,
              width: updateform?.width,
              height: updateform?.height,
              product_length: updateform?.product_length,
              weight: updateform?.weight,
              restrictions: updateProductList?.restrictions?.value,
              restricted_region: updateProductList?.resregion?.region_id,
              restricted_country: restrictedcountries.toString(),
              description: updateform?.notes,
              product_details: productDetailEdit,
            },
          },
        });
        if (type === "Add Product Details") {
          navigate("/sellerdashboard/addsuccess");
        } else {
          navigate("/sellerdashboard/updatesuccess");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const [restrictvalue, setrestrictvalue] = useState([
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ]);

  useEffect(async () => {
    try {
      const data = await axios({
        method: "get",
        url: `${Constant.baseUrl()}/getCountryList`,
      });
      setcountry(data.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const [region, setRegion] = useState([]);
  useEffect(async () => {
    try {
      const data = await axios({
        method: "get",
        url: `${Constant.baseUrl()}/getRegionList`,
      });
      setRegion(data.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (updateProductList?.resregion) {
      let temp = updateProductList?.resregion?.map((itm) => itm?.region_id);
      async function fetchData() {
        try {
          const tabledata = await axios({
            method: "post",
            url: `${Constant.baseUrl()}/getCountryListByRegion`,
            data: {
              region_id: temp?.toString(),
            },
            headers: {
              "Content-Type": "application/json",
            },
          });
          setRestricts_country(tabledata.data);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    }
  }, [updateProductList?.resregion]);

  return (
    <div className="updateproduct">
      <h1>{type}</h1>

      <div className="updateproduct__topform">
        {count?.length > 0 &&
          count.map((data, ind) => (
            <div className="topform__details">
              <Details
                countincrease={countincrease}
                i={data.count}
                deleterow={deleterow}
                hubDropDownValues={dropdownListFromApi?.dropDownList?.hub_list}
                hubList={hubList}
                setpdetails={setpdetails}
                setcount={setcount}
                count={count}
                hubname={data?.hubname}
                currentdata={data}
                index={ind}
                settest={settest}
                inputValidation={inputValidation}
              />
            </div>
          ))}
      </div>

      <div className="updateproduct__specifications">
        <div className="updateproduct__form">
          <div className="input_separator">
            <div className="updateproduct_inputfields info ">
              <InputLabel>
                Conditions<small className="asterisk">*</small>
              </InputLabel>
              <Autocomplete
                value={updateProductList?.conditions}
                disablePortal={true}
                name="conditions"
                getOptionLabel={(option) => (option.label ? option.label : "")}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    conditions: newValue,
                  }));
                  setInputValidation((prevState) => ({
                    ...prevState,
                    conditions: "",
                  }));
                }}
                id="conditions"
                options={
                  dropdownListFromApi?.dropDownList?.condition_list
                    ? dropdownListFromApi?.dropDownList?.condition_list
                    : []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputfield-box"
                    fullWidth
                    placeholder="Select Condition"
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
              <InputLabel className="validation_error">
                {inputValidation?.conditions}
              </InputLabel>
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>
                Warranty Type<small className="asterisk">*</small>
              </InputLabel>
              <Autocomplete
                value={updateProductList?.warranty}
                name="warranty_type"
                disablePortal={true}
                getOptionLabel={(option) => (option.label ? option.label : "")}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    warranty: newValue,
                  }));
                  setInputValidation((prevState) => ({
                    ...prevState,
                    warranty: "",
                  }));
                }}
                id="warranty_type"
                options={
                  dropdownListFromApi?.dropDownList?.warranty_type
                    ? dropdownListFromApi?.dropDownList?.warranty_type
                    : []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputfield-box"
                    placeholder="Select Warranty Type"
                    fullWidth
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
              <InputLabel className="validation_error">
                {inputValidation?.warranty}
              </InputLabel>
            </div>
          </div>
          {updateProductList?.warranty?.label ===
            "Direct Vendor Warranty In Country" && (
            <div className="input_separator country_selection">
              <div className="updateproduct_inputfields ">
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={country ? country : []}
                  disableCloseOnSelect
                  value={updateProductList?.warcountry}
                  getOptionLabel={(option) =>
                    option.label ? option.label : ""
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
                  onChange={(event, newValue) => {
                    setUpdateProductList((prevState) => ({
                      ...prevState,
                      warcountry: newValue,
                    }));
                    setInputValidation((prevState) => ({
                      ...prevState,
                      warranty_country: "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Country"
                      className="inputfield-box"
                    />
                  )}
                />
              </div>
            </div>
          )}
          <div className="input_separator">
            <div className="updateproduct_inputfields info">
              <InputLabel>
                Warranty Days<small className="asterisk">*</small>
              </InputLabel>
              <TextField
                id="warranty_days"
                name="warranty_days"
                placeholder="90 Days"
                fullWidth
                autoFocus={true}
                autoComplete="off"
                className="inputfield-box"
                value={updateform?.warranty_days}
                InputLabelProps={{
                  shrink: false,
                }}
                onChange={(e) => {
                  setupdateform((prev) => ({
                    ...prev,
                    warranty_days: e.target.value,
                  }));
                  setInputValidation((prevState) => ({
                    ...prevState,
                    warranty_days: "",
                  }));
                }}
                variant="outlined"
              />
              <InputLabel className="validation_error">
                {inputValidation?.warranty_days}
              </InputLabel>
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>
                Packing Details<small className="asterisk">*</small>
              </InputLabel>
              <Autocomplete
                value={updateProductList?.packing}
                name="packing"
                disablePortal={true}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    packing: newValue,
                  }));
                  setInputValidation((prevState) => ({
                    ...prevState,
                    packing: "",
                  }));
                }}
                id="packing"
                options={
                  dropdownListFromApi?.dropDownList?.packing_details
                    ? dropdownListFromApi?.dropDownList?.packing_details
                    : []
                }
                getOptionLabel={(option) => (option.label ? option.label : "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputfield-box"
                    placeholder="Select Packing Details"
                    fullWidth
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
              <InputLabel className="validation_error">
                {inputValidation?.packing}
              </InputLabel>
              {updateProductList?.packing?.label === "Carton Packing" ? (
                <TextField
                  id="carton_packing"
                  name="carton_packing"
                  placeholder="10"
                  fullWidth
                  autoFocus={true}
                  autoComplete="off"
                  className="inputfield-box"
                  value={updateProductList?.carton_packing}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) => {
                    setUpdateProductList((prev) => ({
                      ...prev,
                      carton_packing: e.target.value,
                    }));
                  }}
                  variant="outlined"
                />
              ) : updateProductList?.packing?.label === "Pallet Packing" ? (
                <TextField
                  id="pallet_packing"
                  name="pallet_packing"
                  placeholder="10"
                  fullWidth
                  autoFocus={true}
                  autoComplete="off"
                  className="inputfield-box"
                  value={updateProductList?.pallet_packing}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) => {
                    setUpdateProductList((prev) => ({
                      ...prev,
                      pallet_packing: e.target.value,
                    }));
                  }}
                  variant="outlined"
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="input_separator">
            <div className="updateproduct_inputfields info">
              <InputLabel>
                Dimensions<small className="asterisk">*</small>
              </InputLabel>
              <div className="dimensions_input">
                <TextField
                  id="product_length"
                  name="product_length"
                  placeholder="Length"
                  fullWidth
                  autoComplete="off"
                  value={updateform?.product_length}
                  className="inputfield-box length_field"
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) => {
                    setupdateform((data) => ({
                      ...data,
                      product_length: e.target.value,
                    }));
                    setInputValidation((prevState) => ({
                      ...prevState,
                      dimension: "",
                    }));
                  }}
                  variant="outlined"
                />
                <TextField
                  id="width"
                  name="width"
                  placeholder=" Width"
                  fullWidth
                  autoComplete="off"
                  className="inputfield-box width_field"
                  value={updateform?.width}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) => {
                    setupdateform((prevState) => ({
                      ...prevState,
                      width: e.target.value,
                    }));
                    setInputValidation((prevState) => ({
                      ...prevState,
                      dimension: "",
                    }));
                  }}
                  variant="outlined"
                />
                <TextField
                  id="height"
                  name="height"
                  placeholder="Height"
                  fullWidth
                  autoComplete="off"
                  className="inputfield-box height_field"
                  value={updateform?.height}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) => {
                    setupdateform((prevState) => ({
                      ...prevState,
                      height: e.target.value,
                    }));
                    setInputValidation((prevState) => ({
                      ...prevState,
                      dimension: "",
                    }));
                  }}
                  variant="outlined"
                />
                <TextField
                  id="weight"
                  name="weight"
                  placeholder="Weight"
                  className="inputfield-box weight_field"
                  fullWidth
                  autoComplete="off"
                  value={updateform?.weight}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) => {
                    setupdateform((data) => ({
                      ...data,
                      weight: e.target.value,
                    }));
                    setInputValidation((prevState) => ({
                      ...prevState,
                      dimension: "",
                    }));
                  }}
                  variant="outlined"
                />
              </div>
              <InputLabel className="validation_error">
                {inputValidation?.dimension}
              </InputLabel>
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>
                Restrictions<small className="asterisk">*</small>
              </InputLabel>
              <Autocomplete
                value={
                  updateProductList?.restrictions
                    ? updateProductList?.restrictions
                    : ""
                }
                name="restrictions"
                disablePortal={true}
                getOptionLabel={(option) => (option.label ? option.label : "")}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    restrictions: newValue,
                  }));
                  setInputValidation((prevState) => ({
                    ...prevState,
                    restrictions: "",
                  }));
                }}
                id="restrictions"
                options={restrictvalue ? restrictvalue : []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputfield-box"
                    placeholder="Select Packing Details"
                    fullWidth
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
              <InputLabel className="validation_error">
                {inputValidation?.restrictions}
              </InputLabel>
            </div>
          </div>
          {updateProductList?.restrictions?.value === "Yes" ? (
            <div className="input_separator">
              <div className="updateproduct_inputfields info ">
                <InputLabel>
                  Region<small className="asterisk">*</small>
                </InputLabel>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={region?.length ? region : []}
                  disableCloseOnSelect
                  value={
                    updateProductList?.resregion
                      ? updateProductList?.resregion
                      : ""
                  }
                  getOptionLabel={(option) =>
                    option.region_name ? option.region_name : ""
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.region_name}
                    </li>
                  )}
                  onChange={(event, newValue) => {
                    setUpdateProductList((prevState) => ({
                      ...prevState,
                      resregion: newValue,
                    }));
                    setInputValidation((prevState) => ({
                      ...prevState,
                      resregion: "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="inputfield-box"
                      fullWidth
                      placeholder="Select Region"
                      InputLabelProps={{
                        shrink: false,
                      }}
                    />
                  )}
                />
              </div>
              <div className="updateproduct_inputfields info">
                <InputLabel>
                  Country<small className="asterisk">*</small>
                </InputLabel>

                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={restricts_country ? restricts_country : ""}
                  disableCloseOnSelect
                  value={updateProductList?.restricts_country}
                  getOptionLabel={(option) =>
                    option.label ? option.label : ""
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
                  onChange={(event, newValue) => {
                    setUpdateProductList((prevState) => ({
                      ...prevState,
                      restricts_country: newValue,
                    }));
                    setInputValidation((prevState) => ({
                      ...prevState,
                      rescountry: "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Country"
                      className="inputfield-box"
                    />
                  )}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="updateproduct_inputfields info">
            <InputLabel>
              Special Notes<small className="asterisk">*</small>
            </InputLabel>
            <TextField
              id="outlined-multiline-static_2"
              fullWidth
              multiline
              rows={5}
              className="inputfield-box"
              InputLabelProps={{
                shrink: false,
                // required: true,
                classes: {
                  // asterisk: "asterisk",
                },
              }}
              variant="outlined"
              onChange={(e) => {
                setupdateform((prevState) => ({
                  ...prevState,
                  notes: e.target.value,
                }));
                setInputValidation((prevState) => ({
                  ...prevState,
                  notes: "",
                }));
              }}
            />
            <InputLabel className="validation_error">
              {inputValidation?.notes}
            </InputLabel>
          </div>
        </div>
      </div>

      <div className="updateproduct__buttons">
        <Link to="/sellerdashboard/inventory">
          <span className="updateproduct__back">Back</span>
        </Link>
        {/* <Link
          to={`${
            type === "Add Product Details"
              ? "/sellerdashboard/updatesuccess"
              : "/sellerdashboard/addsuccess"
          }`}
        > */}
        <p
          className="updateproduct__submit"
          onClick={() => handleClickValidation()}
        >
          Submit
        </p>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Index;

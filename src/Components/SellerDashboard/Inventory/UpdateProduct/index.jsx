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
import { useStateValue } from "../../../../store/state";
import swal from "sweetalert2";
import { Co2Sharp } from "@mui/icons-material";
import { isNumber } from "../../../../utilities";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Index({ type, pid }) {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  const history = useNavigate();
  const [isGST,setisGST] = useState(0);
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
    other_condition: "",
    warranty: "",
    packing: "",
    restrictions: [],
    warcountry: [],
    restricts_country: [],
    resregion: [],
  });

  const [country, setcountry] = useState([]);
  const [restricts_country, setRestricts_country] = useState([]);
  const { id, currenttab } = useParams();
  const [dummyState, setDummyState] = useState(1);
  const [updateform, setupdateform] = useState({
    product_length: "",
    width: "",
    height: "",
    weight: "",
    warranty_days: "",
    no_pieces_per: "",
    notes: "",
  });

  const [restrictvalue, setrestrictvalue] = useState([
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ]);
  const [isDetailTabValid, setIsDetailTabValid] = useState({
    isHubValid: "",
    isPriceValid: "",
    isInStockValid: "",
    isMoqValid: "",
    isETAValid: "",
    isCGSTValid: "",
    isIGSTValid: "",
    isSGSTValid: "",
  });
  const countincrease = () => {
    const isDecimal = /^\d+\.\d{0,1000000}$/;

    if (count?.length) {
      let temp = count?.slice(-1);
      var errorHandle = false;
      if (!temp[0]?.hub_id) {
        document.getElementById("isHubValid")?.focus();
        setIsDetailTabValid((prevState) => ({
          ...prevState,
          isHubValid: "Please select the hub.",
        }));
        errorHandle = true;
      }
      if (!temp[0]?.price) {
        document.getElementById("isPriceValid")?.focus();
        setIsDetailTabValid((prevState) => ({
          ...prevState,
          isPriceValid: "Please enter the price.",
        }));
        errorHandle = true;
      } else if (!temp[0]?.currency_id) {
        document.getElementById("isPriceValid")?.focus();
        setIsDetailTabValid((prevState) => ({
          ...prevState,
          isPriceValid: "Please select the currency.",
        }));
        errorHandle = true;
      }
      if (!temp[0]?.in_stock) {
        document.getElementById("isInStockValid")?.focus();
        setIsDetailTabValid((prevState) => ({
          ...prevState,
          isInStockValid: "Please enter the instock.",
        }));
        errorHandle = true;
      }
      if (!temp[0]?.moq) {
        document.getElementById("isMoqValid")?.focus();
        setIsDetailTabValid((prevState) => ({
          ...prevState,
          isMoqValid: "Please enter the moq.",
        }));
        errorHandle = true;
      }
      if (!temp[0]?.eta) {
        document.getElementById("isETAValid")?.focus();
        setIsDetailTabValid((prevState) => ({
          ...prevState,
          isETAValid: "Please enter the eta.",
        }));
        errorHandle = true;
      } else if (isDecimal.test(temp[0]?.eta)) {
        document.getElementById("isETAValid")?.focus();
        setIsDetailTabValid((prevState) => ({
          ...prevState,
          isETAValid: "Decimal values will not allow.",
        }));
        errorHandle = true;
      }
      // GSTS
      if(isGST===2){
        if (!temp[0]?.cgst) {
          document.getElementById("isCGSTValid")?.focus();
          setIsDetailTabValid((prevState) => ({
            ...prevState,
            isCGSTValid: "Please enter the gst.",
          }));
          errorHandle = true;
        }else if(!isNumber(temp[0]?.cgst)){
          setIsDetailTabValid((prevState) => ({
            ...prevState,
            isCGSTValid: "Please enter only number.",
          }));
          errorHandle = true;
        }
        if (!temp[0]?.igst) {
          document.getElementById("isIGSTValid")?.focus();
          setIsDetailTabValid((prevState) => ({
            ...prevState,
            isIGSTValid: "Please enter the igst.",
          }));
          errorHandle = true;
        }else if(!isNumber(temp[0]?.igst)){
          setIsDetailTabValid((prevState) => ({
            ...prevState,
            isIGSTValid: "Please enter only number.",
          }));
          errorHandle = true;
        }
        if (!temp[0]?.sgst) {
          document.getElementById("isSGSTValid")?.focus();
          setIsDetailTabValid((prevState) => ({
            ...prevState,
            isSGSTValid: "Please enter the sgst.",
          }));
          errorHandle = true;
        }else if(!isNumber(temp[0]?.sgst)){
          setIsDetailTabValid((prevState) => ({
            ...prevState,
            isSGSTValid: "Please enter only number.",
          }));
          errorHandle = true;
        }
      }else{
        console.log('.......................................................')
      }

      if (!errorHandle) {
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
      }
    }
    
  };
  const [inputValidation, setInputValidation] = useState({
    conditions: "",
    other_condition: "",
    warranty: "",
    warranty_days: "",
    resregion: "",
    no_pieces_per: "",
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
    if (
      updateProductList?.conditions?.label === "Others" &&
      !updateProductList?.other_condition
    ) {
      document.getElementById("other_condition")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        other_condition: "Please enter other condition.",
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
    if (!updateform?.no_pieces_per) {
      document.getElementById("no_pieces_per")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        no_pieces_per: "Please enter the no. of piecies.",
      }));
      errorHandle = true;
    }else if (!isNumber(updateform?.no_pieces_per)) {
      document.getElementById("no_pieces_per")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        no_pieces_per: "Please enter only number.",
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
    if (
      !updateform?.product_length ||
      !updateform?.height ||
      !updateform?.width ||
      !updateform?.weight
    ) {
      document.getElementById("dimension")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        dimension: "Please select the dimension.",
      }));
      errorHandle = true;
    }
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
  useEffect(() => {
    if (type !== "Update New Product Details") return;
    const data = async () => {
      const user = JSON.parse(localStorage.getItem("userdata"));
      try {
        dispatch({
          type: "SET_IS_LOADING",
          value: true,
        });
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
    setupdateform((prevState) => ({
      ...prevState,
      width: olddata?.width,
      height: olddata?.height,
      no_pieces_per: olddata?.no_pieces_per,
      notes: olddata?.description,
      product_length: olddata?.product_length,
      weight: olddata?.weight,
      warranty_days: olddata?.warranty_days,
    }));
    setUpdateProductList((prevState) => ({
      ...prevState,
      other_condition: olddata?.other_condition,
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
  }, [olddata, country]);

  useEffect(() => {
    if (country?.length === 0) return;
    if (updateProduct?.resregion?.length === 0) return;
    country?.filter((d) => console.log(d));
  }, [restricts_country]);

  console.log(olddata);
  console.log(restricts_country);
  console.log(updateProductList?.restricts_country);

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
    let resregiondata = updateProductList?.resregion?.map((rr) => rr.region_id);
    let warrantycountries = [];
    updateProductList?.warcountry?.filter((country) =>
      warrantycountries.push(country.value)
    );
    let user = JSON.parse(localStorage.getItem("userdata"));
    let productDetailSave = productdata?.filter((itm) => !itm?.assign_id);
    let productDetailEdit = productdata?.filter((itm) => itm?.assign_id);

    if (productDetailSave?.length) {
      try {
        dispatch({
          type: "SET_IS_LOADING",
          value: true,
        });
        const updateformApi = await axios({
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
              other_condition: updateProductList?.other_condition,
              warranty_type: updateProductList?.warranty?.value,
              warranty_country: warrantycountries.toString(),
              warranty_days: updateform?.warranty_days,
              packing_details: updateProductList?.packing?.value,
              no_pieces_per: updateform?.no_pieces_per,
              width: updateform?.width,
              height: updateform?.height,
              product_length: updateform?.product_length,
              weight: updateform?.weight,
              restrictions: updateProductList?.restrictions?.value,
              restricted_region: resregiondata.toString(),
              restricted_country: restrictedcountries.toString(),
              description: updateform?.notes,
              product_details: productDetailSave,
            },
          },
        });
        // if (type === "Add Product Details") {
        //   navigate("/sellerdashboard/addsuccess");
        // } else {
        //   navigate("/sellerdashboard/updatesuccess");
        // }

        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (updateformApi?.data?.[0]?.status) {
          // swal.fire({
          //   text: `${updateformApi?.data?.[0]?.message}`,
          //   icon: "success",
          //   showConfirmButton: false,
          //   timer: 3000,
          // });
          if (currenttab === "addproduct") {
            setTimeout(() => {
              history(
                `/${
                  customnostore ? customnostore : geo?.country_name
                }/sellerdashboard/registersuccess`,
                { state: "add" }
              );
            }, 1000 / 2);
          } else if (
            currenttab !== "addproduct" &&
            !productDetailEdit?.length
          ) {
            setTimeout(() => {
              history(
                `/${
                  customnostore ? customnostore : geo?.country_name
                }/sellerdashboard/registersuccess`,
                { state: "update" }
              );
            }, 1000 / 2);
          }
        } else {
          swal.fire({
            text: `${updateformApi?.data?.[0]?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } catch (error) {
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
      }
    }
    if (productDetailEdit?.length) {
      try {
        dispatch({
          type: "SET_IS_LOADING",
          value: true,
        });
        const updateformApi = await axios({
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
              other_condition: updateProductList?.other_condition,
              warranty_type: updateProductList?.warranty?.value,
              warranty_country: warrantycountries.toString(),
              warranty_days: updateform?.warranty_days,
              packing_details: updateProductList?.packing?.value,
              // no_pieces_per: updateform?.carton_packing,
              no_pieces_per: updateform?.no_pieces_per,
              width: updateform?.width,
              height: updateform?.height,
              product_length: updateform?.product_length,
              weight: updateform?.weight,
              restrictions: updateProductList?.restrictions?.value,
              restricted_region: resregiondata.toString(),
              restricted_country: restrictedcountries.toString(),
              description: updateform?.notes,
              product_details: productDetailEdit,
            },
          },
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (updateformApi?.data?.[0]?.status) {
          // swal.fire({
          //   text: `${updateformApi?.data?.[0]?.message}`,
          //   icon: "success",
          //   showConfirmButton: false,
          //   timer: 3000,
          // });
          setTimeout(() => {
            history(
              `/${
                customnostore ? customnostore : geo?.country_name
              }/sellerdashboard/registersuccess`,
              { state: "update" }
            );
          }, 1000 / 2);
        } else {
          swal.fire({
            text: `${updateformApi?.data?.[0]?.message}`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } catch (error) {
        swal.fire({
          text: `${error?.response?.data?.message || error.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      }
    }
  };

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
  }, [restricts_country?.length > 0]);

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
                isDetailTabValid={isDetailTabValid}
                setIsDetailTabValid={setIsDetailTabValid}
                hubDropDownValues={dropdownListFromApi?.dropDownList?.hub_list}
                setcount={setcount}
                count={count}
                hubname={data?.hubname}
                currentdata={data}
                index={ind}
                settest={settest}
                inputValidation={inputValidation}
                setisGST={setisGST}
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
              {updateProductList?.conditions?.label === "Others" && (
                <>
                  <TextField
                    id="other_condition"
                    name="other_condition"
                    placeholder="other condition"
                    fullWidth
                    autoComplete="off"
                    className="inputfield-box"
                    value={updateProductList?.other_condition}
                    InputLabelProps={{
                      shrink: false,
                    }}
                    onChange={(e) => {
                      setUpdateProductList((prev) => ({
                        ...prev,
                        other_condition: e.target.value,
                      }));
                    }}
                    variant="outlined"
                  />
                  <InputLabel className="validation_error">
                    {inputValidation?.other_condition}
                  </InputLabel>
                </>
              )}
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
            </div>
          </div>

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
                type="number"
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
              {(updateProductList?.packing?.label === "Carton Packing" ||
                updateProductList?.packing?.label === "Pallet Packing") && (
                <>
                  <TextField
                    id="no_pieces_per"
                    name="no_pieces_per"
                    placeholder="10"
                    fullWidth
                    type="text"
                    autoComplete="off"
                    className="inputfield-box"
                    value={updateform?.no_pieces_per}
                    InputLabelProps={{
                      shrink: false,
                    }}
                    onChange={(e) => {
                      setupdateform((prev) => ({
                        ...prev,
                        no_pieces_per: e.target.value,
                      }));
                      setInputValidation((prevState) => ({
                        ...prevState,
                        no_pieces_per: "",
                      }));
                    }}
                    variant="outlined"
                  />
                  <InputLabel className="validation_error">
                    {inputValidation?.no_pieces_per}
                  </InputLabel>
                </>
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
                  id="dimension"
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
                  id="dimension"
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
                  id="dimension"
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
                  id="dimension"
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
                  Region
                  {/* <small className="asterisk">*</small> */}
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
                  Country
                  {/* <small className="asterisk">*</small> */}
                </InputLabel>

                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={restricts_country ? restricts_country : []}
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
              id="notes"
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
              value={updateform?.notes}
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
        <Link
          to={`/${
            customnostore ? customnostore : geo?.country_name
          }/sellerdashboard/inventory`}
        >
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

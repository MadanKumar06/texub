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
    },
  ]);
  const [olddata, setolddata] = useState([]);
  const [eventcheck, seteventcheck] = useState(false)
  const [test, settest] = useState([])
  const [updateProductList, setUpdateProductList] = useState({
    width: "",
    conditions: "",
    warranty: "",
    packing: "",
    restrictions: "",
    warcountry: [],
    resregion: "",
  });

  const [country, setcountry] = useState([]);
  
  const countincrease = () => {
    setcount((data) => [...data, { count: count + 1 }]);
  };

  const { navigate } = useNavigate();
  const { id } = useParams();

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

  console.log(updateProductList)
  
  useEffect(() => {
    if(olddata.length === 0) return
    let temp = olddata.warranty_country.filter(wc => 
        country.filter(c => {
          if(wc === c.value) {
            // return c
            console.log(c)
            updateProductList?.warcountry.push(c)
          }
        })
      )
    // console.log(temp)
  }, [olddata])

  console.log(updateProductList)

  useEffect(() => {
    // if(isMounted) {
    setupdateform((data1) => ({
      ...data1,
      width: olddata?.width,
      height: olddata?.height,
      length: olddata?.length,
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
        d.value === olddata?.warranty_country &&
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
      seteventcheck(!eventcheck)
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
    lnth: "",
    width: "",
    height: "",
    weight: "",
    warranty_days: "",
    notes: "",
  });

  const updateProduct = async () => {
    let productdata = [];
    count.filter((data) => {
      productdata.push(data);
    });
    let restrictedcountries = [];
    updateProductList?.rescountry?.filter((country) =>
      restrictedcountries.push(country.value)
    );
    let warrantycountries = [];
    updateProductList?.warcountry?.filter((country) =>
      warrantycountries.push(country.value)
    );
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const updatepform = await axios({
        method: "post",
        // url: `${Constant.baseUrl()}${olddata?.length > 0 ? "/editProductPrice" : "/saveProductPrice"}`,
        url: `${Constant.baseUrl()}/editProductPrice`,
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
            warranty_days: updateform?.days,
            packing_details: updateProductList?.packing?.value,
            no_pieces_per: 234,
            width: updateform?.width,
            height: updateform?.height,
            length: updateform?.lnth,
            weight: updateform?.weight,
            restrictions: updateProductList?.restrictions?.value,
            restricted_region: updateProductList?.resregion?.region_id,
            restricted_country: restrictedcountries.toString(),
            description: updateform?.notes,
            product_details: productdata,
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

  const [restricts_country, setRestricts_country] = useState([]);
  useEffect(() => {
    if (updateProductList?.resregion) {
      async function fetchData() {
        try {
          const tabledata = await axios({
            method: "post",
            url: `${Constant.baseUrl()}/getCountryListByRegion`,
            data: {
              region_id: updateProductList?.resregion?.region_id,
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
              />
            </div>
          ))}
      </div>

      <div className="updateproduct__specifications">
        <div className="updateproduct__form">
          <div className="input_separator">
            <div className="updateproduct_inputfields info ">
              <InputLabel>Conditions</InputLabel>
              <Autocomplete
                value={updateProductList?.conditions}
                disablePortal={true}
                name="conditions"
                getOptionLabel={(option) => (option.label ? option.label : [])}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    conditions: newValue,
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
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>Warranty Type</InputLabel>
              <Autocomplete
                value={updateProductList?.warranty}
                name="warranty_type"
                disablePortal={true}
                getOptionLabel={(option) => (option.label ? option.label : [])}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    warranty: newValue,
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
                  // value={updateProductList.warcountry}
                  getOptionLabel={(option) =>
                    option.label ? option.label : []
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
              <InputLabel>Warranty Days</InputLabel>
              <TextField
                id="part_number"
                name="part_nymber"
                placeholder="90 Days"
                fullWidth
                autoFocus={true}
                autoComplete="off"
                className="inputfield-box"
                value={updateform?.warranty_days}
                InputLabelProps={{
                  shrink: false,
                }}
                onChange={(e) =>
                  setupdateform((prev) => ({
                    ...prev,
                    warranty_days: e.target.value,
                  }))
                }
                variant="outlined"
              />
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>Packing Details</InputLabel>
              <Autocomplete
                value={updateProductList?.packing}
                name="packing_details"
                disablePortal={true}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    packing: newValue,
                  }));
                }}
                id="packing_details"
                options={
                  dropdownListFromApi?.dropDownList?.packing_details
                    ? dropdownListFromApi?.dropDownList?.packing_details
                    : []
                }
                getOptionLabel={(option) => (option.label ? option.label : [])}
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
            </div>
          </div>
          <div className="input_separator">
            <div className="updateproduct_inputfields info">
              <InputLabel>Dimensions</InputLabel>
              <div className="dimensions_input">
                <TextField
                  id="length"
                  name="length"
                  placeholder="Length"
                  fullWidth
                  autoComplete="off"
                  value={updateform?.length}
                  className="inputfield-box length_field"
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) =>
                    setupdateform((data) => ({
                      ...data,
                      lnth: e.target.value,
                    }))
                  }
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
                  onChange={(e) =>
                    setupdateform((data) => ({
                      ...data,
                      width: e.target.value,
                    }))
                  }
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
                  onChange={(e) =>
                    setupdateform((data) => ({
                      ...data,
                      height: e.target.value,
                    }))
                  }
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
                  onChange={(e) =>
                    setupdateform((data) => ({
                      ...data,
                      weight: e.target.value,
                    }))
                  }
                  variant="outlined"
                />
              </div>
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>Restrictions</InputLabel>
              <Autocomplete
                value={updateProductList?.restrictions}
                name="packing_details"
                disablePortal={true}
                getOptionLabel={(option) => (option.label ? option.label : [])}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    restrictions: newValue,
                  }));
                }}
                id="packing_details"
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
            </div>
          </div>
          {updateProductList?.restrictions?.value === "Yes" && (
            <div className="input_separator">
              <div className="updateproduct_inputfields info ">
                <InputLabel>Region</InputLabel>
                <Autocomplete
                  disablePortal={true}
                  name="region"
                  value={updateProductList?.resregion}
                  getOptionLabel={(option) =>
                    option.region_name ? option.region_name : ""
                  }
                  filterOptions={(options) => options}
                  onChange={(event, newValue) => {
                    setUpdateProductList((prevState) => ({
                      ...prevState,
                      resregion: newValue,
                    }));
                  }}
                  id="region"
                  options={region ? region : []}
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
                <InputLabel>Country</InputLabel>

                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={restricts_country}
                  disableCloseOnSelect
                  getOptionLabel={(option) =>
                    option.label ? option.label : []
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
                      rescountry: newValue,
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
          <div className="updateproduct_inputfields info">
            <InputLabel>Special Notes</InputLabel>
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
              onChange={(e) =>
                setupdateform((data) => ({
                  ...data,
                  notes: e.target.value,
                }))
              }
            />
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
        <p className="updateproduct__submit" onClick={updateProduct}>
          Submit
        </p>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Index;

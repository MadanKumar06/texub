import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { InputLabel, TextField, Autocomplete } from "@mui/material";
import Details from "./Details";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Constant from "../../../../Constant";

function Index({ type, data }) {
  const [count, setcount] = useState([{
    count: 0
  }]);
  const [test, settest] = useState(0);
  const [openTextbox, setOpenTextbox] = useState(false);

  const countincrease = () => {
    settest(test + 1);
    setcount(data => [
      ...data, { count: test + 1 }
    ])
  };

  useEffect(() => {
    console.log(data)
    setUpdateProductList((prevState) => ({
      ...prevState,
      width: data?.width,
      height: data?.height,
      length: data?.length,
      weight: data?.weight,
      conditions: data?.product_condition,
      warranty_type: data?.warranty_type,
      packing_details: data?.packing_details,
      restrictions: data?.restrictions

    }));
  }, [data])

  const {navigate} = useNavigate()
  const {id} = useParams()

  const [dropdownListFromApi, setDropdownListFromApi] = useState({
    dropDownList: [],
  });

  const [updateProductList, setUpdateProductList] = useState({});
  console.log(updateProductList)
  //Api to fetch dropdown values
  useEffect( async() => {
    try {
      const updateproductdropdown = await axios({
        method: 'get',
        url: `${Constant.baseUrl()}/getUpdateProductDetails`
      })
      setDropdownListFromApi((prevState) => ({
        ...prevState,
        dropDownList: Object.assign({}, ...updateproductdropdown?.data),
      }));
    } catch(e) {
      console.log(e)
    }
  }, []);


  const deleterow = (value) => {
    debugger
    setcount(count.filter((item) => item.count !== value));
  };
  

  const [hubList, setHubList] = useState();

  const [checkmumbai, setcheckmumbai] = useState();

  const checkhub = (value, value2) => {
    setcheckmumbai(value);
  };

  const [pdetails, setpdetails] = useState([])
  const [updateform, setupdateform] = useState({})
  
  const options = ["Option 1", "Option 2"];

  const updateProduct = async() => {
    let productdata = []
    count.filter(data => {
      productdata.push(data)
    })
    let user = JSON.parse(localStorage.getItem('userdata'))
    try {
      const updatepform = await axios({
        method: 'post',
        url: "https://texub.uat.a2zportals.co.in/rest/V1/texub/saveProductPrice",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          "data":{
            "bulk_upload" : 0,
            "customer_id" : user?.id,
            "product_id": id,
            "product_condition":updateProductList?.conditions?.value,
            "other_condition" : 1,
            "warranty_type": updateProductList?.warranty?.value,
            "warranty_country":"IN,US",
            "warranty_days" : updateform?.days,
            "packing_details" : updateProductList?.packing?.value,
            "no_pieces_per" : 234,
            "width" : updateform?.width,
            "height" : updateform?.height,
            "length" : updateform?.lnth,
            "weight" : updateform?.weight,
            "restrictions" : updateProductList?.restrictions?.value,
            "restricted_region" : 3,
            "restricted_country" : "AU,IN",
            "description" : updateform?.notes,
            "product_details":productdata
          }
        }
      })
      if(type === "Add Product Details") {
        navigate("/sellerdashboard/addsuccess")
      } else {
        navigate("/sellerdashboard/updatesuccess")
      }
    } catch(e) {
      console.log(e)
    }
  }


  const [restrictvalue, setrestrictvalue] = useState([
    {label: 'Yes',value: 'Yes' },
    {label: 'No',value: 'No' }
  ])

  const [country, setcountry] = useState()

  useEffect(async() => {
    try {
      const data = await axios({
        method: 'get',
        url: `${Constant.baseUrl()}/getCountryList`
      })
      setcountry(data.data)
    } catch(e) {
      console.log(e)
    }
  }, [])

  return (
    <div className="updateproduct">
      <h1>{type}</h1>

      <div className="updateproduct__topform">
        {count.map((data, i) => (
          <div className="topform__details">
            <Details
              key={dropdownListFromApi?.dropDownList?.hub_list?.hub_id}
              countincrease={countincrease}
              i={data.count}
              deleterow={deleterow}
              hubDropDownValues={dropdownListFromApi?.dropDownList?.hub_list}
              setHubList={setHubList}
              hubList={hubList}
              checkmumbai={checkmumbai}
              checkhub={checkhub}
              setpdetails={setpdetails}
              pdetails={pdetails}
              setcount={setcount}
              count={count}
              hubname = {data?.hubname}
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
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    conditions: newValue,
                  }));
                }}
                id="conditions"
                options={dropdownListFromApi?.dropDownList?.condition_list}
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
                value={updateProductList?.warranty_type}
                name="warranty_type"
                disablePortal={true}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    warranty: newValue,
                  }));
                  if (newValue?.label === "Direct Vendor Warranty In Country") {
                    setOpenTextbox(true);
                  } else {
                    setOpenTextbox(false);
                  }
                }}
                id="warranty_type"
                options={dropdownListFromApi?.dropDownList?.warranty_type}
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
          {openTextbox && (
            <div className="input_separator country_selection">
              <div className="updateproduct_inputfields ">
                <Autocomplete
                  //   value={value}
                  name=""
                  id="controllable-states-demo"
                  options={country}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="inputfield-box"
                      placeholder="Select countries"
                      fullWidth
                      InputLabelProps={{
                        shrink: false,
                      }}
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
                // value={signInData?.email_address}
                InputLabelProps={{
                  shrink: false,
                }}
                onChange={(e) => setupdateform(data => ({
                  ...data,
                  days: e.target.value
                }))}
                variant="outlined"
              />
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>Packing Details</InputLabel>
              <Autocomplete
                value={updateProductList?.packing_details}
                name="packing_details"
                disablePortal={true}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    packing: newValue,
                  }));
                }}
                id="packing_details"
                options={dropdownListFromApi?.dropDownList?.packing_details}
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
                  id="hsn_code"
                  name="hsn_code"
                  placeholder="Length"
                  fullWidth
                  autoComplete="off"
                  value={updateProductList?.length}
                  className="inputfield-box length_field"
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) => setupdateform(data => ({
                    ...data,
                    lnth: e.target.value
                  }))}
                  variant="outlined"
                />
                <TextField
                  id="hsn_code"
                  name="hsn_code"
                  placeholder=" Width"
                  fullWidth
                  autoComplete="off"
                  className="inputfield-box width_field"
                  value={updateProductList?.width}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) => setupdateform(data => ({
                    ...data,
                    width: e.target.value
                  }))}
                  variant="outlined"
                />
                <TextField
                  id="hsn_code"
                  name="hsn_code"
                  placeholder="Height"
                  fullWidth
                  autoComplete="off"
                  className="inputfield-box height_field"
                  value={updateProductList?.height}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) => setupdateform(data => ({
                    ...data,
                    height: e.target.value
                  }))}
                  variant="outlined"
                />
                <TextField
                  id="hsn_code"
                  name="hsn_code"
                  placeholder="Weight"
                  className="inputfield-box weight_field"
                  fullWidth
                  autoComplete="off"
                  value={updateProductList?.weight}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  onChange={(e) => setupdateform(data => ({
                    ...data,
                    weight: e.target.value
                  }))}
                  variant="outlined"
                />
              </div>
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>Restrictions</InputLabel>
              <Autocomplete
                value={updateProductList?.packing_details}
                name="packing_details"
                disablePortal={true}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    restrictions: newValue,
                  }));
                }}
                id="packing_details"
                options={restrictvalue}
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
              onChange={(e) => setupdateform(data => ({
                ...data,
                notes: e.target.value
              }))}
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
          <p className="updateproduct__submit" onClick={updateProduct}>Submit</p>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Index;

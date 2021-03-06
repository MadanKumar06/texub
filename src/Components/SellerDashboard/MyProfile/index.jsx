/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./styles.scss";
import { ArrowBackIosNew } from "@mui/icons-material";
import Accountinfo from "./Accountinfo";
import Addressbook from "./Addressbook";
import Companyinfo from "./Accountinfo/Companyinfo";
import Subusers from "./Subusers";
import Edit_image from "../../../Assets/CheckoutPage/Group 913.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../store/state";
import axios from "axios";
import Constant from "../../../Constant";
import { SessionExpiredLogout } from "../../../utilities";

const Index = ({ searchdata, searchupdate, searchBar, setSearchbar }) => {
  const [isAccountinfo, setisAccountinfo] = useState(true);
  const [{ geo, customnostore, userDataDetails }, dispatch] = useStateValue();
  const [showButton, setshowButton] = useState(true);
  const [type, settype] = useState();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const selectorder = (value) => {
    settype(value);
  };
  useEffect(() => {
    selectorder(0);
    setisAccountinfo(!isAccountinfo);
  }, []);

  const [profiletype, setprofiletype] = useState([
    { name: "Account Information" },
    { name: "Address Book" },
    { name: "Sub-Users" },
  ]);

  useEffect(() => {
    let permission = JSON.parse(localStorage.getItem("permissions"));
    // if(permission === null || permission === undefined || permission === '') return
    {
      permission?.length &&
        profiletype?.filter((pt, i) => {
          if (pt?.name === "Sub-Users") {
            permission?.filter((p) => {
              if (
                p?.value === "can-manage-sub-accounts" &&
                p?.permission_value === 0
              ) {
                profiletype?.splice(i, 1);
                setprofiletype(
                  profiletype.filter((pt) => pt?.name !== "Sub-Users")
                );
              }
            });
          }
        });
    }
  }, []);

  useEffect(() => {
    if (type === 0) {
      setisAccountinfo(!isAccountinfo);
      setisEdit(false);
      setisCompany(false);
      setisAddress(false);
      setisUser(false);
    } else if (type === 1) {
      setisAddress(true);
      setisAccountinfo(false);
      setisEdit(false);
      setisCompany(false);
      setisUser(false);
    } else if (type === 2) {
      setisUser(true);
      setisAddress(false);
      setisAccountinfo(false);
      setisEdit(false);
      setisCompany(false);
    }
  }, [type]);

  const [isAddress, setisAddress] = useState(false);
  const Address1 = () => {
    setisAddress(true);
    setisAccountinfo(false);
    setisEdit(false);
    setisCompany(false);
    setisUser(false);
  };
  const [isUser, setisUser] = useState(false);

  const [isEdit, setisEdit] = useState(false);
  const Edit = () => {
    setisAccountinfo(false);
    setisEdit(true);
    setisCompany(false);
    setisUser(false);
    setisAddress(false);
  };
  const [isCompany, setisCompany] = useState(false);
  const Cedit = () => {
    setisCompany(true);
    setisAccountinfo(false);
    setisEdit(false);
    setisUser(false);
    setisAddress(false);
  };
  let company_name = userData?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_company_name"
  );
  let mobile_number = userData?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_mobile_number"
  );

  const [userDetailTrigger, setUserDetailTrigger] = useState(false);
  useEffect(() => {
    axios
      .get(Constant.customerMeDetailUrl(), {
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
        dispatch({
          type: "USER_DATA_DETAILS",
          value: res?.data,
        });
        setUserData(res?.data);
        localStorage.setItem("userdata", JSON.stringify(res?.data));
        localStorage.setItem(
          "isLoggedIn_auth",
          res?.data?.group_id === 1 ? false : true
        );
        company_name = res?.data?.custom_attributes?.filter(
          (itm) => itm?.attribute_code === "customer_company_name"
        );
        mobile_number = res?.data?.custom_attributes?.filter(
          (itm) => itm?.attribute_code === "customer_mobile_number"
        );
      })
      .catch((err) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (err.response.status === 401) {
          SessionExpiredLogout();
        }
      });
  }, [userDetailTrigger]);
  return (
    <div
      className={`My_profile_main ${
        showButton === false ? "My_profile_main_gap" : ""
      }`}
    >
      {showButton === true ? (
        <div className="My_profile_btn_section sellerPage">
          {profiletype.map((data, i) => (
            <p
              className={`ordertypes ${type === i && "ordertype__selected"}`}
              key={i}
              onClick={() => selectorder(i)}
            >
              {data.name}
            </p>
          ))}
        </div>
      ) : (
        <></>
      )}
      {isAddress && <Addressbook open={Address1} />}

      {isUser && (
        <Subusers
          setshowButton={setshowButton}
          searchdata={searchdata}
          searchupdate={searchupdate}
          setSearchbar={setSearchbar}
        />
      )}
      {isAccountinfo && (
        <div className="My_profile_ac">
          <span className="My_profile_main_heading">
            {" "}
            <p>PROFILE INFORMATION</p>
          </span>

          <div className="My_profile_ac_table">
            <div className="my_profile_edit">
              <img
                src={Edit_image}
                alt=""
                style={{ height: "34px", cursor: "pointer" }}
                onClick={Edit}
              />
              <p
                className="profile_edit"
                style={{ cursor: "pointer" }}
                onClick={Edit}
              >
                Edit
              </p>
            </div>
            <div className="my_profile_data">
              <div className="my_profile_data_section">
                <p className="my_profile_data_section_heading">NAME</p>
                <p className="my_profile_data_section_tag">
                  {userData["firstname"]} {userData["lastname"]}
                </p>
              </div>
              <div className="my_profile_data_section">
                <p className="my_profile_data_section_heading">E-Mail</p>
                <p className="my_profile_data_section_tag">
                  {userData["email"]}
                </p>
              </div>
              <div className="my_profile_data_section">
                <p className="my_profile_data_section_heading">MOBILE NUMBER</p>
                <p className="my_profile_data_section_tag">
                  {mobile_number?.[0]?.value}
                </p>
              </div>
              <div className="my_profile_data_section">
                <p className="my_profile_data_section_heading">PASSWORD</p>
                <p className="my_profile_data_section_tag">***********</p>
              </div>
            </div>
          </div>

          {/* <div className="my_profile_company">
            <span className="My_profile_main_heading">
              <p>COMPANY INFORMATION</p>
            </span>
            <div className="My_profile_ac_table">
              <div className="my_profile_edit">
                <img src={Edit_image} alt="" style={{ height: "34px" }} />
                <p className="profile_edit" onClick={Cedit}>
                  Edit
                </p>
              </div>
              <div className="my_profile_table">
                <div className="my_profile_data">
                  <div className="my_profile_data_section">
                    <p className="my_profile_data_section_heading">
                      ORGANIZATION NAME
                    </p>
                    <p className="my_profile_data_section_tag">
                      {" "}
                      {company_name?.[0]?.value}
                    </p>
                  </div>
                  <div className="my_profile_data_section">
                    <p className="my_profile_data_section_heading">
                      ORGANIZATION TYPE
                    </p>
                    <p className="my_profile_data_section_tag">
                      Printers & copiers
                    </p>
                  </div>
                  <div className="my_profile_data_section">
                    <p className="my_profile_data_section_heading">
                      GST NUMBER
                    </p>
                    <p className="my_profile_data_section_tag">29Aabcu8v03</p>
                  </div>
                  <div className="my_profile_data_section">
                    <p className="my_profile_data_section_heading">
                      GST CERTIFICATE
                    </p>
                    <p className="my_profile_data_section_tag">
                      Certificate_Gst20456.Jpg
                    </p>
                  </div>
                </div>
                <div className="my_profile_data1">
                  <div className="my_profile_data_section">
                    <p className="my_profile_data_section_heading">
                      SPECIALITY
                    </p>
                    <p className="my_profile_data_section_tag">
                      Printers & copiers
                    </p>
                  </div>
                  <div className="my_profile_data_section">
                    <p className="my_profile_data_section_heading">
                      BRANCHES & DEPARTMENT
                    </p>
                    <p className="my_profile_data_section_tag">00</p>
                  </div>
                  <div className="my_profile_data_section">
                    <p className="my_profile_data_section_heading">
                      AVERAGE REVENUE
                    </p>
                    <p className="my_profile_data_section_tag">0123456789</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="my_profile_back">
            <Link
              to={`/${
                customnostore ? customnostore : geo?.country_name
              }/sellerdashboard/dashboard`}
              className="link"
            >
              <ArrowBackIosNew />
              <span>
                <p className="back">Back</p>
              </span>
            </Link>
          </div>
        </div>
      )}
      {isEdit && (
        <Accountinfo
          setisAccountinfo={setisAccountinfo}
          setisEdit={setisEdit}
          setUserDetailTrigger={setUserDetailTrigger}
          userDetailTrigger={userDetailTrigger}
        />
      )}
      {isCompany && <Companyinfo />}
    </div>
  );
};

export default Index;

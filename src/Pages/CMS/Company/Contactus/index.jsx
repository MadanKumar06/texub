import React, { useState } from "react";
import "./styles.scss";

import { TextField, Box, Button, InputLabel } from "@mui/material";
import { isEmailValid } from "../../../../utilities";
import Constant from "../../../../Constant";
import axios from "axios";
import swal from "sweetalert2";
import { Helmet } from "react-helmet";

import contact from "../../../../Assets/Career/Group 982.png";
import officeicon from "../../../../Assets/Contactus/office.png";
import mailicon from "../../../../Assets/Contactus/mail (2).png";
import telephoneicon from "../../../../Assets/Contactus/telephone.png";
import Fb from "../../../../Assets/CommonImage/facebook.png";
import twitter from "../../../../Assets/CommonImage/twitter.png";
import linkedin from "../../../../Assets/CommonImage/linkedin.png";
import instagram from "../../../../Assets/CommonImage/instagram.png";
import location from "../../../../Assets/Contactus/placeholder (2).png";

const Contactus = () => {
  const [contactusData, setcontactusData] = useState({
    your_name: "",
    e_mail: "",
    your_message: "",
    subject: "",
  });
  const [inputValidation, setInputValidation] = useState({
    your_name: "",
    e_mail: "",
    your_message: "",
  });
  let storedata = JSON.parse(localStorage.getItem("storedata"));
  const handleCall = () => {
    let data = {
      data: {
        storeId: storedata?.store_id,
        email: contactusData?.e_mail,
        name: contactusData?.your_name,
        subject: contactusData?.subject,
        message: contactusData?.your_message,
      },
    };
    axios
      .post(Constant.baseUrl() + `/contactForm`, data, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setcontactusData({
          your_name: "",
          e_mail: "",
          your_message: "",
          subject: "",
        });
        swal.fire({
          text: `${res?.data?.[0]?.message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
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
  const handleFormvalue = (event) => {
    setcontactusData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setInputValidation("");
  };
  const handleClickValidation = (event) => {
    var errorHandle = false;
    if (!contactusData?.your_name) {
      document.getElementById("your_name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        your_name: "Please enter your name.",
      }));
      errorHandle = true;
    }
    if (!contactusData?.e_mail) {
      document.getElementById("e_mail")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        e_mail: "Please enter your e-mail",
      }));
      errorHandle = true;
    }
    if (!contactusData?.your_message) {
      document.getElementById("your_message")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        your_message: "Please enter your message.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      handleCall();
    }
  };
  const office = [
    {
      id: 1,
      icon: officeicon,
      heading: "Office Address",
      number: "TEXUB FZCO,",
      number2: "1401, Al Manara Building,",
      number3: "Business Bay, Dubai,",
      landmark: "United Arab Emirates",
    },
  ];
  const mail = [
    {
      id: 1,
      icon: mailicon,
      heading: "E-Mail Address",
      mail: "info@texub.com",
    },
  ];
  const telephone = [
    {
      id: 1,
      icon: telephoneicon,
      heading: "Call Us",
      number: "+9714 276 3999",
    },
  ];
  const social = [
    {
      facebook: Fb,
      insta: instagram,
      linkedin: linkedin,
      twitter: twitter,
    },
  ];
  const working = [{ id: 1, heading: "Working Hours", time: "24x7x365" }];
  const location1 = [
    {
      id: 1,
      image: location,
      address: "TEXUB Inc,",
      address2: "Spaces Galleria At Post Oak,",
      address3: "1980 Post Oak Blvd, Suite 200",
      address4: "Houston TX 77056",
      address5: "United States",
      contact: "+1 888-866-9799",
    },
  ];
  const location2 = [
    {
      id: 1,
      image: location,
      address: "TEXUB FZCO,",
      address2: "S31208 South Zone, Jebel Ali",
      address3: "Free Zone, Dubai,",
      address4: "United Arab Emirates",
      contact: "+9714 276 3999",
    },
  ];
  const location3 = [
    {
      id: 1,
      image: location,
      address: "TEXUB FZCO,",
      address2: "1401, Al Manara Building,",
      address3: "Business Bay, Dubai,",
      address4: "United Arab Emirates",
      contact: "+9714 276 3999",
    },
  ];
  const location4 = [
    {
      id: 1,
      image: location,
      address: "TEXUB Infotech Private Ltd.,",
      address2: "304, S.No 19 Cts 876/113,",
      address3: "Sai Crystal, Dp Shah, Vishal",
      address4: "Nagar, Pimple, Pune,",
      address5: "Maharashtra, India 411027",
    },
  ];
  const location5 = [
    {
      id: 1,
      image: location,
      address: "TEXUB Infotech Private Ltd.,",
      address2: "Mumbai, India",
    },
  ];
  const location6 = [
    {
      id: 1,
      image: location,
      address: "TEXUB,",
      address2: "Singapore",
    },
  ];
  const location7 = [
    {
      id: 1,
      image: location,
      address: "TEXUB,",
      address2: "Amsterdam, Netherlands",
    },
  ];
  const location8 = [
    {
      id: 1,
      image: location,
      address: "TEXUB,",
      address2: "Lagos, Nigeria",
    },
  ];
  return (
    <div>
      <Helmet>
        <title>TEXUB | Contact us</title>
        <meta
          name="description"
          content="TEXUB is a trusted Digital Marketplace for Global IT trade. The next level digital ecosystem and scalable cloud IT B2B Trade platforms."
        />
      </Helmet>
      <div className="contactus_main">
        <div className="contactus_img_section">
          <img src={contact} alt="/" className="contactus_img" />
        </div>

        <div className="contactus_form_section">
          <div className="contactus_details_section">
            <div>
              <span className="contactus_tag">
                <p>Want To Hear From Us ?</p>
              </span>
              <span className="contactus_heading">
                <h3>Contact Us</h3>
              </span>
            </div>
            <div className="contactus_details">
              {office.map((item) => (
                <li key={item.id} className="contactus_office_list">
                  <div className="contactus_office">
                    <img src={item.icon} alt="" className="" />
                  </div>
                  <div className="contactus_office_address">
                    <span className="contactus_office_heading">
                      {" "}
                      {item.heading}
                    </span>
                    <span className="contactus_office_number">
                      {item.number}
                    </span>
                    <span className="contactus_office_number">
                      {item.number2}
                    </span>
                    <span className="contactus_office_number">
                      {item.number3}
                    </span>
                    <span className="contactus_office_number">
                      {item.landmark}
                    </span>
                  </div>
                </li>
              ))}
            </div>
            <div className="contactus_details">
              {mail.map((item) => (
                <li key={item.id} className="contactus_office_list">
                  <div className="contactus_office">
                    <img src={item.icon} alt="" className="" />
                  </div>
                  <div className="contactus_office_address">
                    <span className="contactus_office_heading">
                      {" "}
                      {item.heading}
                    </span>
                    <span className="contactus_office_number">{item.mail}</span>
                  </div>
                </li>
              ))}
            </div>
            <div className="contactus_details">
              {telephone.map((item) => (
                <li key={item.id} className="contactus_office_list">
                  <div className="contactus_office">
                    <img src={item.icon} alt="" className="" />
                  </div>
                  <div className="contactus_office_address">
                    <span className="contactus_office_heading">
                      {" "}
                      {item.heading}
                    </span>
                    <span className="contactus_office_number">
                      {item.number}
                    </span>
                    <span className="contactus_office_number">
                      {item.number2}
                    </span>
                  </div>
                </li>
              ))}
            </div>
            <div className="contactus_social">
              {social.map((item) => (
                <li key={item.id} className="contactus_office_list">
                  <div className="contactus_social_media">
                    <a
                      href="https://www.facebook.com/texubglobal/"
                      target="_blanks"
                    >
                      <img src={item.facebook} alt="" className="" />
                    </a>
                    <a
                      href="https://www.instagram.com/texubglobal/"
                      target="_blanks"
                    >
                      <img src={item.insta} alt="" className="" />
                    </a>
                    <a href="https://twitter.com/texubglobal/" target="_blanks">
                      <img src={item.twitter} alt="" className="" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/texubglobal/"
                      target="_blanks"
                    >
                      <img src={item.linkedin} alt="" className="" />
                    </a>
                  </div>
                </li>
              ))}
            </div>
            <div className="contactus_details">
              {working.map((item) => (
                <li key={item.id} className="contactus_office_list">
                  <div className="contactus_office_address">
                    <span className="contactus_office_heading">
                      {item.heading}
                    </span>
                    <span className="contactus_office_number">
                      {" "}
                      {item.time}
                    </span>
                  </div>
                </li>
              ))}
            </div>
          </div>
          <div className="contactus_form">
            <div>
              <TextField
                label="Your Name"
                placeholder="Your Name"
                name="your_name"
                id="your_name"
                fullWidth
                className="inputfield-box contact-form-inputfieldbox"
                InputLabelProps={{
                  shrink: true,
                  required: true,
                  classes: {
                    asterisk: "asterisk",
                  },
                }}
                onChange={handleFormvalue}
                value={contactusData?.your_name}
                variant="outlined"
              />
              <InputLabel className="validation_error">
                {inputValidation?.your_name}
              </InputLabel>
            </div>
            <div>
              <TextField
                className="inputfield-box contact-form-inputfieldbox"
                label="E-mail Address"
                placeholder="E-mail Address"
                fullWidth
                name="e_mail"
                id="e_mail"
                InputLabelProps={{
                  shrink: true,
                  required: true,
                  classes: {
                    asterisk: "asterisk",
                  },
                }}
                onChange={handleFormvalue}
                value={contactusData?.e_mail}
                variant="outlined"
              />
              <InputLabel className="validation_error">
                {inputValidation?.e_mail}
              </InputLabel>
            </div>
            <div>
              <TextField
                className="inputfield-box contact-form-inputfieldbox"
                label="Subject"
                placeholder="Subject"
                fullWidth
                name="subject"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleFormvalue}
                value={contactusData?.subject}
              />
              <InputLabel className="validation_error"></InputLabel>
            </div>
            <div>
              <TextField
                className="inputfield-box contact-form-inputfieldbox"
                label="Your Message"
                fullWidth
                placeholder="Type your message"
                name="your_message"
                id="your_message"
                multiline
                rows={5}
                InputLabelProps={{
                  shrink: true,
                  required: true,
                  classes: {
                    asterisk: "asterisk",
                  },
                }}
                onChange={handleFormvalue}
                value={contactusData?.your_message}
                variant="outlined"
              />

              <InputLabel className="validation_error">
                {inputValidation?.your_message}
              </InputLabel>
            </div>
            <Box className="box-content">
              <Button
                className="button-text btn-secondary"
                onClick={() => handleClickValidation()}
              >
                Send Your Message
              </Button>
            </Box>
          </div>
        </div>
        <div className="contactus_map_section">
          <p className="contactus_map_heading">Global Locations</p>
          <div className="contactus_locations">
            <div className="contactus_location1">
              {location1?.map((item) => (
                <li key={item.id} className="contactus_location_list">
                  <div className="contactus_locations_1">
                    <img
                      src={item.image}
                      className="location_image"
                      alt=""
                    ></img>
                    <div className="address-info-box">
                      <span> {item.address}</span>
                      <span> {item.address2}</span>
                      <span> {item.address3}</span>
                      <span> {item.address4}</span>
                      <span> {item.address5}</span>
                    </div>
                    <div className="address-phone-box">
                      <span>{item.contact}</span>
                    </div>
                  </div>
                </li>
              ))}
            </div>
            <div className="contactus_location1">
              {location2?.map((item) => (
                <li key={item.id} className="contactus_location_list">
                  <div className="contactus_locations_1">
                    <img
                      src={item.image}
                      className="location_image"
                      alt=""
                    ></img>
                    <div className="address-info-box">
                      <span> {item.address}</span>
                      <span> {item.address2}</span>
                      <span> {item.address3}</span>
                      <span> {item.address4}</span>
                      <span> {item.address5}</span>
                    </div>
                    <div className="address-phone-box">
                      <span>{item.contact}</span>
                      <span>{item.contact2}</span>
                    </div>
                  </div>
                </li>
              ))}
            </div>
            <div className="contactus_location1">
              {location3?.map((item) => (
                <li key={item.id} className="contactus_location_list">
                  <div className="contactus_locations_1">
                    <img
                      src={item.image}
                      className="location_image"
                      alt=""
                    ></img>
                    <div className="address-info-box">
                      <span> {item.address}</span>
                      <span> {item.address2}</span>
                      <span> {item.address3}</span>
                      <span> {item.address4}</span>
                      <span> {item.address5}</span>
                    </div>
                    <div className="address-phone-box">
                      <span>{item.contact}</span>
                      <span>{item.contact2}</span>
                    </div>
                  </div>
                </li>
              ))}
            </div>
            <div className="contactus_location1">
              {location4?.map((item) => (
                <li key={item.id} className="contactus_location_list">
                  <div className="contactus_locations_1">
                    <img
                      src={item.image}
                      className="location_image"
                      alt=""
                    ></img>
                    <div className="address-info-box">
                      <span> {item.address}</span>
                      <span> {item.address2}</span>
                      <span> {item.address3}</span>
                      <span> {item.address4}</span>
                      <span> {item.address5}</span>
                    </div>
                  </div>
                </li>
              ))}
            </div>
            <div className="contactus_location1">
              {location5?.map((item) => (
                <li key={item.id} className="contactus_location_list">
                  <div className="contactus_locations_1">
                    <img
                      src={item.image}
                      className="location_image"
                      alt=""
                    ></img>
                    <div className="address-info-box">
                      <span> {item.address}</span>
                      <span> {item.address2}</span>
                    </div>
                  </div>
                </li>
              ))}
            </div>

            <div className="contactus_location1">
              {location6?.map((item) => (
                <li key={item.id} className="contactus_location_list">
                  <div className="contactus_locations_1">
                    <img
                      src={item.image}
                      className="location_image"
                      alt=""
                    ></img>
                    <div className="address-info-box">
                      <span> {item.address}</span>
                      <span> {item.address2}</span>
                    </div>
                  </div>
                </li>
              ))}
            </div>
            <div className="contactus_location1">
              {location7?.map((item) => (
                <li key={item.id} className="contactus_location_list">
                  <div className="contactus_locations_1">
                    <img
                      src={item.image}
                      className="location_image"
                      alt=""
                    ></img>
                    <div className="address-info-box">
                      <span> {item.address}</span>
                      <span> {item.address2}</span>
                    </div>
                  </div>
                </li>
              ))}
            </div>
            <div className="contactus_location1">
              {location8?.map((item) => (
                <li key={item.id} className="contactus_location_list">
                  <div className="contactus_locations_1">
                    <img
                      src={item.image}
                      className="location_image"
                      alt=""
                    ></img>
                    <div className="address-info-box">
                      <span> {item.address}</span>
                      <span> {item.address2}</span>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;

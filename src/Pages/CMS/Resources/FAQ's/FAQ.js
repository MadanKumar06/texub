import React, { useState, useEffect } from "react";
import "./FAQ.scss";

import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import axios from "axios";
import Constant from "../../../../Constant";

import IMG from "../../../../Assets/FAQ/group7.svg";
import img from "../../../../Assets/Career/Group 765.png";
import IMG2 from "../../../../Assets/FAQ/group 6.svg";
import swal from "sweetalert2";
import { useStateValue } from "../../../../store/state";

const FAQ = ({ classes }) => {
  const [{ geo, customnostore }, dispatch] = useStateValue();
  const [description, setdescription] = useState(false);
  const [faqList, setFaqList] = useState({});
  const [toggle, settoggle] = useState(false);
  const [askQuestion, setAskeQuestion] = useState("");
  const text = (value) => {
    setdescription(value);
    settoggle(value);
  };

  useEffect(() => {
    axios
      .get(Constant.baseUrl() + `/getFaq`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setFaqList(res?.data);
      })
      .catch((err) => {});
  }, []);

  const handleCall = () => {
    let data = {
      customerId: JSON.parse(localStorage.getItem("userdata"))?.id,
      storeId: 3,
      content: askQuestion,
    };
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    axios
      .post(Constant.baseUrl() + `/faqRequest`, data, {
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
        swal.fire({
          text: `${res?.data?.[0]?.message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      })
      .then((res) => {
        setAskeQuestion('')
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
    <div className="faqs_main">
      <div className="faqs_heading_section">
        <img src={img} alt="/" className="faqs_heading_img" />
        <p className="faqs_heading">Frequently Asked Questions (FAQ's)</p>
      </div>

      <div className="faqs_table_section">
        <h3 className="faqs_table_heading">
          Frequently Asked Questions (FAQ's)
        </h3>
        <hr className="faqs_hr1"></hr>
        {faqList?.length &&
          faqList?.map((item, ind) => (
            <li
              key={ind}
              onClick={() => {
                text(ind);
              }}
              className="faqs_table_adding"
            >
              <div className="faqs_qns_section">
                <img
                  src={toggle === ind ? IMG2 : IMG}
                  alt=""
                  className="faqs_plus_img"
                ></img>
                <span className="faq_qns_heading">{item.title}</span>
              </div>
              <span>
                {ind === description && (
                  <div className="faqs_description">
                    <div
                      className="content"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                )}
              </span>
              <hr className="faqs_horizental"></hr>
            </li>
          ))}
        <div className={classes.faqs_table}>
          <p className={classes.faqs_text_heading}>
            Have a Question ? Type here and submit
          </p>
          <div>
            <TextField
              className="inputfield-box contact-form-inputfieldbox"
              fullWidth
              placeholder="Type your Question…"
              name="your_message"
              id="your_message"
              multiline
              rows={5}
              onChange={(event) => setAskeQuestion(event?.target?.value)}
              value={askQuestion}
              variant="outlined"
            />
          </div>
          <span>
            <button
              className={classes.faqs_button}
              onClick={() => handleCall()}
            >
              Submit
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(FAQ);

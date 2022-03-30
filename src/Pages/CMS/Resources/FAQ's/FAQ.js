import React, { useState } from "react";
import "./FAQ.scss";

import { TextareaAutosize } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

import IMG from "../../../../Assets/FAQ/group7.svg";
import img from "../../../../Assets/Career/Group 765.png";
import IMG2 from "../../../../Assets/FAQ/group 6.svg";

const FAQ = ({ classes }) => {
  const [description1, setdescription1] = useState(false);
  const [description2, setdescription2] = useState(false);
  const [description3, setdescription3] = useState(false);
  const [toggle1, settoggle1] = useState(true); 
  const [toggle2, settoggle2] = useState(true);
  const [toggle3, settoggle3] = useState(true);
  const content1 = () => {
    setdescription1(true)
    settoggle1(false)
    settoggle2(true)
    settoggle3(true)
    setdescription2(false)
    setdescription3(false)
  }
  const content2 = () => {
    setdescription2(true)
    settoggle2(false)
    settoggle1(true)
    settoggle3(true)
    setdescription1(false)
    setdescription3(false)
  }
  const content3 = () => {
    setdescription3(true)
    settoggle3(false)
    settoggle1(true)
    settoggle2(true)
    setdescription2(false)
    setdescription1(false)
  }
  const FAQs1 = [
    {
      id: 1,
      image: IMG,
      image1: IMG2,
      heading: "How can I order in Bulk?",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem.",
    },
  ];
  const FAQs2 = [
    {
      id: 1,
      image: IMG,
      image1: IMG2,
      heading: "How can I order in Bulk?",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem.",
    },
  ];
  const FAQs3 = [
    {
      id: 1,
      image: IMG,
      image1: IMG2,
      heading: "How can I order in Bulk?",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem.",
    },
  ];
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
        {FAQs1.map((item) => (
          <li key= {item.id} className="faqs_table_adding">
            <div className="faqs_qns_section">
              <img
                src={toggle1 ? item.image : item.image1 }
                alt=""
                onClick={() => content1()  
                }
                className="faqs_plus_img"
              ></img>
              <span className="faq_qns_heading">{item.heading}</span>
            </div>
            {description1 &&
              <div className="faqs_description">
                <div className="v1"></div>
                {item.text}
              </div>
            }
            <hr className="faqs_horizental"></hr>
          </li>
        ))}
        {FAQs2.map((item) => (
          <li key= {item.id} className="faqs_table_adding">
            <div className="faqs_qns_section">
              <img
                src={toggle2 ? item.image : item.image1 }
                alt=""
                onClick={() => content2()  
                }
                className="faqs_plus_img"
              ></img>
              <span className="faq_qns_heading">{item.heading}</span>
            </div>
            {description2 &&
              <div className="faqs_description">
                <div className="v1"></div>
                {item.text}
              </div>
            }
            <hr className="faqs_horizental"></hr>
          </li>
        ))}
        {FAQs3.map((item) => (
          <li key= {item.id} className="faqs_table_adding">
            <div className="faqs_qns_section">
              <img
                src={toggle3 ? item.image : item.image1 }
                alt=""
                onClick={() => content3()  
                }
                className="faqs_plus_img"
              ></img>
              <span className="faq_qns_heading">{item.heading}</span>
            </div>
            {description3 &&
              <div className="faqs_description">
                <div className="v1"></div>
                {item.text}
              </div>
            }
            <hr className="faqs_horizental"></hr>
          </li>
        ))}
        <div className={classes.faqs_table}>
          <p className={classes.faqs_text_heading}>
            Have a Question ? Type here and submit
          </p>
          <TextareaAutosize className={classes.faqs_textarea} minRows={6} />
          <span>
            <button className={classes.faqs_button}>Submit</button>
          </span>
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(FAQ);
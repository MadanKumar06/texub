import React, { useState } from "react";
import "./FAQ.scss";

import { TextareaAutosize } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";

import IMG from "../../../../Assets/FAQ/group7.svg";
import img from "../../../../Assets/Career/Group 765.png";
import IMG2 from "../../../../Assets/FAQ/group 6.svg";

const FAQ = ({ classes }) => {
  const [description, setdescription] = useState(false);
  const [toggle, settoggle] = useState(true); 
  const text = (value) => {
    setdescription(value)
    settoggle(false)
     console.log(toggle)
  }
  const FAQs = [
    {
      id: 1,
      image: IMG,
      image1: IMG2,
      heading: "How can I order in Bulk?",
      script:
        [{ text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem.", }]
    },
    {
      id: 2,
      image: IMG,
      image1: IMG2,
      heading: "How can I order in Bulk?",
      script:
        [{ text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem.", }]
    },
    {
      id: 3,
      image: IMG,
      image1: IMG2,
      heading: "How can I order in Bulk?",
      script:
        [
          { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem.", }
        ]
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
        {FAQs.map((item) => (
          <li key= {item.id} className="faqs_table_adding">
            <div className="faqs_qns_section">
              <img
                src={toggle ? item.image : item.image1 }
                alt=""
                onClick={() => {text(item.id)
                }
                }
                className="faqs_plus_img"
              ></img>
              <span className="faq_qns_heading">{item.heading}</span>
            </div>
            {description && (
              <>
                <span>{item.id === description && item.script.map(e =>
                  <div className="faqs_description">
                    <div className="content">
                      <div className="v1"></div>
                      {e.text}
                    </div>
                  </div>
                )}
                </span>
              </>
            )}
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

import MobileFooterAccordions from "./FooterForMobile";
import Cookiespermission from "../../Pages/CMS/Resources/Cookiespermission";

import logo from "../../Assets/Homepage Assets/Group.png";
import Fb from "../../Assets/Homepage Assets/facebook.png";
import Yt from "../../Assets/Homepage Assets/youtube.png";
import In from "../../Assets/Homepage Assets/linkedin.png";
import Wsp from "../../Assets/Homepage Assets/whatsapp.png";
import User from "../../Assets/Homepage Assets/user.png";
import Like from "../../Assets/Homepage Assets/like.png";
import Home from "../../Assets/Homepage Assets/home.png";
import Shopping from "../../Assets/Homepage Assets/Shoppingbag.png";

export const Footer = () => {
  const [isCookies, setisCookies] = useState(false);

  return (
    <div className="Footer">
      <div className="Footer_box">
        <div className="Footer_box_col_1">
          <div className="image_div">
            <img className="Footer_Logo" src={logo} alt="" />
          </div>
          <p className="Footer_Paragraph">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <div className="Footer_Icon_style">
            <img className="Footer_Icons" src={Fb} alt="" />
            <img className="Footer_Icons" src={Yt} alt="" />
            <img className="Footer_Icons" src={In} alt="" />
            <img className="Footer_Icons" src={Wsp} alt="" />
          </div>
        </div>
        <div className="footer_container_right">
          <div className="Footer_box_col_234">
            <h2 className="Footer_Col_Heading">Company</h2>
            <ul className="Footer_col_list">
              <Link to="/aboutus" className="to_CMS">
                <li>About Us</li>
              </Link>
              <Link to="/termsofuse" className="to_CMS">
                <li>Terms Of Use</li>
              </Link>
              <Link to="/privacypolicy" className="to_CMS">
                <li>Privacy Policy</li>
              </Link>
              <Link to="/rrpolicy" className="to_CMS">
                <li>Refund Policy</li>
              </Link>
              <Link to="/" className="to_CMS">
                <li> Product Listing Policy</li>
              </Link>
              <Link to="/contactus" className="to_CMS">
                <li>Contact Us</li>
              </Link>
            </ul>
          </div>
          <div className="Footer_box_col_234">
            <h2 className="Footer_Col_Heading">Services</h2>
            <ul className="Footer_col_list">
              <Link to="/training" className="to_CMS">
                <li>Training</li>
              </Link>
              <Link to="/seller_advantage" className="to_CMS">
                <li>Seller Advantage</li>
              </Link>
              <Link to="/buyer_advantage" className="to_CMS">
                <li>Buyer Advantage</li>
              </Link>
              <Link to="/career" className="to_CMS">
                <li>Career</li>
              </Link>
              <Link to="/" className="to_CMS">
                <li>How Its Works</li>
              </Link>
            </ul>
          </div>
          <div className="Footer_box_col_234">
            <h2 className="Footer_Col_Heading">Resources</h2>
            <ul className="Footer_col_list">
              <Link to="/legal" className="to_CMS">
                <li>Legal</li>
              </Link>
              <li
                onClick={() => {
                  setisCookies(true);
                }}
              >
                Cookies Permission
              </li>
              <Link to="/gdpr" className="to_CMS">
                <li>GDPR</li>
              </Link>
              <Link to="/Faqs" className="to_CMS">
                <li>FAQs</li>
              </Link>
              <Link to="/blogsmain" className="to_CMS">
                <li>Blogs</li>
              </Link>
            </ul>
          </div>
          {isCookies && <Cookiespermission closePOPup={setisCookies} />}
        </div>
      </div>
      <div className="footer_mobile_view">
        <MobileFooterAccordions />
      </div>
      <div className="Copyright">
        <p>@2020 Mockup. All Rights Reserved</p>
        <p>Privacy Policy</p>
        <p>Terms of Services</p>
      </div>
      <div className="User_Details">
        <Link to="/">
          <img className="FooterUser" src={User} alt="" />
        </Link>
        <Link to="/">
          <img className="FooterLike" src={Like} alt="" />
        </Link>
        <Link to="/">
          <img className="FooterHome" src={Home} alt="" />
        </Link>
        <Link to="/">
          <img className="FooterShop" src={Shopping} alt="" />
        </Link>
      </div>
    </div>
  );
};

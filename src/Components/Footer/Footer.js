import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../Assets/Homepage Assets/Group.png";
import Fb from "../../Assets/Homepage Assets/facebook.png";
import Yt from "../../Assets/Homepage Assets/youtube.png";
import In from "../../Assets/Homepage Assets/linkedin.png";
import Wsp from "../../Assets/Homepage Assets/whatsapp.png";
import User from "../../Assets/Homepage Assets/user.png";
import Like from "../../Assets/Homepage Assets/like.png";
import Home from "../../Assets/Homepage Assets/home.png";
import Shopping from "../../Assets/Homepage Assets/Shoppingbag.png";
import MobileFooterAccordions from "./FooterForMobile";
import Selleradvantage from "../../Pages/CMS/Selleradvantage/Selleradvantage";
export const Footer = () => {
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
              <li>About Us</li>
              <li>Terms Of Use</li>
              <li>Privacy Policy</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="Footer_box_col_234">
            <h2 className="Footer_Col_Heading">Services</h2>
            <ul className="Footer_col_list">
              <li>Training</li>
             <Link to="/seller_advantage"> 
              <li>Seller Advantage</li>
               </Link> 
               <Link to="/buyer_advantage">
              <li>Buyer Advantage</li>
              </Link>
              <Link to="/career">
              <li>Career</li>
              </Link>
            </ul>
          </div>
          <div className="Footer_box_col_234">
            <h2 className="Footer_Col_Heading">Resources</h2>
            <ul className="Footer_col_list">
              <li>Legal</li>
              <li>Cookies Permission</li>
              <li>GDPR</li>
              <li>FAQs</li>
            </ul>
          </div>
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

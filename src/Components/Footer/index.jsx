import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

import MobileFooterAccordions from "./FooterForMobile";
import Cookiespermission from "../../Pages/CMS/Resources/Cookiespermission";

import logo from "../../Assets/Homepage Assets/Group.png";
import Fb from "../../Assets/CommonImage/facebook.png";
import twitter from "../../Assets/CommonImage/twitter.png";
import linkedin from "../../Assets/CommonImage/linkedin.png";
import instagram from "../../Assets/CommonImage/instagram.png";
import User from "../../Assets/Homepage Assets/user.png";
import Like from "../../Assets/Homepage Assets/like.png";
import Home from "../../Assets/Homepage Assets/home.png";
import Shopping from "../../Assets/Homepage Assets/Shoppingbag.png";
import { useStateValue } from "../../store/state";

export const Footer = () => {
  const [{ geo, currencyData, customnostore }, dispatch] = useStateValue();
  const [isCookies, setisCookies] = useState(false);

  return (
    <div className="Footer">
      <div className="Footer_box">
        <div className="Footer_box_col_1">
          <div className="image_div">
            <img className="Footer_Logo" src={logo} alt="" />
          </div>
          <p className="Footer_Paragraph">
            TEXUB is a trusted Digital Marketplace for Global IT trade. TEXUB
            offers an enthralling journey into the IT business by digitally
            connecting verified B2B Sellers and Buyers from all around the
            World.
          </p>
          <div className="Footer_Icon_style">
            <a href="https://www.facebook.com/texubglobal/" target="_blanks">
              <img className="Footer_Icons" src={Fb} alt="" />
            </a>
            <a href="https://www.instagram.com/texubglobal/" target="_blanks">
              <img className="Footer_Icons" src={instagram} alt="" />
            </a>
            <a href="https://twitter.com/texubglobal/" target="_blanks">
              <img className="Footer_Icons" src={twitter} alt="" />
            </a>
            <a
              href="https://www.linkedin.com/company/texubglobal/"
              target="_blanks"
            >
              <img className="Footer_Icons" src={linkedin} alt="" />
            </a>
          </div>
        </div>
        <div className="footer_container_right">
          <div className="Footer_box_col_234">
            <h2 className="Footer_Col_Heading">Company</h2>
            <ul className="Footer_col_list">
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/aboutus`}
                className="to_CMS"
              >
                <li>About Us</li>
              </Link>
                <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/sell-on-texub`}
                className="to_CMS"
              >
                <li>Sell On TEXUB</li>
              </Link>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/buy-on-texub`}
                className="to_CMS"
              >
                <li>Buy On TEXUB</li>
              </Link>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/contactus`}
                className="to_CMS"
              >
                <li>Contact Us</li>
              </Link>
              
            </ul>
          </div>
          <div className="Footer_box_col_234">
            <h2 className="Footer_Col_Heading">Legal</h2>
            <ul className="Footer_col_list">
               <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/termsofuse/${currencyData?.[2]?.staticPages?.terms}`}
                className="to_CMS"
              >
                <li>Terms Of Use</li>
              </Link>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/privacypolicy/${currencyData?.[2]?.staticPages?.privacy}`}
                className="to_CMS"
              >
                <li>Privacy Policy</li>
              </Link>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/rrpolicy`}
                className="to_CMS"
              >
                <li>Refund Policy</li>
              </Link>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/productlistingpolicy/${
                  currencyData?.[2]?.staticPages?.product_listing
                }`}
                className="to_CMS"
              >
                <li> Product Listing Policy</li>
              </Link>
               <li
                className="to_CMS cookie"
                onClick={() => {
                  setisCookies(true);
                }}
              >
                Cookies Permission
              </li>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/gdpr`}
                className="to_CMS"
              >
                <li>GDPR</li>
              </Link>

            
              {/* <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/seller_advantage`}
                className="to_CMS"
              >
                <li>Seller Advantage</li>
              </Link>
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/buyer_advantage`}
                className="to_CMS"
              >
                <li>Buyer Advantage</li>
              </Link> */}
              
              {/* <Link
                to={`/${customnostore ? customnostore : geo?.country_name}`}
                className="to_CMS"
              >
                <li>How Its Works</li>
              </Link> */}
            </ul>
          </div>
          <div className="Footer_box_col_234">
            <h2 className="Footer_Col_Heading">Resources</h2>
            <ul className="Footer_col_list">
              {/* <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/legal`}
                className="to_CMS"
              >
                <li>Legal</li>
              </Link> */}
             
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/Faqs`}
                className="to_CMS "
              >
                <li>FAQs</li>
              </Link>
              <li
                className="to_CMS cookie no_cursor"
              >
                Blogs
              </li>
              {/* <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/blogsmain`}
                className="to_CMS"
              >
                <li>Blogs</li>
              </Link> */}
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/career`}
                className="to_CMS "
              >
                <li>Career</li>
              </Link>
              <li
                className="to_CMS cookie no_cursor"
              >
                Training
              </li>
                {/* <Link
                to={``}
                className="to_CMS"
              >
                <li>Training</li>
              </Link> */}
            </ul>
          </div>
          {isCookies && <Cookiespermission closePOPup={setisCookies} />}
        </div>
      </div>
      <div className="footer_mobile_view">
        <MobileFooterAccordions />
      </div>
      <div className="Copyright">
        <div>
          <p>Copyrights @2022 TEXUB. All Rights Reserved</p>
          <p>
            All logos, products and pictures shown are for illustrative purpose.
            Logos belongs to their respective owners.
          </p>
        </div>
        <Link
          to={`/${
            customnostore ? customnostore : geo?.country_name
          }/privacypolicy/${currencyData?.[2]?.staticPages?.privacy}`}
          className="to_CMS"
        >
          <p>Privacy Policy</p>
        </Link>
        <Link
          to={`/${
            customnostore ? customnostore : geo?.country_name
          }/termsofuse/${currencyData?.[2]?.staticPages?.terms}`}
          className="to_CMS"
        >
          <p>Terms of Use</p>
        </Link>
      </div>
      <div className="User_Details">
        <Link to={`/${customnostore ? customnostore : geo?.country_name}`}>
          <img className="FooterUser" src={User} alt="" />
        </Link>
        <Link to={`/${customnostore ? customnostore : geo?.country_name}`}>
          <img className="FooterLike" src={Like} alt="" />
        </Link>
        <Link to={`/${customnostore ? customnostore : geo?.country_name}`}>
          <img className="FooterHome" src={Home} alt="" />
        </Link>
        <Link to={`/${customnostore ? customnostore : geo?.country_name}`}>
          <img className="FooterShop" src={Shopping} alt="" />
        </Link>
      </div>
    </div>
  );
};

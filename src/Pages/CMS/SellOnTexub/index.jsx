import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useStateValue } from "../../../store/state";
import topbanner from "../../../Assets/SellerOnTexub/banner/topbanner.png";
import mobile_slider from "../../../Assets/SellerOnTexub/banner/mobile_slider.png";
import btnbanner from "../../../Assets/SellerOnTexub/banner/btn_banner.png";
import questionMark from "../../../Assets/SellerOnTexub/question_mark.png";
import benefits1 from "../../../Assets/SellerOnTexub/benefits1.png";
import benefits2 from "../../../Assets/SellerOnTexub/benefits2.png";
import benefits3 from "../../../Assets/SellerOnTexub/benefits3.png";
import benefits4 from "../../../Assets/SellerOnTexub/benefits4.png";
import benefits5 from "../../../Assets/SellerOnTexub/benefits5.png";
import benefits6 from "../../../Assets/SellerOnTexub/benefits6.png";
import benefits7 from "../../../Assets/SellerOnTexub/benefits7.png";
import benefits8 from "../../../Assets/SellerOnTexub/benefits8.png";
import benefits9 from "../../../Assets/SellerOnTexub/benefits9.png";
import benefits10 from "../../../Assets/SellerOnTexub/benefits10.png";
import benefits11 from "../../../Assets/SellerOnTexub/benefits11.png";
import benefits12 from "../../../Assets/SellerOnTexub/benefits12.png";

import process_flow1 from "../../../Assets/SellerOnTexub/process_flow1.png";
import process_flow2 from "../../../Assets/SellerOnTexub/process_flow2.png";
import mobile_process_flow1 from "../../../Assets/SellerOnTexub/mobile_process_flow1.png";
import mobile_process_flow2 from "../../../Assets/SellerOnTexub/mobile_process_flow2.png";
import ourReactInfo from "../../../Assets/SellerOnTexub/our_react_info.png";

import whyChooseBg1 from "../../../Assets/SellerOnTexub/why_choose_bg1.png";
import whyChooseBg2 from "../../../Assets/SellerOnTexub/why_choose_bg2.png";
import whyChooseBg3 from "../../../Assets/SellerOnTexub/why_choose_bg3.png";

import SellerDashboard from "../../../Assets/SellerOnTexub/slider/SellerDashboardPage.png";
import SellerInventory from "../../../Assets/SellerOnTexub/slider/SellerInventoryPage.png";
import SellerOrders from "../../../Assets/SellerOnTexub/slider/SellerOrderPage.png";
import SellerEnquery from "../../../Assets/SellerOnTexub/slider/SellerEnquiryPage.png";

import monitor from "../../../Assets/texub_buysell/monitor.png";
import red from "../../../Assets/texub_buysell/red.png";
import blue from "../../../Assets/texub_buysell/blue.png";
import green from "../../../Assets/texub_buysell/green.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Helmet } from "react-helmet-async";

function Index() {
  const [{ geo, homeContent, customnostore }, dispatch] = useStateValue();

  const whysell = [
    {
      title: "Expand Your Horizons",
      subTitle:
        "TEXUB serves as an ideal channel facilitator as it overcomes the physical limitations of customer reach. The platform supports sellers in establishing themselves in global markets.",
      img_bg: whyChooseBg1,
    },
    {
      title: "Increases Sales at Lower Cost",
      subTitle:
        "By diversifying buyers and broadening geographies, TEXUB provides expansion opportunities for businesses both large and small without additional operational costs.",
      img_bg: whyChooseBg2,
    },
    {
      title: "Easy Management",
      subTitle:
        "Once you sign up on our platform, you can easily list as many products as you like and add numerous users to administer the business. Be in the limelight by offering great deals. Experience transparent order processing and settlement. Above all gain many more advantages without any complexities. ",
      img_bg: whyChooseBg3,
    },
  ];

  const benefitsInfo = [
    { title: "Sell Globally With Multiple Hubs", image: benefits1 },
    {
      title: "Create Better Demand For Your Products Globally",
      image: benefits2,
    },
    { title: "Reduce Credit Risks", image: benefits3 },
    { title: "Add Multiple Users With User Specific Roles", image: benefits4 },
    { title: "Upload Multiple Products With Ease", image: benefits5 },
    {
      title: "Boost Your Revenue And Reduce Operational Cost",
      image: benefits6,
    },
    { title: "Be In Spotlight By Offering Deals And Offers", image: benefits7 },
    { title: "Set MOQ As Per Your Requirements", image: benefits8 },
    { title: "Define Regional Restrictions", image: benefits9 },
    { title: "Dedicated TEXUB Account Manager", image: benefits10 },
    { title: "Transparent Order Processing And Payout", image: benefits11 },
    { title: "Live Auction For Stock Clearance", image: benefits12 },
  ];

  const [container, setcontainer] = useState([
    { color: green },
    { color: red },
    { color: blue },
  ]);
  const [content, setcontent] = useState([]);
  // const NextArrow = ({ onClick }) => {
  //     return (
  //       <div className="nextArrow" onClick={onClick}>
  //         <i className="fa fa-angle-right"></i>
  //       </div>
  //     );
  //   };
  //   const PrevArrow = ({ onClick }) => {
  //     return (
  //       <div className="prevArrow" onClick={onClick}>
  //         <i className="fa fa-angle-left"></i>
  //       </div>
  //     );
  //   };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const setting1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    // nextArrow: <NextArrow onClick />,
    // prevArrow: <PrevArrow onClick />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const testimonialsdata = [
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Tom Gordon",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Christine Hawkins",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Jonathan Estrada",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Christine Hawkins",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Tom Gordon",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed",
      name: "Jonathan Estrada",
    },
  ];

  useEffect(() => {
    let count = 0;
    testimonialsdata?.map((td) => {
      setcontent((prevState) => [
        ...prevState,
        {
          name: td?.name,
          content: td?.content,
          bg: container[1]?.color,
        },
      ]);
      count++;
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>TEXUB | Sell on TEXUB </title>
        <meta
          name="description"
          content="Go global with a single click. Sell on TEXUB. Conquer the Global Market. By registering with us."
          data-react-helmet="true"
        />
      </Helmet>
      <div className="sellerontexub">
        <div className="topsection__banner">
          <img src={topbanner} alt="" className="desktop-view" />
          <img src={mobile_slider} alt="" className="mobile-view" />
          <div className="seller__topbanner__floatingtext">
            <p className="topbanner__text1">Go global with a single click.</p>
            <p className="topbanner__text2">Sell on TEXUB</p>
          </div>
        </div>

        <div className="sellontexub__info">
          <div className="sellontexub_info_content">
            <div className="content">
              <h2>Conquer the Global Market </h2>
              <p>
                By registering with us you can take your company online and
                reach consumers all around the world. Make the most of our
                user-friendly website by listing your items online, sharing
                quotations, competing with your competitors, selling online, and
                gaining loyal clients all over the world.
              </p>
            </div>
          </div>
        </div>

        <div className="whysellontexub__info">
          <div className="whysellontexub__info_section">
            <div className="whysellontexub_title content-title">
              <h2 className="title">Why Sell on TEXUB?</h2>
            </div>
            <div className="whysellontexub__content__section">
              <div className="whysellontexub__content1">
                {whysell.map((data, index) => (
                  <div className="section" key={index}>
                    <img src={data.img_bg} alt="" className="content_bg" />
                    <span className="sub-title">{data.title}</span>
                    <span className="sub-content">{data.subTitle}</span>
                  </div>
                ))}
              </div>
              <div className="whysellontexub__content2">
                <img src={questionMark} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="btn_banner_section">
          <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/register/seller`}
          >
            <Button variant="contained" className="reg_btn">
              Register as Seller
            </Button>
          </Link>
        </div>

        <div className="seller_benefits_section">
          <div className="seller_benefits_block">
            <div className="benefits_section_title content-title">
              <h2 className="title">Seller Benefits</h2>
            </div>
            <div className="benefits_section_content">
              {benefitsInfo.map((data, index) => (
                <div className="benefits_info" key={index}>
                  <img src={data.image} alt="" />
                  <span className="content">{data.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="seller_process_section">
          <div className="seller_process_block">
            <div className="process_section_title content-title">
              <h2 className="title">Seller Process</h2>
            </div>
            <div className="process_flow_section">
              <span className="process_flow_info">
                <img src={process_flow1} alt="" className="desktop-view" />
                <img
                  src={mobile_process_flow1}
                  alt=""
                  className="mobile-view"
                />
              </span>
              <span className="process_flow_info">
                <img src={process_flow2} alt="" className="desktop-view" />
                <img
                  src={mobile_process_flow2}
                  alt=""
                  className="mobile-view"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="sellontexub_slider">
          <div className="sellontexub__monitordata">
            <div className="process_section_title content-title">
              <h2 className="title">Sneak Peak Inside Seller Dashboard</h2>
            </div>
            <div className="sellontexub_monitortop"></div>
            <div className="sellontexub_monitorbottom"></div>
            <div className="sellontexub__monitor__carousel">
              <Slider {...settings}>
                {/* <div><img src={monitor} /></div> */}
                <div>
                  <img src={SellerDashboard} />
                </div>
                <div>
                  <img src={SellerInventory} />
                </div>
                <div>
                  <img src={SellerOrders} />
                </div>
                <div>
                  <img src={SellerEnquery} />
                </div>
              </Slider>
            </div>
            <img src={monitor} className="sellontexub__monitor" alt="" />
          </div>
          {/* <div className='sellontexub__testimonials'>
                    <h2>Testimonials</h2>
                    <ul>
                        <Slider {...setting1}>
                            {content?.length && content?.map((c, i) =>
                                <li key={i}>
                                    <img src={c?.bg} alt="" />
                                    <h3>{c?.name}</h3>
                                    <p>{c?.content}</p>
                                </li>
                            )}
                        </Slider>
                    </ul>
                </div> */}
        </div>

        <div className="btn_banner_section">
          <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/register/seller`}
          >
            <Button variant="contained" className="reg_btn">
              Register as Seller
            </Button>
          </Link>
          {/* <button class="reg_btn">Register as Seller</button>  */}
        </div>

        <div className="our_reach_section">
          <div className="our_reach__block">
            <div className="our_reach_section_title content-title">
              <h2 className="title">Our Reach</h2>
            </div>
            <div className="our_react_img">
              <img src={ourReactInfo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;

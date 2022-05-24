import React, { useState, useEffect } from 'react'
import './styles.scss'
import { Link } from "react-router-dom";
import {
  Button,
} from "@mui/material";
import { useStateValue } from "../../../store/state";
import topbanner from "../../../Assets/BuyOnTexub/banner/topbanner.png";
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



import process_flow1 from "../../../Assets/BuyOnTexub/process_flow1.png";
import process_flow2 from "../../../Assets/BuyOnTexub/process_flow2.png";
import ourReactInfo from "../../../Assets/SellerOnTexub/our_react_info.png";


import whyChooseBg1 from "../../../Assets/SellerOnTexub/why_choose_bg1.png";
import whyChooseBg2 from "../../../Assets/SellerOnTexub/why_choose_bg2.png";
import whyChooseBg3 from "../../../Assets/SellerOnTexub/why_choose_bg3.png";

import monitor_scroll from "../../../Assets/BuyOnTexub/slider/monitor_scroll_buyer.png";
import monitor from '../../../Assets/texub_buysell/monitor.png'

import red from '../../../Assets/texub_buysell/red.png'
import blue from '../../../Assets/texub_buysell/blue.png'
import green from '../../../Assets/texub_buysell/green.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




function Index() {
    const [{ geo, homeContent, customnostore }, dispatch] = useStateValue();


    const whysell = [
        {title: 'Global Products', subTitle: 'Our digital platform displays a list of global merchants from which you can pick and trade. Furthermore, you may source and purchase high-quality items from all around the world from your comfort zone.', img_bg: whyChooseBg1 },
        {title: 'Verified Sellers', subTitle: 'We take considerable care in verifying our sellers. Furthermore, we ensure that we only have verified sellers who sell genuine and high-quality products through our website.', img_bg: whyChooseBg2 },
        {title: 'Special offers and Deals', subTitle: "At our digital marketplace you can avail products at better prices than traditional market. You can also keep an eye on hot deals that's displayed on the website from time to time.", img_bg: whyChooseBg3 }
    ]

     const benefitsInfo = [
        {title: 'Buy Globally With Multiple Hubs',  image: benefits1 },
        {title: 'Enhance Your Pool Of Suppliers',  image: benefits2 },
        {title: 'Reduced Buying Price',  image: benefits3 },
        {title: 'Buy Hassle-Free From Verified Sellers Worldwide',  image: benefits4 },
        {title: 'Compare Prices From Pools Of Sellers Globally',  image: benefits5 },
        {title: 'Pro-Active RMA Support',  image: benefits6 },
        {title: 'Special Offers And Deals',  image: benefits7 },
        {title: 'Track Your Shipments',  image: benefits8 },
        {title: 'Add Multiple Users With User Specific Roles',  image: benefits9 },
        {title: 'Upload Multiple Products With Ease',  image: benefits10 },
     ]

      const [container, setcontainer] = useState([{color: green}, {color: red}, {color: blue}])
    const [content, setcontent] = useState([])
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
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed',
            name: 'Tom Gordon'
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed',
            name: 'Christine Hawkins'
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed',
            name: 'Jonathan Estrada'
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed',
            name: 'Christine Hawkins'
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed',
            name: 'Tom Gordon'
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ipsum dolor sit amet, consectetur adipiscing elit, sed dolor sit amet, consectetur adipiscing elit, sed',
            name: 'Jonathan Estrada'
        },
      ]

      useEffect(() => {
        let count = 0
        testimonialsdata?.map(td => {
            setcontent(prevState => [
                ...prevState,
                {
                    name: td?.name,
                    content: td?.content,
                    bg: container[1]?.color
                }
            ])
            count++
            }
        )
      }, [])
      console.log(content)




return (
      <div className='buyontexub'>
            <div className='topsection__banner'>
                <img src={topbanner} alt="" />
                <div className="buy__topbanner__floatingtext">
                    <p className="topbanner__text1">Buy from the top sellers </p>
                    <p className="topbanner__text2">Buy on TEXUB</p>
                </div>
            </div>

             <div className='sellontexub__info'>
                <div className='sellontexub_info_content'>
                    <div className='content'>
                        <h2>Ease of purchase </h2>
                        <p>Connect with a plethora of certified suppliers online to purchase bulk goods.  You can browse through a variety of products, get quotes, compare and then make a purchase on a single platform.</p>
                    </div>
                </div>
            </div>

            <div className='whysellontexub__info'>
                <div className='whysellontexub__info_section'>
                    <div className='whysellontexub_title content-title'>
                        <h2 className='title'>Why should you buy from TEXUB?</h2>
                    </div>
                    <div className='whysellontexub__content__section'>
                        <div className='whysellontexub__content1'>
                             {whysell.map(data => 
                                <div className='section'>
                                    <img src={data.img_bg} alt="" className='content_bg'/>
                                    <span className='sub-title'>{data.title}</span>
                                    <span className='sub-content'>{data.subTitle}</span>
                                    
                                </div>
                            )}
                        </div>
                        <div className='whysellontexub__content2'>
                            <img src={questionMark} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='btn_banner_section'>
                <Link
                    to={`/${customnostore ? customnostore : geo?.country_name}/register/buyer`}
                >
                    <Button
                    variant="contained"
                    className='reg_btn'
                    
                    >
                    Register as Buyer
                    </Button>
                </Link>
            </div>

            <div className='buy_benefits_section'>
                <div className='buy_benefits_block'>
                    <div className='benefits_section_title content-title'>
                        <h2 className='title'>Buyer Benefits</h2>
                    </div>
                    <div className='benefits_section_content'>
                        {benefitsInfo.map(data =>  
                            <div className='benefits_info'>
                                <img src={data.image}alt="" /> 
                                <span className='content'>{data.title}</span>
                            </div>
                         )}
                    </div>
                </div>
            </div>

            <div className='buy_process_section'>
                <div className='buy_process_block'>
                    <div className='process_section_title content-title'>
                        <h2 className='title'>Buyer Process</h2>
                    </div>
                    <div className='process_flow_section'>
                        <span className='process_flow_info'>
                              <img src={process_flow1} alt="" />
                        </span>
                         <span className='process_flow_info'>
                              <img src={process_flow2} alt="" />
                        </span>
                    </div>
                </div>
            </div>


            <div className='buyontexub_slider'>
                <div className='buyontexub__monitordata'>
                     <div className='process_section_title content-title'>
                        <h2 className='title'>Sneak Peak Inside Buyer Dashboard</h2>
                    </div>
                    <div className='buyontexub_monitortop'></div>
                    <div className='buyontexub_monitorbottom'></div>
                    <div className="buyontexub__monitor__carousel">
                        <Slider {...settings}>
                            {/* <div><img src={monitor} /></div> */}
                            <div><img src={monitor_scroll} /></div>
                            <div><img src={monitor_scroll} /></div>
                            <div><img src={monitor_scroll} /></div>
                        </Slider>
                    </div>
                    <img src={monitor} className="buyontexub__monitor"  alt="" />   
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



            <div className='btn_banner_section'>
                   <Link
                    to={`/${customnostore ? customnostore : geo?.country_name}/register/buyer`}
                >
                    <Button
                    variant="contained"
                    className='reg_btn'
                    
                    >
                    Register as Buyer
                    </Button>
                </Link>
            </div>

             <div className='our_reach_section'>
                <div className='our_reach__block'>
                    <div className='our_reach_section_title content-title'>
                        <h2 className='title'>Our Reach</h2>
                    </div>
                    <div className='our_react_img'>
                        <img src={ourReactInfo} alt="" />
                    </div>
                </div>
            </div>
        </div>

    )}

export default Index
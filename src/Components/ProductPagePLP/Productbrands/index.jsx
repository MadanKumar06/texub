import React, { useState } from "react";
import "./styles.scss";

import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import hpcolor from "../../../Assets/Productlist/hp_color.png";
import hp from "../../../Assets/Productlist/hp_icon.png";
import dell from "../../../Assets/Productlist/dell_icon.png";
import apple from "../../../Assets/Productlist/apple_icon.png";
import acer from "../../../Assets/Productlist/acer_icon.png";
import windows from "../../../Assets/Productlist/windows_icon.png";
import samsung from "../../../Assets/Productlist/samsung_icon.png";
import { SliderBrands, Notebook } from "./Sliderjson";

const Slides = () =>
  [
    { id: 1, Image: hp },
    { id: 2, Image: dell },
    { id: 3, Image: apple },
    { id: 4, Image: acer },
    { id: 5, Image: samsung },
    { id: 6, Image: hpcolor },
    { id: 7, Image: dell },
    { id: 8, Image: windows },
    { id: 9, Image: hpcolor },
  ].map((num) => (
    <div key={num.id} className="ProductBrand_first_Slider">
      <img src={num.Image} alt=" " className="Slider_icons" />
    </div>
  ));
//   const Brands = ()=>[
//     {id:1,name:"Laptops",},
//     {id:2,name:"Notebook",},
//     {id:3,name:"Desktop",},
//     {id:4,name:"Tablets",},
//     {id:5,name:"Printers",},
//     {id:6,name:"Scanners",},
//     {id:7,name:"Mobiles",},
//     {id:8,name:"Monitors",},
//     {id:9,name:"Convertibles",},
//     {id:10,name:"Chromebook",},
// ].map((item) => (
//   <div key={item.id} className="ProductBrand_second_Slider">
//    <span className="Slider_brands" onClick={(e) => Laptop(item)} > {item.name}</span>
//   </div>
// ));

const Productsbrands = () => {
  const [isChange, setisChange] = useState()
  const handleChange = () => {
    setisChange(!isChange)
  }

// const [isLaptops, setisLaptops] = useState(false);
// const Laptop = () => {
//   setisLaptops(!isLaptops)
//   // setisNotebooks(false)
//   // setisDesktop(false)
//   // setisTablets(false)
//   // setisPrinters(false)
//   // setisScanners(false)
//   // setisMobiles(false)
//   // setisMonitors(false)
//   // setisConvertibles(false)
//   // setisChromebook(false)
// }
// // const [isNotebooks, setisNotebooks] = useState(false);
// // const Notebooks = () => {
// //   setisNotebooks(!isNotebooks)
// //   setisLaptops(false)
// //   setisDesktop(false)
// //   setisTablets(false)
// //   setisPrinters(false)
// //   setisScanners(false)
// //   setisMobiles(false)
// //   setisMonitors(false)
// //   setisConvertibles(false)
// //   setisChromebook(false)
// // }
// // const [isDesktop, setisDesktop] = useState(false);
// // const desktop = () => {
// //   setisDesktop(!isDesktop)
// //   setisLaptops(false)
// //   setisNotebooks(false)
// //   setisTablets(false)
// //   setisPrinters(false)
// //   setisScanners(false)
// //   setisMobiles(false)
// //   setisMonitors(false)
// //   setisConvertibles(false)
// //   setisChromebook(false)
// // }
// // const [isTablets, setisTablets] = useState(false);
// // const tablet = () => {
// //   setisTablets(!isTablets)
// //   setisDesktop(false)
// //   setisLaptops(false)
// //   setisNotebooks(false)
// //   setisPrinters(false)
// //   setisScanners(false)
// //   setisMobiles(false)
// //   setisMonitors(false)
// //   setisConvertibles(false)
// //   setisChromebook(false)
// // }
// // const [isPrinters, setisPrinters] = useState(false);
// // const printer = () => {
// //   setisPrinters(!isPrinters)
// //   setisDesktop(false)
// //   setisLaptops(false)
// //   setisNotebooks(false)
// //   setisTablets(false)
// //   setisScanners(false)
// //   setisMobiles(false)
// //   setisMonitors(false)
// //   setisConvertibles(false)
// //   setisChromebook(false)
// // }
// // const [isScanners, setisScanners] = useState(false);
// // const scanner = () => {
// //   setisScanners(!isScanners)
// //   setisPrinters(false)
// //   setisDesktop(false)
// //   setisLaptops(false)
// //   setisNotebooks(false)
// //   setisTablets(false)
// //   setisMobiles(false)
// //   setisMonitors(false)
// //   setisConvertibles(false)
// //   setisChromebook(false)
// // }
// // const [isMobiles, setisMobiles] = useState(false);
// // const mobile = () => {
// //   setisMobiles(!isMobiles)
// //   setisPrinters(false)
// //   setisDesktop(false)
// //   setisLaptops(false)
// //   setisNotebooks(false)
// //   setisTablets(false)
// //   setisScanners(false)
// //   setisMonitors(false)
// //   setisConvertibles(true)
// //   setisChromebook(false)
// // }
// // const [isMonitors, setisMonitors] = useState(false);
// // const monitor = () => {
// //   setisMonitors(!isMonitors)
// //   setisPrinters(false)
// //   setisDesktop(false)
// //   setisLaptops(false)
// //   setisNotebooks(false)
// //   setisTablets(false)
// //   setisScanners(false)
// //   setisMobiles(false)
// //   setisConvertibles(false)
// //   setisChromebook(false)
// // }
// // const [isConvertibles, setisConvertibles] = useState(false);
// // const convertible = () => {
// //   setisConvertibles(!isConvertibles)
// //   setisPrinters(false)
// //   setisDesktop(false)
// //   setisLaptops(false)
// //   setisNotebooks(false)
// //   setisTablets(false)
// //   setisScanners(false)
// //   setisMobiles(false)
// //   setisMonitors(false)
// //   setisChromebook(false)
// // }
// // const [isChromebook, setisChromebook] = useState(false);
// // const chromebook = () => {
// //   setisChromebook(!isChromebook)
// //   setisConvertibles(false)
// //   setisPrinters(false)
// //   setisDesktop(false)
// //   setisLaptops(false)
// //   setisNotebooks(false)
// //   setisTablets(false)
// //   setisScanners(false)
// //   setisMobiles(false)
// //   setisMonitors(false)
// // }
// // const brands =[
// //   {
// //     brands:Laptops,
// //     category:[
// //       {id:1, display:"Traditional Laptops", count:543,},
// //       {id:2, display:"Professional Laptops", count:67,},
// //       {id:1, display:"Gaming Laptops", count:274,},
// //     ]
// //   }
// // ]
function Arrow(props) {
  let className =
    props.type === "next" ? "Carosal_nextArrow" : "Carosal_prevArrow";
  className += " arrow";
  const char =
    props.type === "next" ? <ArrowForwardIos /> : <ArrowBackIosNew />;
  return (
    <span className={className} onClick={props.onClick}>
      {char}
    </span>
  );
}
const Productsicon = {
  dots: false,
  infinite: true,
  nextArrow: <Arrow type="next" />,
  prevArrow: <Arrow type="prev" />,
  responsive: [
    {
      breakpoint: 1921,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 2,
        initialSlide: 8,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 2,
        initialSlide: 7,
      },
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 6,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 4,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
  ],
};
const Productsbtns = {
  dots: false,
  infinite: true,
  nextArrow: <Arrow type="next" />,
  prevArrow: <Arrow type="prev" />,
  responsive: [
    {
      breakpoint: 1921,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 2,
        initialSlide: 8,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 2,
        initialSlide: 7,
      },
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 6,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 4,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

return (
  <div className="Productsbrands">
    <div className="Slider_Section">
      <Slider {...Productsicon} className="slide_Test">
        {Slides()}
      </Slider>
    </div>

    <Slider {...Productsbtns} className="slide_Test">
      {SliderBrands.map((item) => (
        <li
          key={item.id}
          className="Slider_brands">
          <span>{item.brand}</span>
        </li>
      ))}
    </Slider>
    {/* {isChange &&  
                 {SliderBrands().map() => (
                  <li
                    key={item.id} 
                    <span>{item.categiries}</span>
                  </li>
                ))}
              }  */}
  </div>
);
};
export default Productsbrands;

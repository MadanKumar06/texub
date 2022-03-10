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
import { Laptops,Notebook,Desktop,Tablet,Printer,Scanner,Mobile,Monitor,Convertible,Chromebook } from "../../Laptops";
// import { Notebook } from "../../Laptops";

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

const Productsbrands = () => {
  const [isLaptops, setisLaptops] = useState(false);
  const Laptop =() =>{
    setisLaptops(!isLaptops)
    setisNotebooks(false)
    setisDesktop(false)
    setisTablets(false)
    setisPrinters(false)
    setisScanners(false)
    setisMobiles(false)
    setisMonitors(false)
    setisConvertibles(false)
    setisChromebook(false)
  }
  const [isNotebooks, setisNotebooks] = useState(false);
  const Notebooks =() =>{
    setisNotebooks(!isNotebooks)
    setisLaptops(false)
    setisDesktop(false)
    setisTablets(false)
    setisPrinters(false)
    setisScanners(false)
    setisMobiles(false)
    setisMonitors(false)
    setisConvertibles(false)
    setisChromebook(false)
  }
  const [isDesktop, setisDesktop] = useState(false);
  const desktop =() =>{
    setisDesktop(!isDesktop)
    setisLaptops(false)
    setisNotebooks(false)
    setisTablets(false)
    setisPrinters(false)
    setisScanners(false)
    setisMobiles(false)
    setisMonitors(false)
    setisConvertibles(false)
    setisChromebook(false)
  }
  const [isTablets, setisTablets] = useState(false);
  const tablet =() =>{
    setisTablets(!isTablets)
    setisDesktop(false)
    setisLaptops(false)
    setisNotebooks(false)
    setisPrinters(false)
    setisScanners(false)
    setisMobiles(false)
    setisMonitors(false)
    setisConvertibles(false)
    setisChromebook(false)
  }
  const [isPrinters, setisPrinters] = useState(false);
  const printer =() =>{
    setisPrinters(!isPrinters)
    setisDesktop(false)
    setisLaptops(false)
    setisNotebooks(false)
    setisTablets(false)
    setisScanners(false)
    setisMobiles(false)
    setisMonitors(false)
    setisConvertibles(false)
    setisChromebook(false)
  }
  const [isScanners, setisScanners] = useState(false);
  const scanner =() =>{
    setisScanners(!isScanners)
    setisPrinters(false)
    setisDesktop(false)
    setisLaptops(false)
    setisNotebooks(false)
    setisTablets(false)
    setisMobiles(false)
    setisMonitors(false)
    setisConvertibles(false)
    setisChromebook(false)
  }
  const [isMobiles, setisMobiles] = useState(false);
  const mobile =() =>{
    setisMobiles(!isMobiles)
    setisPrinters(false)
    setisDesktop(false)
    setisLaptops(false)
    setisNotebooks(false)
    setisTablets(false)
    setisScanners(false)
    setisMonitors(false)
    setisConvertibles(true)
    setisChromebook(false)
  }
  const [isMonitors, setisMonitors] = useState(false);
  const monitor =() =>{
    setisMonitors(!isMonitors)
    setisPrinters(false)
    setisDesktop(false)
    setisLaptops(false)
    setisNotebooks(false)
    setisTablets(false)
    setisScanners(false)
    setisMobiles(false)
    setisConvertibles(false)
    setisChromebook(false)
  }
  const [isConvertibles, setisConvertibles] = useState(false);
  const convertible =() =>{
    setisConvertibles(!isConvertibles)
    setisPrinters(false)
    setisDesktop(false)
    setisLaptops(false)
    setisNotebooks(false)
    setisTablets(false)
    setisScanners(false)
    setisMobiles(false)
    setisMonitors(false)
    setisChromebook(false)
  }
  const [isChromebook, setisChromebook] = useState(false);
  const chromebook =() =>{
    setisChromebook(!isChromebook)
    setisConvertibles(false)
    setisPrinters(false)
    setisDesktop(false)
    setisLaptops(false)
    setisNotebooks(false)
    setisTablets(false)
    setisScanners(false)
    setisMobiles(false)
    setisMonitors(false)
  }
  
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
        <div className="Productbrands_Laptops_btn">
          <button
            className="Productbrands_btn_content_list"
            onClick={() =>Laptop()}
            type="button"
          >
            Laptops
          </button>
          {isLaptops && (
            <ul className="Productbrands_btn_Laptops_Dropdown">
              {Laptops.map((item) => (
                <li
                  href={item.path}
                  key={item?.count}
                  className="Productbrands_btn_Laptops_Dropdown_Content"
                >
                  {item.display} ({item.count})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="Productbrands_Laptops_btn">
          <button className="Productbrands_btn_content_list" 
          onClick={() => Notebooks()}
          type="button">
            Notebook
          </button>
          {isNotebooks && (
            <ul className="Productbrands_btn_Laptops_Dropdown">
              {Notebook.map((item) => (
                <li
                  href={item.path}
                  key={item?.count}
                  className="Productbrands_btn_Laptops_Dropdown_Content"
                >
                  {item.display} ({item.count})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="Productbrands_Laptops_btn">
          <button className="Productbrands_btn_content_list" 
          onClick={()=>desktop()}
          type="button">
            Desktop
          </button>
          {isDesktop && (
            <ul className="Productbrands_btn_Laptops_Dropdown">
              {Desktop.map((item) => (
                <li
                  href={item.path}
                  key={item?.count}
                  className="Productbrands_btn_Laptops_Dropdown_Content"
                >
                  {item.display} ({item.count})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="Productbrands_Laptops_btn">
          <button className="Productbrands_btn_content_list" 
           onClick={()=>tablet()}
          type="button">
            Tablets
          </button>
          {isTablets && (
            <ul className="Productbrands_btn_Laptops_Dropdown">
              {Tablet.map((item) => (
                <li
                  href={item.path}
                  key={item?.count}
                  className="Productbrands_btn_Laptops_Dropdown_Content"
                >
                  {item.display} ({item.count})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="Productbrands_Laptops_btn">
          <button className="Productbrands_btn_content_list"
           onClick={()=>printer()} 
          type="button">
            Printers
          </button>
          {isPrinters && (
            <ul className="Productbrands_btn_Laptops_Dropdown">
              {Printer.map((item) => (
                <li
                  href={item.path}
                  key={item?.count}
                  className="Productbrands_btn_Laptops_Dropdown_Content"
                >
                  {item.display} ({item.count})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="Productbrands_Laptops_btn">
          <button className="Productbrands_btn_content_list" 
           onClick={()=>scanner()}
          type="button">
            Scanners
          </button>
          {isScanners && (
            <ul className="Productbrands_btn_Laptops_Dropdown">
              {Scanner.map((item) => (
                <li
                  href={item.path}
                  key={item?.count}
                  className="Productbrands_btn_Laptops_Dropdown_Content"
                >
                  {item.display} ({item.count})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="Productbrands_Laptops_btn">
          <button className="Productbrands_btn_content_list"  onClick={()=>mobile()}
           type="button">
            Mobiles
          </button>
          {isMobiles && (
            <ul className="Productbrands_btn_Laptops_Dropdown">
              {Mobile.map((item) => (
                <li
                  href={item.path}
                  key={item?.count}
                  className="Productbrands_btn_Laptops_Dropdown_Content"
                >
                  {item.display} ({item.count})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="Productbrands_Laptops_btn">
          <button className="Productbrands_btn_content_list"  onClick={()=>monitor()}
          type="button">
            Monitors
          </button>
          {isMonitors && (
            <ul className="Productbrands_btn_Laptops_Dropdown">
              {Monitor.map((item) => (
                <li
                  href={item.path}
                  key={item?.count}
                  className="Productbrands_btn_Laptops_Dropdown_Content"
                >
                  {item.display} ({item.count})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="Productbrands_Laptops_btn">
          <button className="Productbrands_btn_content_list"  onClick={()=>convertible()}
          type="button">
            Convertibles
          </button>
          {isConvertibles && (
            <ul className="Productbrands_btn_Laptops_Dropdown">
              {Convertible.map((item) => (
                <li
                  href={item.path}
                  key={item?.count}
                  className="Productbrands_btn_Laptops_Dropdown_Content"
                >
                  {item.display} ({item.count})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="Productbrands_Laptops_btn">
          <button className="Productbrands_btn_content_list"   onClick={()=>chromebook()}
          type="button">
            Chromebook
          </button>
          {isChromebook && (
            <ul className="Productbrands_btn_Laptops_Dropdown">
              {Chromebook.map((item) => (
                <li
                  href={item.path}
                  key={item?.count}
                  className="Productbrands_btn_Laptops_Dropdown_Content"
                >
                  {item.display} ({item.count})
                </li>
              ))}
            </ul>
          )}
        </div>
      </Slider>
    </div>
  );
};

export default Productsbrands;

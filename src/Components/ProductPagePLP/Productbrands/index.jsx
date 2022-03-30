import React, { useState, useEffect } from "react";
import "./styles.scss";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";
import Constant from "../../../Constant";

const Productsbrands = () => {
  const [isChange, setisChange] = useState(false);
  const brand = (value) => {
    value && setisChange(value);
  };
  useEffect(() => {
    document.addEventListener("mousedown", () => {
      setisChange(false);
    });
  }, []);

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

  const [sliderBrandsAndCategories, setSliderBrandsAndCategories] = useState({
    brands: [],
    categories: [],
  });
  useEffect(() => {
    const fetchBrandsData = () => {
      axios
        .get(Constant.baseUrl() + "/getBrandList", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setSliderBrandsAndCategories((prevState) => ({
            ...prevState,
            brands: res?.data,
          }));
        })
        .catch((err) => {});
    };
    fetchBrandsData();
  }, []);
  useEffect(() => {
    const fetchCategoryData = () => {
      axios
        .get(Constant.baseUrl() + "/getCategoriesList", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setSliderBrandsAndCategories((prevState) => ({
            ...prevState,
            categories: res?.data,
          }));
        })
        .catch((err) => {});
    };
    fetchCategoryData();
  }, []);
  const Productsicon = {
    dots: false,
    infinite: true,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    responsive: [
      {
        breakpoint: 1921,
        settings: {
          slidesToShow: 15,
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
          slidesToShow: 9,
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
          {sliderBrandsAndCategories?.brands?.length &&
            sliderBrandsAndCategories?.brands?.map((itm) => (
              <div className="ProductBrand_first_Slider">
                <img
                  src={`${Constant.imageBaseUrl()}${itm?.image}`}
                  alt="brands"
                  className="Slider_icons"
                />
              </div>
            ))}
        </Slider>
      </div>
      <div className="Slider_Section">
        <Slider {...Productsbtns} className="slide_Test">
          {sliderBrandsAndCategories?.categories?.length &&
            sliderBrandsAndCategories?.categories?.map((item) => (
              <li key={item?.category?.id} className="Slider_brands">
                <span onMouseOver={() => brand(item?.category?.id)}>
                  {item?.category?.category_name}
                </span>
                {isChange && (
                  <div className="list">
                    <li className="list_content">
                      <span>
                        {item.category?.id === isChange &&
                          item?.subcategories?.length &&
                          item?.subcategories?.map((e) => (
                            <div className="content">
                              <span>
                                <p>{e.category_name}</p>
                                {/* <p>{e.count}</p> */}
                              </span>
                            </div>
                          ))}
                      </span>
                    </li>
                  </div>
                )}
              </li>
            ))}
        </Slider>
      </div>
    </div>
  );
};
export default Productsbrands;

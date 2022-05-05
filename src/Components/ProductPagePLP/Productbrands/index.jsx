import React, { useState, useEffect } from "react";
import "./styles.scss";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useStateValue } from "../../../store/state";

import axios from "axios";
import Constant from "../../../Constant";
import SimpleLoader from "../../../Components/SimpleLoader";

const Productsbrands = ({
  setProductFetchApi,
  getCategories,
  setApplyFilter,
  applyFilter,
}) => {
  const [{ isSimpleLoading }, dispatch] = useStateValue();
  const [isChange, setisChange] = useState(false);
  const [isBrandSelected, setIsBrandSelected] = useState(null);
  const [isCategorySelected, setIsCategorySelected] = useState(null);
  const brand = (value) => {
    value && setisChange(value);
  };

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
      dispatch({
        type: "SET_IS_SIMPLE_LOADING",
        value: true,
      });
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
          dispatch({
            type: "SET_IS_SIMPLE_LOADING",
            value: false,
          });
        })
        .catch((err) => {
          dispatch({
            type: "SET_IS_SIMPLE_LOADING",
            value: false,
          });
        });
    };
    fetchBrandsData();
  }, []);

  useEffect(() => {
    if (getCategories?.length) {
      setIsCategorySelected(
        JSON.parse(localStorage.getItem("all_category_id"))
      );
    }
  }, [getCategories]);
  const Productsicon = {
    dots: false,
    infinite: false,
    slidesToShow: 15,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    responsive: [
      {
        breakpoint: 1921,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
          initialSlide: 8,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          initialSlide: 7,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          initialSlide: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
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
    slidesToShow: 15,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    responsive: [
      {
        breakpoint: 1921,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 1,
          initialSlide: 9,
        },
      },
      {
        breakpoint: 1660,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
          initialSlide: 8,
        },
      },
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          initialSlide: 7,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          initialSlide: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
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
      <>
        {isSimpleLoading ? (
          <SimpleLoader />
        ) : (
          <div className="Slider_Section">
            <Slider {...Productsicon} className="slide_Test">
              {sliderBrandsAndCategories?.brands?.length &&
                sliderBrandsAndCategories?.brands?.map((itm) => (
                  <div
                    className={`ProductBrand_first_Slider brand_slider ${
                      isBrandSelected === itm?.option_id && "selected_slider"
                    }`}
                    onClick={() => {
                      setProductFetchApi((prevState) => ({
                        ...prevState,
                        brand_id: itm?.option_id,
                      }));
                      setIsBrandSelected(itm?.option_id);
                      setApplyFilter(!applyFilter);
                    }}
                  >
                    <img
                      src={`${Constant.imageBaseUrl()}${itm?.image}`}
                      alt="brands"
                      className="Slider_icons"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        )}
      </>
      <>
        {isSimpleLoading ? (
          <SimpleLoader />
        ) : (
          <div className="Slider_Section">
            <Slider {...Productsbtns} className="slide_Test">
              {getCategories?.length &&
                getCategories?.map((item) => (
                  <li
                    key={item?.category?.id}
                    className={`Slider_brands ${
                      isCategorySelected === item?.category?.id &&
                      "selected_category"
                    }`}
                    onClick={() => {
                      setProductFetchApi((prevState) => ({
                        ...prevState,
                        category_id: item?.category?.id,
                      }));
                      setIsCategorySelected(item?.category?.id);
                      setApplyFilter(!applyFilter);
                    }}
                    onMouseOver={() => brand(item?.category?.id)}
                  >
                    <span>{item?.category?.category_name}</span>
                    {isChange && (
                      <div className="list">
                        <li className="list_content">
                          <span>
                            {item.category?.id === isChange &&
                              item?.subcategories?.length &&
                              item?.subcategories?.map((e) => (
                                <div
                                  className="content"
                                  onClick={() => {
                                    setProductFetchApi((prevState) => ({
                                      ...prevState,
                                      category_id: item?.id,
                                    }));
                                    setApplyFilter(!applyFilter);
                                  }}
                                >
                                  <span>
                                    <p>{e.category_name}</p>
                                    <p>({e.count})</p>
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
        )}
      </>
    </div>
  );
};
export default Productsbrands;

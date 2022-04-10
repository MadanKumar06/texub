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
  productFetchApi,
  getCategories,
}) => {
  const [{ isSimpleLoading }, dispatch] = useStateValue();
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
  // useEffect(() => {
  //   const fetchCategoryData = () => {
  //     axios
  //       .get(Constant.baseUrl() + "/getCategoriesList", {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         setSliderBrandsAndCategories((prevState) => ({
  //           ...prevState,
  //           categories: res?.data,
  //         }));
  //       })
  //       .catch((err) => {});
  //   };
  //   fetchCategoryData();
  // }, []);
  const Productsicon = {
    dots: false,
    infinite: false,
    slidesToShow: 15,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    responsive: [
      {
        breakpoint: 192,
        settings: {
          slidesToShow: 15,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
    ],
  };
  const Productsbtns = {
    dots: false,
    infinite: true,
    slidesToShow: 15,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 15,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 2,
          initialSlide: 3,
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
                    className="ProductBrand_first_Slider"
                    onClick={() =>
                      setProductFetchApi((prevState) => ({
                        ...prevState,
                        brand_id: itm?.option_id,
                      }))
                    }
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
                    className="Slider_brands"
                    onClick={() =>
                      setProductFetchApi((prevState) => ({
                        ...prevState,
                        category_id: item?.category?.id,
                      }))
                    }
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
                                  onClick={() =>
                                    setProductFetchApi((prevState) => ({
                                      ...prevState,
                                      category_id: item?.id,
                                    }))
                                  }
                                >
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
        )}
      </>
    </div>
  );
};
export default Productsbrands;

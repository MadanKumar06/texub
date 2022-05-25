import React from "react";
import "./Favorites.scss";
import { useStateValue } from "../../../store/state";
import { useNavigate } from "react-router-dom";

export const Favorites = ({ data }) => {
  const history = useNavigate();
  const [{ geo, customnostore }, dispatch] = useStateValue();

  // When the user clicks on the button, scroll to the top of the document
  const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  const handleChange = (url) => {
    if (url === "todays_deal") {
      history(
        `/${customnostore ? customnostore : geo?.country_name}/products`,
        {
          state: { name: "todays_deal", value: 1 },
        }
      );
    } else if (url === "price_drop") {
      history(
        `/${customnostore ? customnostore : geo?.country_name}/products`,
        {
          state: { name: "price_drop", value: 1 },
        }
      );
    } else if (url === "new_product") {
      history(
        `/${customnostore ? customnostore : geo?.country_name}/products`,
        {
          state: { name: "new_product", value: 1 },
        }
      );
    }
  };

  return (
    <>
      <div className="Favorites">
        <div
          className="Favorites_Sections"
          onClick={() => handleChange(data?.url_1)}
        >
          <img className="Favorites_Images" src={data?.image_1} alt="" />
          <h5 className="Favorites_Deals">{data?.title_1}</h5>
        </div>
        <div
          className="Favorites_Sections"
          onClick={() => handleChange(data?.url_2)}
        >
          <img className="Favorites_Images" src={data?.image_2} alt="" />
          <h5 className="Favorites_Deals">{data?.title_2}</h5>
        </div>

        <div
          className="Favorites_Sections"
          onClick={() => handleChange(data?.url_3)}
        >
          <img className="Favorites_Images" src={data?.image_3} alt="" />
          <h5 className="Favorites_Deals">{data?.title_3}</h5>
        </div>
        <div className="Favorites_Sections" onClick={() => scrollTop()}>
          <img className="Favorites_Images" src={data?.image_4} alt="" />
          <h5 className="Favorites_Deals">{data?.title_4}</h5>
        </div>
        <div className="Favorites_Sections" onClick={() => scrollTop()}>
          <img className="Favorites_Images2" src={data?.image_5} alt="" />
          <h5 className="Favorites_Deals">{data?.title_5}</h5>
        </div>
      </div>
    </>
  );
};

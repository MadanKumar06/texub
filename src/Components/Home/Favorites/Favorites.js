import React from "react";
import "./Favorites.scss";
import Img1 from "../../../Assets/Homepage Assets/Group 66.png";
import Img2 from "../../../Assets/Homepage Assets/Group 67.png";
import Img3 from "../../../Assets/Homepage Assets/Group 68.png";
import Img4 from "../../../Assets/Homepage Assets/Group 69.png";
import Img5 from "../../../Assets/Homepage Assets/Group 70.png";

export const Favorites = ({ data }) => {
  return (
    <div className="Favorites">
      <div className="Favorites_Sections">
        <img className="Favorites_Images" src={data?.image_1} alt="" />
        <h5 className="Favorites_Deals">{data?.title_1}</h5>
      </div>
      <div className="Favorites_Sections">
        <img className="Favorites_Images" src={data?.image_2} alt="" />
        <h5 className="Favorites_Deals">{data?.title_2}</h5>
      </div>

      <div className="Favorites_Sections">
        <img className="Favorites_Images" src={data?.image_3} alt="" />
        <h5 className="Favorites_Deals">{data?.title_3}</h5>
      </div>
      <div className="Favorites_Sections">
        <img className="Favorites_Images" src={data?.image_4} alt="" />
        <h5 className="Favorites_Deals">J{data?.title_4}</h5>
      </div>
      <div className="Favorites_Sections">
        <img className="Favorites_Images2" src={data?.image_5} alt="" />
        <h5 className="Favorites_Deals">{data?.title_5}</h5>
      </div>
    </div>
  );
};

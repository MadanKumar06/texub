import React from "react";
import "./Favorites.css";
import Img1 from "../../../Assets/Homepage Assets/Group 66.png";
import Img2 from "../../../Assets/Homepage Assets/Group 67.png";
import Img3 from "../../../Assets/Homepage Assets/Group 68.png";
import Img4 from "../../../Assets/Homepage Assets/Group 69.png";
import Img5 from "../../../Assets/Homepage Assets/Group 70.png";

export const Favorites = () => {
  return (
    <div className="Favorites">
      <div className="Favorites_Sections">
        <img className="Favorites_Images" src={Img5} alt="" />
        <h5 className="Favorites_Deals">Today's Deal</h5>
      </div>
      <div className="Favorites_Sections">
        <img className="Favorites_Images" src={Img4} alt="" />
        <h5 className="Favorites_Deals">Price Drop</h5>
      </div>

      <div className="Favorites_Sections">
        <img className="Favorites_Images" src={Img3} alt="" />
        <h5 className="Favorites_Deals">Just Launched</h5>
      </div>
      <div className="Favorites_Sections">
        <img className="Favorites_Images" src={Img2} alt="" />
        <h5 className="Favorites_Deals">Just Sold</h5>
      </div>
      <div className="Favorites_Sections">
        <img className="Favorites_Images2" src={Img1} alt="" />
        <h5 className="Favorites_Deals">Top Searches</h5>
      </div>
    </div>
  );
};

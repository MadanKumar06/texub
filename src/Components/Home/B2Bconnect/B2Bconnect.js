import React from "react";
import "./B2Bconnect.scss";
import Card1 from "../../../Assets/Homepage Assets/OLS5890.png";
import Card3 from "../../../Assets/Homepage Assets/8014.png";
import Card2 from "../../../Assets/Homepage Assets/3517061.png";

export const B2Bconnect = () => {
  return (
    <div className="WhyTexub">
      <h2 className="Heading">Why TEXUB</h2>
      <p className="Heading_tag">
        Oppurtunity for B2B Channel to come togther and engage in productive
        conversations and crack details{" "}
      </p>
      <div className="B2B_Images_Section">
        <div className="B2B_Images">
          <img src={Card1} alt="" className="Card" />
          <p className="Card_Paragraph">Deal with the Verified Partners</p>
        </div>
        <div className="B2B_Images">
          <img src={Card2} alt="" className="Card" />
          <p className="Card_Paragraph">Avail Cashback and Great Benefits </p>
        </div>
        <div className="B2B_Images">
          <img src={Card3} alt="" className="Card" />
          <p className="Card_Paragraph">Get Logistic and insurance support</p>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import "./styles.scss";
// import { Menu, KeyboardArrowDown } from "@material-ui/icons";
import topbanner from "../../Assets/Aboutus/Group 765@2x.png";
import missionbg from "../../Assets/Aboutus/missionbg.png";
import missionstate from "../../Assets/Aboutus/missionstate.png";
import industrial from "../../Assets/Aboutus/industrial.png";
import secure from "../../Assets/Aboutus/secure.png";
import dots from "../../Assets/Aboutus/dots.png";
import buysell from "../../Assets/Aboutus/buysell.png";
import quotation from "../../Assets/Aboutus/quotation.png";
import tech from "../../Assets/Aboutus/tech.png";
import mgmt from "../../Assets/Aboutus/mgmt.png";
import simplified from "../../Assets/Aboutus/simplified.png";
import corner from "../../Assets/Aboutus/corner.png";

import integrity from "../../Assets/Aboutus/integrity.png";
import commitment from "../../Assets/Aboutus/commitment.png";
import preserverence from "../../Assets/Aboutus/preserverence.png";
import resilence from "../../Assets/Aboutus/resilence.png";
import action from "../../Assets/Aboutus/action.png";

import wwbg from "../../Assets/Aboutus/wwbg.png";
import usa from "../../Assets/Aboutus/usa.png";
import nigeria from "../../Assets/Aboutus/nigeria.png";
import nether from "../../Assets/Aboutus/nether.png";
import uae from "../../Assets/Aboutus/uae.png";
import india from "../../Assets/Aboutus/india.png";
import sg from "../../Assets/Aboutus/sg.png";
import texhub from "../../Assets/Aboutus/texhub.png";

const Aboutus = () => {
  const country = [
    { content: "USA", image: usa },
    { content: "NIGERIA", image: nigeria },
    { content: "NETHERLAND", image: nether },
    { content: "UAE", image: uae },
    { content: "INDIA", image: india },
    { content: "SINGAPORE", image: sg },
  ];

  const assets = [
    { no: "01", content: "Integrity", image: integrity, color: "#EE254B" },
    { no: "02", content: "Commitment", image: commitment, color: "#4BB1B3" },
    {
      no: "03",
      content: "Perseverance",
      image: preserverence,
      color: "#1F2E58",
    },
    { no: "04", content: "Resilience", image: resilence, color: "#F14C1C" },
    { no: "05", content: "Action", image: action, color: "#1C55F1" },
  ];

  const highlightscontent = [
    { content: "01", image: industrial, imgcontent: "B2B Trade & Auctions" },
    {
      content: "02",
      image: secure,
      imgcontent: "Secure gateway & Crypto options",
    },
    { content: "03", image: quotation, imgcontent: "Unlimited Quotes" },
    {
      content: "04",
      image: buysell,
      imgcontent: "Unlimited Access to Buying & Selling",
    },
    { content: "05", image: tech, imgcontent: "Secured Technology" },
    { content: "06", image: mgmt, imgcontent: "Easy Inventory Management" },
    {
      content: "07",
      image: simplified,
      imgcontent: "Simplified Product Upload",
    },
    { content: "08", image: corner, imgcontent: "Marketing Corner" },
  ];
  return (
    <div className="aboutus">
      <div className="aboutus__topbanner">
        <img src={topbanner} alt="" />
        <div className="aboutus__topbanner__floatingtext">
          <p className="topbanner__text1">A Secure, Safe And Seamless</p>
          <p className="topbanner__text2">Digital Marketplace</p>
        </div>
      </div>

      <div className="aboutus__mission">
        <img src={missionbg} alt="" />
        <div className="aboutus__mission__content">
          <div className="aboutus__mission__left">
            <h1>About Us</h1>
            <p>
              TEXUB is a Digital B2B Marketplace that provides a Secure
              Technology for Global B2B ICT Trade. TEXUB offers a compelling
              journey into the ICT business economy with our digital ecosystem.
              Buying & Selling experience is enhanced through our Scalable Cloud
              Platform for Manufacturers, Distributors, Resellers with the
              promise to maintain Trade Privacy.
            </p>
          </div>
          <div className="aboutus__mission__right">
            <img src={missionstate} alt="" />
            <div className="aboutus__righttext">
              <h1>Mission Statement</h1>
              <p>
                To provide safe, secure and seamless global B2B trade ecosystem
                for brands, distributors and resellers of ICT.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="aboutus__highlights">
        <h1>Highlights</h1>
        <ul>
          {highlightscontent.map((data, i) => (
            <li key={i}>
              <div className="dimagecontent">
                <img className="dimage" src={data.image} alt="" />
                <span>{data.imgcontent}</span>
              </div>
              <p>{data.content}</p>
              <img className="dot" src={dots} alt="" />
            </li>
          ))}
        </ul>
      </div>

      <div className="aboutus__assets">
        <h1>Valued Assets</h1>
        <div className="assets__images">
          {assets.map((data, i) => (
            <div className="assets__imageItem">
              <span style={{ color: data.color }} className="no">
                {data.no}
              </span>
              <img src={data.image} alt="" />
              <span className="content">{data.content}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="aboutus__worldwide">
        <h1>Our Worldwide Office</h1>
        <div className="aboutus__worldwide__content">
          <img src={wwbg} alt="" />

          <div className="aboutus__ww__country">
            {country.map((data, i) => (
              <div className="list" key={i}>
                <img src={data.image} alt="" />
                <span>{data.content}</span>
              </div>
            ))}
          </div>
        </div>
        <img src={texhub} alt="" className="tag1" />
        <img src={texhub} alt="" className="tag2" />
        <img src={texhub} alt="" className="tag3" />
        <img src={texhub} alt="" className="tag4" />
        <img src={texhub} alt="" className="tag5" />
        <img src={texhub} alt="" className="tag6" />
      </div>
    </div>
  );
};
export default Aboutus;

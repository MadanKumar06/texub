import React from "react";
import {
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@mui/material";
import "./styles.scss";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import "../../../../Pages/Aboutus/styles.scss";

import Rightarrow from "../../../../Assets/Career/Group 773.svg";
import Mask from "../../../../Assets/Career/Mask Group 2.png";
import Key from "../../../../Assets/Career/Group 1034@2x.png";
import c1 from "../../../../Assets/Career/c1.png";
import c2 from "../../../../Assets/Career/c2.png";
import c3 from "../../../../Assets/Career/c3.png";
import c4 from "../../../../Assets/Career/c4.png";
import c5 from "../../../../Assets/Career/c5.png";
import c6 from "../../../../Assets/Career/c6.png";
import wwbg from "../../../../Assets/Aboutus/Worldwide_Office.png";
import usa from "../../../../Assets/Aboutus/usa.png";
import nigeria from "../../../../Assets/Aboutus/nigeria.png";
import nether from "../../../../Assets/Aboutus/nether.png";
import uae from "../../../../Assets/Aboutus/uae.png";
import india from "../../../../Assets/Aboutus/india.png";
import sg from "../../../../Assets/Aboutus/sg.png";

const Career = () => {
  const country = [
    { content: "USA", image: usa, style: "usa" },
    { content: "NIGERIA", image: nigeria, style: "nigeria" },
    { content: "NETHERLAND", image: nether, style: "netherland" },
    { content: "UAE", image: uae, style: "uae" },
    { content: "INDIA", image: india, style: "india" },
    { content: "SINGAPORE", image: sg, style: "singapore" },
  ];
  const GridViews = [
    { img: c1 },
    { img: c2 },
    { img: c3 },
    { img: c4 },
    { img: c5 },
    { img: c6 },
  ];
  const whyJoinUs = [
    { type: "Fast Growing Company" },
    { type: "Latest Technology Stack" },
    { type: "Great Colleagues" },
    { type: "Cross Domain Exposure" },
    { type: "Competitive Salary" },
    { type: "Targeted Bonus" },
    { type: "Learning Scopes" },
    { type: "Cross Domain Exposure" },
  ];
  const JoinTexub = [
    { name: "Front End Developer", info: "Bangalore, Full Time" },
    { name: "Android Developer", info: "Bangalore, Remote" },
    { name: "Full Stack Developer", info: "Dubai, Full Time" },
    { name: "UX Designer", info: "Bangalore, Full Time" },
  ];
  return (
    <div className="career_main_container">
      <div className="career_team_section">
        <div className="banner_content">
          <p className="banner_sub_title">Ready To Make An Impact</p>
          <p className="banner_title">Join The Team</p>
          <Box className="banner_btn">
            <Button className="button-text btn-secondary">View Openings</Button>
          </Box>
        </div>

        <div className="career_team_image">
          <img src={Key} alt="" />
        </div>
      </div>
      <div className="why_joinus_section">
        <p className="title">Why Join Us</p>
        <div className="information">
          <div className="sub_info">
            {whyJoinUs?.map((itm) => (
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={<Typography>{itm?.type}</Typography>}
              />
            ))}
          </div>
          <div className="why_joinus_image">
            <img src={Mask} alt="" />
          </div>
        </div>
      </div>
      <div className="join_texub">
        <p className="join_texub_title">Want to Join Texub ?</p>
        <p className="join_texub_link">
          Check out the open positions available and click on it fill the
          application form and apply
        </p>
        <div className="join_texub_info">
          {JoinTexub.map((itm) => (
            <div className="info_content">
              <span className="name"> {itm.name}</span>
              <p>
                <span>{itm.info}</span>
                <KeyboardDoubleArrowRight />
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="joinus_culture_values">
        <p className="culture_values">
          Want To Know More About The Company ?
          <span className="culture_values_link">CLICK HERE</span>
        </p>
        <p className="joinus_culture_title">Our Culture & Values</p>
        <p className="joinus_culture_info">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
          Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat,
          Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea
          Rebum.Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem
          Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet, Consetetur
          Sadipscing Elitr,Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et
          Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Et Justo
          Duo
        </p>
        <Box sx={{ flexGrow: 1 }} className="grid_container">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {GridViews.map((itm, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <img
                  src={itm?.img}
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <div className="aboutus">
        <div className="aboutus__worldwide">
          <h1>Our Worldwide Office</h1>
          <div className="aboutus__worldwide__content">
            <img src={wwbg} alt="" />

            <div className="aboutus__ww__country">
              {country.map((data, i) => (
                <div className={`list ${data?.style}`} key={i}>
                  <span>{data.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Career;

import React, { useEffect } from "react";
import "./styles.scss";
import { Departments } from "../../Components/Home/Departments/Departments";
import { Favorites } from "../../Components/Home/Favorites/Favorites";
import { Todaysdeal } from "../../Components/Home/Todaysdeal/Todaysdeal";
import { Benfits } from "../../Components/Home/Benfits/Benfits";
// import { Auctions } from "../../Components/Home/Auctions/Auctions";
import { B2Bconnect } from "../../Components/Home/B2Bconnect/B2Bconnect";
import { SubscriptionInfo } from "../../Components/Home/SubscriptionInfo/SubscriptionInfo";
import PopularBlogList from "../../Pages/CMS/Company/Blogs/Blogsmain/PopularBlog.js";

import { useStateValue } from "../../store/state";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";

export const Home = () => {
  const [{ geo, customstore, homeContent }, dispatch] = useStateValue();
  const history = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (geo === "" || geo === undefined) return;
    let temp = Object.values(history);
    if (temp.length === 0) {
      navigate(`/${geo?.country_name}`);
    } else {
      dispatch({
        type: "GEO__CUSTOM__STORE",
        data: temp?.[0],
      });
      dispatch({
        type: "GEO__CUSTOM__NOSTORE",
        data: temp?.[0],
      });
      navigate(`/${temp?.[0] ? temp?.[0] : geo?.country_name}`);
    }
    localStorage.setItem("invoicepage", JSON.stringify(1));
    localStorage.setItem("wishpage", JSON.stringify(1));
    localStorage.setItem("wtbpage", JSON.stringify(1));
    localStorage.setItem("productpage", JSON.stringify(1));
    localStorage.setItem("enquirypage", JSON.stringify(1));
    localStorage.setItem("smartpage", JSON.stringify(1));
  }, [customstore, geo]);

  useEffect(() => {
    localStorage.setItem("review_status", homeContent?.review?.review_status);
  }, [homeContent]);

  return (
    <div>
      <Helmet>
        <title>TEXUB | PIONEERING THE FUTURE OF IT TRADE !</title>
        <meta
          name="description"
          content="TEXUB is a trusted Digital Marketplace for Global IT trade. The next level digital ecosystem and scalable cloud IT B2B Trade platforms."
          data-react-helmet="true" />
      </Helmet>
      <div className="Home">
        {homeContent !== "" ? (
          <>
            <Departments
              data={homeContent?.banner}
              categories={homeContent?.menu}
            />
            <Favorites data={homeContent?.block_2} />
            <Todaysdeal data={homeContent?.todays_deal} />
            <Benfits data={homeContent?.block_4} />
            <Todaysdeal data={homeContent?.block_5} />
            <SubscriptionInfo data={homeContent?.block_6} />
            {/* <PopularBlogList /> */}
            {/* <Auctions data={homedata?.banner} /> */}
            {/* <B2Bconnect data={homeContent?.block_6} /> */}
          </>
        ) : (
          <div className="blank_page_companyLogo">
            <svg
              className="svg_home"
              xmlns="http://www.w3.org/2000/svg"
              width="284.039"
              height="87.111"
              viewBox="0 0 310.039 87.111"
            >
              <g
                id="Group_1457"
                data-name="Group 1457"
                transform="translate(3358.13 20621.301)"
                opacity="0.251"
              >
                <path
                  id="_Compound_Path_"
                  data-name="&lt;Compound Path&gt;"
                  d="M1399.7,368.25h45.667a10.809,10.809,0,0,1,5.357,1.394,14.445,14.445,0,0,1,4.369,3.745,18.651,18.651,0,0,1,2.954,5.545,21.708,21.708,0,0,1-.427,14.834,16.765,16.765,0,0,1-4.088,6.044,16.632,16.632,0,0,1,4.088,6.034,21.708,21.708,0,0,1,.427,14.834,18.65,18.65,0,0,1-2.954,5.545,14.445,14.445,0,0,1-4.369,3.745,10.809,10.809,0,0,1-5.357,1.394H1399.7Zm41.257,24.977a3.49,3.49,0,0,0,2.913-1.716,7.142,7.142,0,0,0,1.217-4.234,6.618,6.618,0,0,0-1.217-4.015,3.5,3.5,0,0,0-2.913-1.664h-27.192v11.63Zm4.13,19.2a6.991,6.991,0,0,0-1.217-4.151,3.5,3.5,0,0,0-2.913-1.706h-27.192v11.443h27.192a3.533,3.533,0,0,0,2.913-1.623A6.418,6.418,0,0,0,1445.086,412.43Z"
                  transform="translate(-4507.242 -20977.463)"
                  fill="#002d56"
                />
                <path
                  id="_Path_"
                  data-name="&lt;Path&gt;"
                  d="M1267.606,418.049l-9.393,13.44h-35.7a9.063,9.063,0,0,1-9.061-9.071V377a9.061,9.061,0,0,1,9.061-9.061h35.255l9.841,13.43h-40v11.713h31.478v13.44h-31.478v11.526Z"
                  transform="translate(-4514.74 -20977.477)"
                  fill="#002d56"
                />
                <path
                  id="_Path_2"
                  data-name="&lt;Path&gt;"
                  d="M1302.213,387.983l-39.072,55.758h-4.931l30.521-43.774L1266,368.52h22.73l13.544,19.37Zm0,0-39.072,55.758h-4.931l30.521-43.774L1266,368.52h22.73l13.544,19.37Zm42.8-31.135L1314.644,400.4l22.73,31.447h-22.73l-.031-.042L1301.1,412.482l.062-.094,39.083-55.758h4.92Zm-9.831-.218-62.145,87.111h-4.546l62.135-87.111Zm-22.459,13.69h2.268l-10.455,14.657-1.134-1.592Zm-21.856,60.5h-2.278l10.486-14.688,1.1,1.623Z"
                  transform="translate(-4512.938 -20977.932)"
                  fill="#ddb363"
                />
                <path
                  id="_Path_3"
                  data-name="&lt;Path&gt;"
                  d="M1348.155,362.65v48.726a7.681,7.681,0,0,0,1.6,4.92,4.787,4.787,0,0,0,3.88,2.039h25.455v-49.86h14.085V431.7h-42.671a13.136,13.136,0,0,1-6.408-1.633,17.039,17.039,0,0,1-5.232-4.463,22.123,22.123,0,0,1-3.516-6.647,25.231,25.231,0,0,1-1.28-8.124V382.789Z"
                  transform="translate(-4509.884 -20977.689)"
                  fill="#002d56"
                />
                <path
                  id="_Path_4"
                  data-name="&lt;Path&gt;"
                  d="M1209.46,367.94v13.388h-17.549v50.016h-14.106V381.328H1158.81V367.94Z"
                  transform="translate(-4516.94 -20977.477)"
                  fill="#002d56"
                />
              </g>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import "./ProductListingPolicy.scss";
import Terms from "../../../../Assets/Career/Terms.png";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { getAdminToken } from "../../../../utilities";
import { useStateValue } from "../../../../store/state";
import axios from "axios";
import Constant from "../../../../Constant";
import { useParams } from "react-router-dom";


export const ProductListingPolicy = () => {
  const { id } = useParams();
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  const [{ currencyData }, dispatch] = useStateValue();

  const [terms, setterms] = useState();

  useEffect(async () => {
    if (adminToken !== "") {
      try {
        dispatch({
          type: "SET_IS_LOADING",
          value: true,
        });
        const termsdata = await axios({
          method: "get",
          url: Constant.baseUrl2() + `/cmsPage/${id}`,
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setterms(termsdata?.data);
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      } catch (e) {
        console.log(e);
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      }
    }
  }, [adminToken]);


  return (
    <div className="Termsofuse_main">
      <div className="Termsofuse_Description_section">
        <div className="Termsofuse_heading_section">
          <img src={Terms} alt="" className="Termsofuse_terms" />
          <h2 className="Termsofuse_heading">Product Listing Policy</h2>
        </div>
        <span dangerouslySetInnerHTML={{ __html: terms?.content }}></span>
        {/* <div className="Termsofuse_description">
          {Termstext.map((item) => (
            <li key={item.id} className="Termsofuse_text">
              {item.description}
            </li>
          ))}
        </div>
        <div className="Termsofuse_description">
          {Termstext.map((item) => (
            <li key={item.id} className="Termsofuse_text1">
              {item.description}
            </li>
          ))}
        </div>
        <div className="Termsofuse_description">
          {Termstext.map((item) => (
            <li key={item.id} className="Termsofuse_text1">
              {item.description}
            </li>
          ))}
        </div>
        <div className="Termsofuse_btn_section">
          <div className="Termsofuse_btn_download">
            <FileDownloadOutlinedIcon className="Termsofuse_download" />
            <spam className="download">Download PDF</spam>
          </div>
          <button className="Termsofuse_decline">Decline</button>
          <button className="Termsofuse_accept">Accept</button>
        </div> */}
      </div>
    </div>
  );
};

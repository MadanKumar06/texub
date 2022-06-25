import React, { useState, useEffect } from "react";
import "./Termsofuse.scss";
import Terms from "../../../../Assets/Career/Terms.png";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { getAdminToken, SessionExpiredLogout } from "../../../../utilities";
import { useStateValue } from "../../../../store/state";
import Constant from "../../../../Constant";
import axios from "axios";
import { useParams } from "react-router-dom";

const Termstext = [
  {
    id: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Natoque penatibus et magnis dis parturient. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Tellus at urna condimentum mattis pellentesque id nibh. Cursus turpis massa tincidunt dui ut ornare lectus. Libero justo laoreet sit amet cursus sit amet dictum. Diam vel quam elementum pulvinar etiam non quam. Consequat id porta nibh venenatis cras sed. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat. Justo laoreet sit amet cursus sit amet",
  },
];

export const Termsofuse = () => {
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
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (e.response.status === 401) {
          SessionExpiredLogout();
        }
      }
    }
  }, [adminToken]);

  const [temp, settemp] = useState(false);
  const handleChange = (divName) => {
    settemp(true);
    setTimeout(() => {
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      document.body.className = "Termsofuse_main_on_print";
      window.print();
      document.body.innerHTML = originalContents;
    }, 1000);
    settemp(false);
  };
  return (
    <div
      className={!temp ? "Termsofuse_main" : "Termsofuse_main_on_print"}
      id="Termsofuse_main"
    >
      <div className="Termsofuse_Description_section">
        <div className="Termsofuse_heading_section">
          <img src={Terms} alt="" className="Termsofuse_terms" />
          <h2 className="Termsofuse_heading">Terms Of Use</h2>
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
        </div> */}
        {/* <div className="Termsofuse_btn_section">
          <div
            className="Termsofuse_btn_download"
            onClick={() => handleChange("Termsofuse_main")}
          >
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

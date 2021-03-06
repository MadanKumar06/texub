import React, { useState, useEffect } from "react";
import "./styles.scss";
import axios from "axios";
import { getAdminToken, SessionExpiredLogout } from "../../../../utilities";
import { useStateValue } from "../../../../store/state";
import Constant from "../../../../Constant";
import { useParams } from "react-router-dom";

import gdpr from "../../../../Assets/Career/folder.png";

const Index = () => {
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  const { id } = useParams();
  const [{}, dispatch] = useStateValue();
  const [pp, setpp] = useState();
  // disable right click option
  document.addEventListener("contextmenu", (event) => event.preventDefault());

  useEffect(async () => {
    if (adminToken !== "") {
      try {
        dispatch({
          type: "SET_IS_LOADING",
          value: true,
        });
        const refundPolicy = await axios({
          method: "get",
          url: Constant.baseUrl2() + `/cmsPage/${id}`,
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        setpp(refundPolicy?.data);
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
  const GDPR = [
    {
      id: 1,
      image: gdpr,
      heading: "GENERAL DATA PROTECTION REGULATOR (GDPR)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Natoque penatibus et magnis dis parturient. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Tellus at urna condimentum mattis pellentesque id nibh. Cursus turpis massa tincidunt dui ut ornare lectus. Libero justo laoreet sit amet cursus sit amet dictum. Diam vel quam elementum pulvinar etiam non quam. Consequat id porta nibh venenatis cras sed. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat. Justo laoreet sit amet cursus sit amet",
    },
  ];
  return (
    <div className="gdpr_main">
      <div className="gdpr_heading">
        <div>
          {GDPR.map((item) => (
            <li key={item.id} className="gdpr_heading_list">
              <img src={item.image} alt="/" className="gdpr_img" />{" "}
              <span className="heading">{item.heading}</span>
            </li>
          ))}
        </div>
        <span dangerouslySetInnerHTML={{ __html: pp?.content }}></span>
        {/* <div className='gdpr_description'>
                    {GDPR.map((item) =>
                        <li key={item.id} className='gdpr_heading_list'>
                            <span className='description'>{item.description}</span>
                        </li>
                    )
                    }
                </div>
                <div className='gdpr_description'>
                    {GDPR.map((item) =>
                        <li key={item.id} className='gdpr_heading_list'>
                            <span className='description1'>{item.description}</span>
                        </li>
                    )
                    }
                </div>
                <div className='gdpr_description'>
                    {GDPR.map((item) =>
                        <li key={item.id} className='gdpr_heading_list'>
                            <span className='description1'>{item.description}</span>
                        </li>
                    )
                    }
                </div> */}
      </div>
    </div>
  );
};
export default Index;

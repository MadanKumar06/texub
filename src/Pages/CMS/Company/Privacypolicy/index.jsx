import React, { useState, useEffect } from "react";
import "./styles.scss";
import axios from 'axios'
import { getAdminToken } from "../../../../utilities";
import { useStateValue } from "../../../../store/state";
import legal from "../../../../Assets/Career/privacy-policy.png";

const Index = () => {

  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  const [{}, dispatch] = useStateValue()

  const [pp, setpp] = useState()

  useEffect(async() => {
    try {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      const privacy = await axios({
        method: 'get',
        url: 'https://texub.uat.a2zportals.co.in/india/rest/V1/cmsPage/27',
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })
      setpp(privacy?.data)
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch(e) {
      console.log(e)
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  }, [adminToken])

  const Legal = [
    {
      id: 1,
      image: legal,
      heading: "Privacy Policy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et. Vel eros donec ac odio tempor orci dapibus. Purus sit amet luctus venenatis lectus magna fringilla urna. Enim nunc faucibus a pellentesque sit amet. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Natoque penatibus et magnis dis parturient. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Tellus at urna condimentum mattis pellentesque id nibh. Cursus turpis massa tincidunt dui ut ornare lectus. Libero justo laoreet sit amet cursus sit amet dictum. Diam vel quam elementum pulvinar etiam non quam. Consequat id porta nibh venenatis cras sed. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat. Justo laoreet sit amet cursus sit amet",
    },
  ];
  return (
    <div className="privacypolicy_main">
      <div className="Legal_heading">
        {Legal.map((item) => (
          <li key={item.id} className="Legal_heading_list">
            <img src={item.image} alt="/" className="Legal_img" />{" "}
            <span className="heading">{item.heading}</span>
          </li>
        ))}
        <span  dangerouslySetInnerHTML={{ __html: pp?.content }}></span>
        {/* <div className="Legal_description">
          {Legal.map((item) => (
            <li key={item.id} className="Legal_heading_list">
              <span className="description">{item.description}</span>
            </li>
          ))}
        </div>
        <div className="Legal_description">
          {Legal.map((item) => (
            <li key={item.id} className="Legal_heading_list">
              <span className="description1">{item.description}</span>
            </li>
          ))}
        </div>
        <div className="Legal_description">
          {Legal.map((item) => (
            <li key={item.id} className="Legal_heading_list">
              <span className="description1">{item.description}</span>
            </li>
          ))}
        </div> */}
      </div>
    </div>
  );
};
export default Index;

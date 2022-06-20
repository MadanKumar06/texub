import React, { useState, useEffect } from "react";
import "./styles.scss";
import { getAdminToken } from "../../../../utilities";
import { useStateValue } from "../../../../store/state";
import axios from "axios";
import Constant from "../../../../Constant";
import { useParams } from "react-router-dom";

const Index = () => {
  const { id } = useParams();
  const [adminToken, setAdminToken] = useState("");
  useEffect(() => {
    getAdminToken((res) => {
      setAdminToken(res);
    });
  }, []);
  const [{}, dispatch] = useStateValue();

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
    <div className="cookies_permission_main">
      <div className="cookies_permission_Description_section">
        <div className="cookies_permission_heading_section">
          {/* <img src={Terms} alt="" className="cookies_permission_terms" /> */}
          <h2 className="cookies_permission_heading">Cookies Permission</h2>
        </div>
        <span dangerouslySetInnerHTML={{ __html: terms?.content }}></span>
      </div>
    </div>
  );
};

export default Index;
// import React, { useState } from "react";
// import "./styles.scss";
// import { Modal, Backdrop } from "@mui/material";
// // import bgimage from '../../../../Assets/Career/Rectangle 1277.svg'
// import icon from "../../../../Assets/Career/Group 930.png";
// import close from "../../../../Assets/Career/Group 55.svg";

// const Index = ({ closePOPup }) => {
//   const [open, setOpen] = useState(true);
//   return (
//     <Modal
//       aria-labelledby="transition-modal-title"
//       aria-describedby="transition-modal-description"
//       open={open}
//       className="modal"
//       disableRestoreFocus={true}
//       closeAfterTransition
//       BackdropComponent={Backdrop}
//       BackdropProps={{
//         timeout: 500,
//       }}
//     >
//       <div className="cookies_main">
//         <div className="cookies_main1">
//           <div className="cookies_bgimage_section">
//             {/* <img src={bgimage} alt='/' className='cookies_bgimage' /> */}
//             <img src={icon} alt="/" className="cookies_icon" />

//             <img
//               src={close}
//               alt="/"
//               className="cookies_close"
//               onClick={() => closePOPup(false)}
//             />
//             <p className="cookies_description">
//               We use cookies to make your experience better on this website
//             </p>
//             <p className="cookies_policies">
//               <a href="/" className="Link">
//                 Cookies Policies
//               </a>
//             </p>
//             <button className="cookies_btn" onClick={() => closePOPup(false)}>
//               Accept Cookies
//             </button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default Index;

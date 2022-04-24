import React, { useEffect } from "react";
import "./styles.scss";
import { Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { SellerList, BuyerList } from "./image";
import logout from "../../Assets/sellerdashboard/InactiveDashboardPng/logout.png";
import swal from "sweetalert2";
function Index({
  selectmenu,
  setcurrentmenu,
  currentmenu,
  currenttab,
  color,
  barstate,
  setbarstate,
}) {
  useEffect(() => {
    setcurrentmenu(SellerList[0]?.name);
  }, []);

  const history = useNavigate();
  const SignOut = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign Out!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          swal.fire({
            text: "You have Successfully logged out !",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => {
            history("/");
            window.location.reload();
          }, 1000);
        }
      });
  };

  let sellerCode = JSON.parse(
    localStorage.getItem("userdata")
  )?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_code"
  );
  return (
    <div className={`${barstate ? "sidebaropen" : "sellerdashboard__sidebar"}`}>
      <Clear className="sidebar__close" onClick={() => setbarstate(false)} />
      <div className="sidebar_head_title">
        <p>
          <span className="sellerlabel">
            {color === "yellow" && "Seller ID"}
            {color === "blue" && "Buyer ID"}
          </span>
          <span className="sellervalue">{sellerCode?.[0]?.value}</span>
        </p>
      </div>
      <ul>
        {color === "yellow" && (
          <>
            {SellerList?.map((data, i) => (
              <li
                className={`${
                  (currenttab === data.url &&
                    "sellerdashboard__currentselection" &&
                    color === "yellow" &&
                    "sellerbg") ||
                  (currenttab === data.url &&
                    "sellerdashboard__currentselection" &&
                    color === "blue" &&
                    "buyerbg")
                } `}
                key={i}
                onClick={() => selectmenu(data.url)}
              >
                {currentmenu === data.url ? (
                  <span className="active_image">{data.image}</span>
                ) : (
                  <span className="inActive_image">{data.image}</span>
                )}
                {/* <img
                  src={
                    currentmenu === data?.url
                      ? data.image_Active
                      : data.image_Inactive
                  }
                  alt=""
                /> */}
                {data.name}
              </li>
            ))}
            <li onClick={() => SignOut()}>
              <img src={logout} alt="" />
              Logout
            </li>
          </>
        )}
        {color === "blue" && (
          <>
            {BuyerList?.map((data, i) => (
              <li
                className={`${
                  (currenttab === data.url &&
                    "sellerdashboard__currentselection" &&
                    color === "yellow" &&
                    "sellerbg") ||
                  (currenttab === data.url &&
                    "sellerdashboard__currentselection" &&
                    color === "blue" &&
                    "buyerbg")
                } `}
                key={i}
                onClick={() => selectmenu(data.url)}
              >
                {currentmenu === data.url ? (
                  <span className="active_image">{data.image}</span>
                ) : (
                  <span className="inActive_image">{data.image}</span>
                )}

                {/* <img
                  src={
                    currentmenu === data.url
                      ? data.image
                      : ""
                  }
                  alt=""
                /> */}
                {data.name}
              </li>
            ))}
            <li onClick={() => SignOut()}>
              <img src={logout} alt="" />
              Logout
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Index;

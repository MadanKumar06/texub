import axios from "axios";
import Constant from "./Constant";

export const isEmailValid = (email) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

export const isPasswordValid = (password) =>
  password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,99}$/);

export const isFirstAndLastNameValid = (firstAndLastName) =>
  firstAndLastName.match(/^[a-zA-Z\s]*$/);

export const isDesignationValid = (designation) =>
  designation.match(/^[a-zA-Z ]*$/);

export const isCompanyNameValid = (company) =>
  company.match(/^[^'][a-zA-Z0-9' ]*[^']$/);

export const isRolesValid = (roles) =>
  roles.match(/^[A-Z@~`!@#$%^&*()_=+\\';:"\/?>.<,-]*$/);

//get adminToken for seller and buyer registration
export const getAdminToken = (callback) => {
  let data = {
    username: "admin",
    password: "admin@1234",
  };
  axios
    .post(Constant.adminTokenUrl(), data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      callback(res?.data);
    })
    .catch((err) => {});
};

export const getSigninedUserData = (token) => {
  axios
    .get(Constant.customerMeDetailUrl(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      localStorage.setItem("userdata", JSON.stringify(res?.data));
      localStorage.setItem(
        "isLoggedIn_auth",
        res?.data?.group_id === 1 ? false : true
      );

      let iskycFormFilled = res?.data;
      if (iskycFormFilled?.group_id === 1) {
        // setTimeout(() => {
        //   history("/");
        // }, 1000 / 2);
      } else if (
        iskycFormFilled?.group_id === 5 ||
        iskycFormFilled?.group_id === 6
      ) {
        let isDataValid = iskycFormFilled?.custom_attributes?.filter(
          (itm) => itm?.attribute_code === "kyc_status"
        );
        // KycFormOpenClose(isDataValid, iskycFormFilled?.group_id);
      }
    })
    .catch((err) => {});
};

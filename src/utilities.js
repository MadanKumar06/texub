import axios from "axios";
import Constant from "./Constant";

export const isEmailValid = (email) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

export const isPasswordValid = (password) =>
  password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,99}$/);

export const isFirstAndLastNameValid = (firstAndLastName) =>
  firstAndLastName.match(/^[a-zA-Z]*$/);

export const isDesignationValid = (designation) =>
  designation.match(/^[a-zA-Z ]*$/);

export const isCompanyNameValid = (company) =>
  company.match(/^\d*[a-zA-Z][a-zA-Z0-9][a-zA-Z0-9-+()!@#$%^&*{} ]*$/);

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

import axios from "axios";
import Constant from "./Constant";
import swal from "sweetalert2";

export const isEmailValid = (email) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
export const isPasswordValid = (password) =>
  password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,99}$/);

export const isFirstAndLastNameValid = (firstAndLastName) =>
  firstAndLastName.match(/^[a-zA-Z\s\.]*$/);

export const isDesignationValid = (designation) =>
  designation.match(/^[a-zA-Z ]*$/);

export const isCompanyNameValid = (company) => company.match(/^[0-9]*\d$/);
// /^\d*[0-9 ][0-9-+\.+\s\.+!@#$%^&*'~`+{}"?><,.:;/|()_-]*$/

export const isRolesValid = (roles) =>
  roles.match(
    /^((?=.*[a-zA-Z])[a-zA-Z+\.\s+!@#$%^&*'~`+{}"?><,.:;/|()_-]{0,50})$/
  );

export const isLandlineValid = (landline) => landline.match(/^[0-9+[+-\s]*$/);

export const isOtherBrands = (value) =>
  value.match(/^\d*[0-9 ][0-9-+\.+\s\.+!@#$%^&*'~`+{}"?><,.:;/|()_-]*$/);

export const isOnlySpecialCharacters = (value) =>
  value.match(/^[!@#$%^&*'~`+{}"?><,.:;/|()_-]+$/);

export const isNumber = (number) => number.match(/^[0-9]*\d$/);

//get adminToken for seller and buyer registration
export const getAdminToken = (callback) => {
  let data = {
    username: "admin",
    password: "73xu6@2&L1v3",
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

//Customer details
export const getSigninedUserData = () => {
  let token = localStorage.getItem("token");
  if (token) {
    axios
      .get(Constant.customerMeDetailUrl(), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.setItem("userdata", JSON.stringify(res?.data));
        localStorage.setItem(
          "isLoggedIn_auth",
          res?.data?.group_id === 1 ? false : true
        );
      })
      .catch((err) => {
        if (err.response.status === 401) {
          swal.fire({
            text: "Due to Session expiry, Logging out",
            icon: "success",
            showConfirmButton: false,
            timer: 4000,
          });
          localStorage.clear();
          setTimeout(() => {
            window.location.assign("/");
          }, 2000);
        }
      });
  }
};

//homePage content
export const GetHomeAPi = async (callback) => {
  try {
    const home = await axios({
      method: "get",
      url: `${Constant.baseUrl()}/getHomePage`,
    });
    callback(Object.assign({}, ...home.data));
  } catch (e) {}
};

//getCategories List
export const GetCategoriesList = async (callback, currency) => {
  try {
    const home = await axios({
      method: "post",
      url: `${Constant.baseUrl()}/getCategoriesList`,
      data: {
        currency_id: currency,
      },
    });
    callback(home?.data);
  } catch (e) {}
};

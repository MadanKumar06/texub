export const initialState = {
  kycOpenClose: false,
  pdpPopUpOpenClose: false,
  miniCartOpenClose: false,
  signInOpenClose: false,
  registerOpenClose: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_KYC_OPEN_CLOSE":
      return {
        ...state,
        kycOpenClose: action.value,
      };
    case "SET_PDP_POPUP_OPEN_CLOSE":
      return {
        ...state,
        pdpPopUpOpenClose: action.value,
      };
    case "SET_MINICART_OPEN_CLOSE":
      return {
        ...state,
        miniCartOpenClose: action.value,
      };
    case "SET_SIGNIN_OPEN_CLOSE":
      return {
        ...state,
        signInOpenClose: action.value,
      };
    case "SET_REGISTER_OPEN_CLOSE":
      return {
        ...state,
        registerOpenClose: action.value,
      };
    default:
      return state;
  }
};

export default reducer;

export const initialState = {
  kycOpenClose: false,
  pdpPopUpOpenClose: false,
  miniCartOpenClose: false,
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
    default:
      return state;
  }
};

export default reducer;

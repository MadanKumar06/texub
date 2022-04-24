export const initialState = {
  kycOpenClose: false,
  pdpPopUpOpenClose: { openClose: false, data: [] },
  miniCartOpenClose: { openClose: false, open: false },
  signInOpenClose: false,
  registerOpenClose: false,
  isLoading: false,
  currency: {},
  isSimpleLoading: false,
  cart: [],
  gt: false,
  homeSearch: "",
  geo: "",
  customstore: "",
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "GEO__LOCATION":
      return {
        ...state,
        geo: action.data,
      };
    case "GEO__CUSTOM__STORE":
      return {
        ...state,
        customstore: action.data,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.value,
      };
    case "SET_IS_SIMPLE_LOADING":
      return {
        ...state,
        isSimpleLoading: action.value,
      };
    case "SET_KYC_OPEN_CLOSE":
      return {
        ...state,
        kycOpenClose: action.value,
      };
    case "SET_PDP_POPUP_OPEN_CLOSE":
      return {
        ...state,
        pdpPopUpOpenClose: { openClose: action.value, data: action.data },
      };
    case "SET_MINICART_OPEN_CLOSE":
      return {
        ...state,
        miniCartOpenClose: { open: action.open, openClose: action.value },
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
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.data,
      };
    case "CART__DATA":
      return {
        ...state,
        cart: action.data,
      };

    case "CART__TRIGGER":
      return {
        ...state,
        gt: !state.gt,
      };
    case "SET_SEARCH":
      return {
        ...state,
        homeSearch: action.value,
      };
    default:
      return state;
  }
};

export default reducer;

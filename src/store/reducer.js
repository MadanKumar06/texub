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
  wishListData: [],
  gt: false,
  homeSearch: "",
  geo: "",
  customstore: "",
  customnostore: "",
  homeContent: "",
  currencyData: {},
  plp_categories: [],
  generalTrigger: false,
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
    case "GEO__CUSTOM__NOTSTORE":
      return {
        ...state,
        customnostore: action.data,
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
    case "WHISHLIST_DATA":
      return {
        ...state,
        wishListData: action.data,
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
    case "SET_HOME_CONTENT":
      return {
        ...state,
        homeContent: action.data,
      };
    case "SET_GENERAL_TRINGGER":
      return {
        ...state,
        generalTrigger: !state?.generalTrigger,
      };
    case "SET_CURRENCY_DATA":
      return {
        ...state,
        currencyData: action.data,
      };
    case "SET_PLP_CATEGORIES":
      return {
        ...state,
        plp_categories: action.data,
      };
    default:
      return state;
  }
};

export default reducer;

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
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
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
        cart: action.value,
      };
    default:
      return state;
  }
};

export default reducer;

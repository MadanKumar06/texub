export const initialState = {
  kycOpenClose: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_KYC_OPEN_CLOSE":
      return {
        ...state,
        kycOpenClose: action.value,
      };
    default:
      return state;
  }
};

export default reducer;

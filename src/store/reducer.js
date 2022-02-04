export const initialState = {
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action,
      };
    default:
      return state;
  }
};

export default reducer;

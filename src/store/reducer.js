export const initialState = {
  paginationData: [],
};

const reducer = (state, action) => {
  debugger
  switch (action.type) {
    case "SET_PAGINATION":
      return {
        ...state,
        paginationData: action.data,
      };
    default:
      return state;
  }
};

export default reducer;

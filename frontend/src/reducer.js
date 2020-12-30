// REACT CONTEXT API

// Initial State (Empy basket array)
export const initialState = { basket: [] };

// Building a Selector
// !!!!!!!!!!!!!!!!!!!!NOTE!!!!!!!!!!!!!!!!!!!!
export const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => item.price + amount, 0);
};

// Reducer : action to push data/ pull data into/from the data layer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state, // the previos state
        basket: [...state.basket, action.item],
      };
    case "UPDATE_BASKET":
      return {
        ...state,
        basket: action.basket,
      };
    default:
      return state;
  }
};

export default reducer;

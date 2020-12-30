// REACT CONTEXT API

// Initial State (Empy basket array)
export const initialState = { basket: [] };

// Reducer : action to push data/ pull data into/from the data layer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state, // the previos state
        basket: [...state.basket, action.item],
      };
    default:
      return state;
  }
};

export default reducer;

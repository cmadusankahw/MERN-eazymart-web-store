// REACT CONTEXT API

// Initial State
export const initialState = { basket: [], user: null };

// Building Selectors
// !!!!!!!!!!!!!!!!!!!!NOTE!!!!!!!!!!!!!!!!!!!!
export const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => item.price * item.count + amount, 0);
};

export const getBasketCount = (basket) => {
  return basket?.reduce((pre, item) => pre + item.count, 0);
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
    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];

      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        if (state.basket[index].count > 1) {
          newBasket[index].count--;
        } else {
          newBasket.splice(index, 1);
        }
      } else {
        alert(`Requested product (id: ${action.id}) not in basket!`);
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;

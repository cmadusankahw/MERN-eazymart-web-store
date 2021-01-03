// REACT CONTEXT API
import React, { createContext, useContext, useReducer } from "react";

// Prepare the data layer
export const StateContext = createContext();

// Wap our app inside the data layer ( this provides the data layer to the whole app)
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);

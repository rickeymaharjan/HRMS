import { createContext, useReducer } from "react";

export const ActivitiesContext = createContext();

export const activitiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVITY":
      return {
        activities: action.payload,
      };
    case "CREATE_ACTIVITY":
      return {
        activities: [action.payload, ...state.activities],
      };
    default:
      return state;
  }
};

export const ActivitiesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activitiesReducer, { activities: [] }); 

  return (
    <ActivitiesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

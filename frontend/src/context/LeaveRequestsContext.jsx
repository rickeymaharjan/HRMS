import { createContext, useReducer } from "react";

export const LeaveRequestsContext = createContext();

export const requestsReducer = (state, action) => {
  switch (action.type) {
    case "SET_REQUEST":
      return {
        requests: action.payload,
      };
    case "CREATE_REQUEST":
      return {
        requests: [action.payload, ...state.requests],
      };
    case "UPDATE_REQUEST":
      return {
        request: [action.payload, ...state.requests.filter(request => request._id !== action.payload._id)],
      };
    default:
      return state;
  }
};

export const LeaveRequestsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestsReducer, { requests: [] }); 

  return (
    <LeaveRequestsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LeaveRequestsContext.Provider>
  );
};

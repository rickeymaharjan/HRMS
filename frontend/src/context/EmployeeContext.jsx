// UserRecordContext.js
import { createContext, useReducer } from "react";

export const UserRecordContext = createContext();

export const userRecordReducer = (state, action) => {
  switch (action.type) {
    case "SET_RECORD":
      return {
        records: action.payload,
      };
    case "CREATE_RECORD":
      return {
        records: [action.payload, ...state.records],
      };
    // Add more cases as needed
    default:
      return state;
  }
};

export const UserRecordContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userRecordReducer, { records: [] }); 

  return (
    <UserRecordContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserRecordContext.Provider>
  );
};

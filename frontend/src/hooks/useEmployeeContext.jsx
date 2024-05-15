// useUserRecordContext.js
import { UserRecordContext } from "../context/UserRecordContext";
import { useContext } from "react";

export const useUserRecordContext = () => {
  const context = useContext(UserRecordContext);
  if (!context) {
    throw new Error(
      "useUserRecordContext must be used inside a UserRecordContextProvider."
    );
  }

  return context;
};

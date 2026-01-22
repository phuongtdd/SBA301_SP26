import React, { createContext, useContext, useReducer } from "react";
import loginReducer from "../stores/loginReducer";

const LoginContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const login = (username) => {
    dispatch({ type: "LOGIN", payload: username });
  };




  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };


  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
}

export default LoginContext;

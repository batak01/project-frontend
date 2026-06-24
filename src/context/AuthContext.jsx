"use client";

import {
  createContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState(null);

  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const storedAuth =
      localStorage.getItem("auth");

    if(storedAuth){

      setAuth(JSON.parse(storedAuth));

    }

    setLoading(false);

  },[]);

  useEffect(()=>{

    if(!auth) return;

    localStorage.setItem(
      "auth",
      JSON.stringify(auth)
    );

  },[auth]);

  const login = (data)=>{

    setAuth(data);

  };

  const logout = ()=>{

    setAuth(null);

    localStorage.removeItem("auth");

  };

  return (

    <AuthContext.Provider

      value={{
        auth,
        login,
        logout,
        loading
      }}

    >

      {children}

    </AuthContext.Provider>

  );

};

export default AuthContext;
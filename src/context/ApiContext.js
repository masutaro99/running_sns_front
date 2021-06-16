import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [practices, setPractices] = useState([]);
  useEffect(() => {
    const getPractice = async () => {
      try {
        const res = await axios.get("http://localhost/practices");
        setPractices(res.data);
      } catch {
        console.log("error");
      }
    };
    getPractice();
  });

  return (
    <ApiContext.Provider
      value={{
        practices,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;

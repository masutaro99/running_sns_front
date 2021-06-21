import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [practices, setPractices] = useState([]);
  useEffect(() => {
    const getPractice = async () => {
      try {
        console.log(process.env.REACT_APP_API_URL + "practices");
        const res = await axios.get(
          process.env.REACT_APP_API_URL + "practices"
          //"http://running-sns.masutaro99.com/practices"
        );

        setPractices(res.data);
      } catch {
        console.log("error");
      }
    };
    getPractice();
  }, []);

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

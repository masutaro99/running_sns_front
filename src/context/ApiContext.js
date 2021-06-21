import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";
export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [practices, setPractices] = useState([]);
  const [username, setUsername] = useState([]);
  const [userId, setUserId] = useState([]);
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
    Auth.currentAuthenticatedUser().then((data) => {
      setUsername(data.username);
      setUserId(data.attributes.sub);
    });
  }, []);

  return (
    <ApiContext.Provider
      value={{
        practices,
        setPractices,
        username,
        userId,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;

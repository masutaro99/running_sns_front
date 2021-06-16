import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Auth } from "aws-amplify";
import axios from "axios";
import Profile from "./Profile";

const listProfiles = "test";

const Main = () => {
  const [username, setUsername] = useState([]);
  const [practices, setPractices] = useState([]);
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      setUsername(data.username);
    });
    const getPractice = async () => {
      try {
        const res = await axios.get("http://localhost/practices");
        setPractices(res.data);
      } catch {
        console.log("error");
      }
    };
    getPractice();
  }, []);
  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="app-profiles">
          <div className="task-list">
            {practices.map((practice) => (
              // <li key={practice.id}>
              //   title:{practice.title} description:{practice.description}{" "}
              //   distance:{practice.distance}
              // </li>
              <Profile key={practice.id} profileData={practice}></Profile>
            ))}
          </div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className="app-details">{username}</div>
      </Grid>
    </Grid>
  );
};

export default Main;

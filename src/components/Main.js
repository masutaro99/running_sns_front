import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Auth } from "aws-amplify";
import axios from "axios";
import Profile from "./Profile";
import ProfileManager from "./ProfileManager";

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
    <Grid container>
      <Grid item xs={4}>
        <div className="app-profiles">
          <div className="task-list">
            {practices.map((practice) => (
              <Profile key={practice.id} profileData={practice}></Profile>
            ))}
          </div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className="app-details">
          <ProfileManager />
        </div>
      </Grid>
    </Grid>
  );
};

export default Main;

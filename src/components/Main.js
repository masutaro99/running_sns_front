import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Auth } from "aws-amplify";

const listProfiles = "test";

const Main = () => {
  const [username, setUsername] = useState([]);
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      setUsername(data.username);
      //console.log(data.username);
    });
  });
  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="app-profiles">
          <div className="task-list">{username}</div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className="app-details"></div>
      </Grid>
    </Grid>
  );
};

export default Main;

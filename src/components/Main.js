import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Auth } from "aws-amplify";
import axios from "axios";
import Profile from "./Profile";
import ProfileManager from "./ProfileManager";
import { Avatar, Button } from "@material-ui/core";

const listProfiles = "test";

const Main = () => {
  const [username, setUsername] = useState([]);
  const [userId, setUserId] = useState([]);
  const [practices, setPractices] = useState([]);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Distance, setDistance] = useState("");
  const sendTweet = () => {
    try {
      const usernametmp = username;
      const userIdtmp = userId;
      const data = {
        title: Title,
        description: Description,
        distance: Distance,
        username: usernametmp,
        userid: userIdtmp,
      };
      const res = axios.post(process.env.REACT_APP_API_URL + "practices", data);
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      setUsername(data.username);
      setUserId(data.attributes.sub);
    });
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
        <div className="tweetBox">
          <form>
            <div className="tweetBox__input">
              <Avatar src="https://maskenpa1001.s3.ap-northeast-1.amazonaws.com/icon_normal.png" />

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={Title}
                className="tweetBox__imageInput"
                placeholder="Title"
                type="text"
              />
            </div>

            <input
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              className="tweetBox imageInput"
              placeholder="Description"
              type="text"
            />
            <input
              value={Distance}
              onChange={(e) => setDistance(e.target.value)}
              className="tweetBox imageInput"
              placeholder="Distance"
              type="number"
              step="0.1"
            />
            <Button
              onClick={sendTweet}
              type="submit"
              className="tweetBox__tweetButton"
            >
              Tweet
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Main;

import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Practice from "./Practice";
import ProfileManager from "./ProfileManager";
import { Avatar, Button } from "@material-ui/core";
import { ApiContext } from "../context/ApiContext";
import axios from "axios";
import Modal from "./Modal";

const Main = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState("");
  const [path, setPath] = useState([]);
  const { practices, username, userId } = useContext(ApiContext);

  useEffect(() => {
    const getImage = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `imgs/1?username=${username}`
      );
      console.log(res.data);
      if (res.data !== null) {
        setPath(res.data.imagepath);
      } else {
        setPath("");
      }
    };
    getImage();
  }, [username, userId]);

  const sendTweet = () => {
    try {
      const usernametmp = username;
      const userIdtmp = userId;
      const data = {
        title: title,
        description: description,
        distance: distance,
        username: usernametmp,
        userid: userIdtmp,
      };
      const res = axios.post(process.env.REACT_APP_API_URL + "practices", data);
    } catch {
      console.log("error");
    }
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="app-practices">
          <div className="practices-list">
            {practices.map((practice) => (
              <Practice key={practice.id} practiceData={practice}></Practice>
            ))}
          </div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className="app-profile">
          <ProfileManager path={path} />
        </div>
        <div className="tweetBox">
          <form>
            <div className="tweetBox__input">
              {path ? (
                <Avatar src={path} />
              ) : (
                <Avatar src="https://maskenpa1001.s3.ap-northeast-1.amazonaws.com/icon_normal.png" />
              )}
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="tweetBox_title"
                placeholder="Title"
                type="text"
              />
            </div>

            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="tweetBox_description"
              placeholder="Description"
              type="text"
            />
            <input
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="tweetBox_distance"
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
        <Modal />
      </Grid>
    </Grid>
  );
};

export default Main;

import React, { useContext, useEffect, useState, useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import Practice from "./Practice";
import ProfileManager from "./ProfileManager";
import { Avatar, Button, TextField } from "@material-ui/core";
import { ApiContext } from "../context/ApiContext";
import axios from "axios";
import Modal from "./Modal";
import dayjs from "dayjs";
import SortButton from "./SortButton";

const Main = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState("");
  const [path, setPath] = useState([]);
  const { practices, username, userId } = useContext(ApiContext);
  const today = dayjs().format("YYYY-MM-DD");
  const [practicedate, setPracticedate] = useState([]);
  const [sort, setSort] = useState({ key: "created_at", order: 1 });
  const KEYS = ["id", "distance", "created_at", "username", "date"];

  useEffect(() => {
    const getImage = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `imgs/1?username=${username}`
      );
      if (res.data !== null) {
        setPath(res.data.imagepath);
      } else {
        setPath("");
      }
    };
    getImage();
    setPracticedate(today);
  }, [username, userId]);

  const sortedPractices = useMemo(() => {
    let sortedPractices = practices;
    if (sort.key) {
      sortedPractices = sortedPractices.sort((a, b) => {
        a = a[sort.key];
        b = b[sort.key];

        if (a === b) {
          return 0;
        }
        if (a > b) {
          return 1 * sort.order;
        }
        if (a < b) {
          return -1 * sort.order;
        }
      });
    }
    return sortedPractices;
  }, [sort]);

  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ ...sort, order: -sort.order });
    } else {
      setSort({
        key: key,
        order: 1,
      });
    }
  };

  const handledate = async (props) => {
    setPracticedate(props);
  };

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
        date: practicedate,
      };
      const res = axios.post(process.env.REACT_APP_API_URL + "practices", data);
    } catch {
      console.log("error");
    }
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="sort_buttons">
          <h2>Sort by</h2>
          {KEYS.map((key, index) => (
            <SortButton
              key={index}
              button={key}
              sort={sort}
              handleSort={handleSort}
            />
          ))}
        </div>
        <div className="app-practices">
          <div className="practices-list">
            {practices.map((sortedPractices) => (
              <Practice
                key={sortedPractices.id}
                practiceData={sortedPractices}
              ></Practice>
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
            <TextField
              onChange={(e) => handledate(e.target.value)}
              id="date"
              label="Practiceday"
              type="date"
              defaultValue={today}
              InputLabelProps={{
                shrink: true,
              }}
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

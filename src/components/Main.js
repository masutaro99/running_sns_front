import React, { useContext, useEffect, useState, useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import Practice from "./Practice";
import Ranking from "./Ranking";
import ProfileManager from "./ProfileManager";
import { Avatar, Button, TextField } from "@material-ui/core";
import { ApiContext } from "../context/ApiContext";
import axios from "axios";
import Modal from "./Modal";
import dayjs from "dayjs";
import SortButton from "./SortButton";
import { embedDashboard } from "amazon-quicksight-embedding-sdk";

const Main = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState("");
  const { practices, username, userId, path, setPath } = useContext(ApiContext);
  const today = dayjs().format("YYYY-MM-DD");
  const month = dayjs().format("YYYY-MM");
  const [practicedate, setPracticedate] = useState([]);
  const [sort, setSort] = useState({ key: "created_at", order: 1 });
  const [rankings, setRankings] = useState([]);
  const KEYS = ["distance", "created_at", "date"];
  const embedingurl =
    "https://ap-northeast-1.quicksight.aws.amazon.com/embed/a14a0bbfa22b4143b1ebd9c0cdede6a0/dashboards/69d6fe85-29d6-4a9b-a123-1997ce326b68?isauthcode=true&identityprovider=quicksight&code=AYABeILbYh3_QSkgXPjw8ZqEkbcAAAABAAdhd3Mta21zAFBhcm46YXdzOmttczphcC1ub3J0aGVhc3QtMTozNjcwOTQ1NjE4OTQ6a2V5LzkyZDU3MjEzLTc0MjItNGNhOC1iYWZiLTg2MDFjNGZkODgyNwC4AQIBAHirSky28MTsQkRRkQnrWly9-KCD9GJ1rJU8zazSG85WsgHXRaNmUTKz-G6KSwstcgosAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM9d7hezmleCPyKpO8AgEQgDvT5apTBFQJQppv_FxNr-y6OkwmSy4SB_V4d4yz7KKPh8i9zn_qhHf6akY_DrXfQPmYLCWmRvWJgcNYFQIAAAAADAAAEAAAAAAAAAAAAAAAAACAYDH1GETAbt0ujx2mCh2P_____wAAAAEAAAAAAAAAAAAAAAEAAACeQDaz8FBcF-Timi__9OU1ZDJ_N0ZhTtmv_oz4QAqemtWLeKa0YuDKCK3TaU-WuGUkTP_hcIp9T6VehwowvOmnCpsQdmQU0ST8YVx2Tg3FO2IdtW3FWFFUxJNYuEEI6gBefSiFhl4Ja4-v1e7YQ9He_TaCEz4ORMf-Xxth2PcFj8TGLB-btRtbH8V_MzsYDzArW5wSAR8ynsz-v1BG3lXRWi40PilTxJCMaSEgOXno";
  let dashboard;

  useEffect(() => {
    const getImage = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}` + `imgs/1?username=${username}`
      );
      if (res.data !== null) {
        setPath(res.data.imagepath);
      } else {
        setPath("");
      }
    };
    const getRanking = async () => {
      const res = await axios.get(
        "https://1isutj8e72.execute-api.ap-northeast-1.amazonaws.com/fifth/ranking?month=2021-06"
      );
      setRankings(res.data.body.Items);
      console.log(res.data.body.Items);
    };
    getImage();
    setPracticedate(today);
    getRanking();
  }, [username]);
  useEffect(() => {
    const setdashboard = async () => {
      // const res = await axios.get(
      //   "https://1isutj8e72.execute-api.ap-northeast-1.amazonaws.com/third/quicksight"
      // );
      if (!dashboard) {
        dashboard = embedDashboard({
          //url: res.data.embed_url,
          url: embedingurl,
          container: document.getElementById("embeddingContainer"), //埋め込み先のHTMLエレメント
          parameters: {
            username: "mas",
          },
          scrolling: "no",
          height: "350px",
          width: "450px",
          locale: "ja-JP",
          footerPaddingEnabled: true,
        });
      }
    };
    setdashboard();
  }, []);

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
      axios.post(`${process.env.REACT_APP_API_URL}` + "practices/", data);
    } catch {
      console.log("error");
    }
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="sort_buttons">
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
          <h2>練習投稿フォーム</h2>
          <form>
            <div className="tweetBox_icon_title">
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

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="tweetBox_description"
              placeholder="Description"
            />
            <div className="tweetBox_distance_date">
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
            </div>
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
      <Grid item xs={4}>
        <div id="embeddingContainer"></div>
        <h3>{month}の走行距離ランキング</h3>
        <div className="app-rankings">
          <div className="practices-list">
            {rankings.map((ranking) => (
              <Ranking key={ranking.username} rankingData={ranking}></Ranking>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Main;

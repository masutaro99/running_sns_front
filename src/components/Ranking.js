import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

const Ranking = ({ rankingData }) => {
  const [path, setPath] = useState([]);

  useEffect(() => {
    const getImage = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}` +
          `imgs/1?username=${rankingData.username}`
      );
      if (res.data !== null) {
        setPath(res.data.imagepath);
      } else {
        setPath("");
      }
    };
    getImage();
  }, []);

  return (
    <div className="ranking">
      <span>{rankingData.rank}</span>
      <div className="practice_avatar">
        {path ? (
          <Avatar src={path} />
        ) : (
          <Avatar src="https://maskenpa1001.s3.ap-northeast-1.amazonaws.com/icon_normal.png" />
        )}
      </div>
      <div className="practice_body">
        <span className="ranking_username">{rankingData.username}</span>
        <span className="ranking_distance">{rankingData.distance}km</span>
      </div>
    </div>
  );
};

export default Ranking;

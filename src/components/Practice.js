import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiContext";
import { Avatar } from "@material-ui/core";
import { BsTrash } from "react-icons/bs";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

const Practice = ({ practiceData }) => {
  const {
    practices,
    username,
    setPractices,
    setShowModal,
    setSelectedEditTarget,
    setEditedTitle,
    setEditedDescription,
    setEditedDistance,
    setEditedDate,
    setEditTargetDistance,
  } = useContext(ApiContext);
  const [path, setPath] = useState([]);

  useEffect(() => {
    const getImage = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}` +
          `imgs/1?username=${practiceData.username}`
      );
      if (res.data !== null) {
        setPath(res.data.imagepath);
      } else {
        setPath("");
      }
    };
    getImage();
  }, []);

  const editPractice = async () => {
    setSelectedEditTarget(practiceData.id);
    setEditedTitle(practiceData.title);
    setEditedDescription(practiceData.description);
    setEditedDistance(practiceData.distance);
    setEditedDate(practiceData.date);
    setEditTargetDistance(practiceData.distance);
    setShowModal(true);
  };

  const deletePractice = async () => {
    axios.delete(
      `${process.env.REACT_APP_API_URL}` +
        "practices/" +
        String(practiceData.id)
    );
    setPractices(practices.filter((dev) => dev.id !== practiceData.id));
    axios.post(
      `https://1isutj8e72.execute-api.ap-northeast-1.amazonaws.com/latestcors/ranking?month=${practiceData.date.substr(
        0,
        7
      )}&username=${practiceData.username}&distance=${-practiceData.distance}`
    );
  };

  return (
    <div className="practice">
      <div className="practice_avatar">
        {path ? (
          <Avatar src={path} />
        ) : (
          <Avatar src="https://maskenpa1001.s3.ap-northeast-1.amazonaws.com/icon_normal.png" />
        )}
      </div>
      <div className="practice_body">
        <span className="practice_title">{practiceData.title}</span>
        <span className="practice_username">by {practiceData.username}</span>
        <div className="practice_description">
          <p>{practiceData.description}</p>
        </div>
        <div className="practice_distance">
          <p>Distance : {practiceData.distance} km</p>
          <p>date: {practiceData.date}</p>
        </div>
        <div className="practice_footer">
          <span>
            {username === practiceData.username ? (
              <button onClick={() => editPractice()}>
                <EditIcon />
              </button>
            ) : (
              <span></span>
            )}
          </span>
          <span>
            {username === practiceData.username ? (
              <button className="trash" onClick={() => deletePractice()}>
                <BsTrash />
              </button>
            ) : (
              <span></span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Practice;

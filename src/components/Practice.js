import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/ApiContext";
import { Avatar } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
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
    setShowModal(true);
  };

  const deletePractice = async () => {
    axios.delete(
      `${process.env.REACT_APP_API_URL}` +
        "practices/" +
        String(practiceData.id)
    );
    setPractices(practices.filter((dev) => dev.id !== practiceData.id));
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
        <span className="practice_title">
          {practiceData.title}id:{practiceData.id}
        </span>
        <span className="practice_username">by {practiceData.username}</span>
        <div className="practice_description">
          <p>{practiceData.description}</p>
        </div>
        <div className="practice_distance">
          <p>Distance : {practiceData.distance} km</p>
          <p>date: {practiceData.date}</p>
        </div>
        <div className="practice_footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
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

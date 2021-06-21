import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { Avatar } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { BsTrash } from "react-icons/bs";
import axios from "axios";

const Practice = ({ practiceData }) => {
  const { practices, setPractices } = useContext(ApiContext);
  const deletePractice = async () => {
    console.log(practiceData.id);
    console.log(
      process.env.REACT_APP_API_URL + "practices/" + String(practiceData.id)
    );

    axios.delete(
      process.env.REACT_APP_API_URL + "practices/" + String(practiceData.id)
    );
    setPractices(practices.filter((dev) => dev.id !== practiceData.id));
  };
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src="https://maskenpa1001.s3.ap-northeast-1.amazonaws.com/icon_normal.png" />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {practiceData.title}
              <span className="post__headerSpecial">
                by{practiceData.username}
              </span>
              <span>{practiceData.userid}</span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{practiceData.description}</p>
          </div>
          <div className="post__headerDescription">
            <p>Distance : {practiceData.distance} km</p>
          </div>
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <button className="trash" onClick={() => deletePractice()}>
              <BsTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;

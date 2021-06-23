import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { Avatar } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { BsTrash } from "react-icons/bs";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

const Practice = ({ practiceData }) => {
  const { practices, setPractices, showModal, setShowModal, selectedEditTarget, setSelectedEditTarget } = useContext(ApiContext);
  const editPractice = async () => {
    setShowModal(true);
    setSelectedEditTarget(practiceData.id)
    console.log(practiceData.id)
  };
  const deletePractice = async () => {
    // console.log(practiceData.id);
    // console.log(
    //   process.env.REACT_APP_API_URL + "practices/" + String(practiceData.id)
    // );

    axios.delete(
      process.env.REACT_APP_API_URL + "practices/" + String(practiceData.id)
    );
    setPractices(practices.filter((dev) => dev.id !== practiceData.id));
  };
  return (
    <div className="practice">
      <div className="practice_avatar">
        <Avatar src="https://maskenpa1001.s3.ap-northeast-1.amazonaws.com/icon_normal.png" />
      </div>
      <div className="practice_body">
        <span className="practice_title">{practiceData.title}  id:{practiceData.id}</span>
        <span className="practice_username">by {practiceData.username}</span>
        <div className="practice_description">
          <p>{practiceData.description}</p>
        </div>
        <div className="practice_distance">
          <p>Distance : {practiceData.distance} km</p>
        </div>
        <div className="practice_footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <button onClick={() => editPractice()}>
            <EditIcon />
          </button>
          <button className="trash" onClick={() => deletePractice()}>
            <BsTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;

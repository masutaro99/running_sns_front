import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

const Profile = ({ profileData }) => {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src="https://maskenpa1001.s3.ap-northeast-1.amazonaws.com/icon_normal.png" />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {profileData.title}
              <span className="post__headerSpecial">
                by{profileData.username}
              </span>
              <span>{profileData.userid}</span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{profileData.description}</p>
          </div>
          <div className="post__headerDescription">
            <p>Distance : {profileData.distance} km</p>
          </div>
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <PublishIcon fontSize="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocationOn from "@material-ui/icons/LocationOn";
import { BsPersonCheckFill } from "react-icons/bs";
import { MdAddAPhoto } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IconButton } from "@material-ui/core";
import { Auth } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
      margin: 6,
    },
    "& .profile-image": {
      width: 150,
      height: 150,
      ojectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
      backgroundColor: "white",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
        color: "lightgrey",
        fontFamily: '"Comic Neue", cursive',
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 7px 0",
    },
  },
}));

const ProfileManager = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState([]);
  const [uid, setUid] = useState([]);

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      setUsername(data.username);
      setUid(data.attributes.sub);
    });
  }, []);

  return (
    <div className={classes.profile}>
      <div className="image-wrapper">
        <img
          src="https://maskenpa1001.s3.ap-northeast-1.amazonaws.com/icon_normal.png"
          alt="profile"
          className="profile-image"
        />
        <IconButton onClick={handleEditPicture}>
          <MdAddAPhoto className="photo" />
        </IconButton>
      </div>
      <div className="profile-details">
        <BsPersonCheckFill className="badge" /> {<span>{username}</span>}
        <hr />
        {<span>ID：{uid}</span>}
        <hr />
        <label>
          <LocationOn />
          <span>JAPAN</span>
        </label>
      </div>
    </div>
  );
};

export default ProfileManager;

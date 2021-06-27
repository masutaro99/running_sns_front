import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BsPersonCheckFill } from "react-icons/bs";
import { MdAddAPhoto } from "react-icons/md";
import { IconButton } from "@material-ui/core";
import { ApiContext } from "../context/ApiContext";
import { BsTrash } from "react-icons/bs";

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
  const {
    cover,
    setCover,
    createProfile,
    username,
    deleteProfile,
    editProfile,
  } = useContext(ApiContext);

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  return (
    <div className={classes.profile}>
      <div className="image-wrapper">
        {props.path ? (
          <img src={props.path} alt="profile" className="profile-image" />
        ) : (
          <img
            src="https://maskenpa1001.s3.ap-northeast-1.amazonaws.com/icon_normal.png"
            alt="profile"
            className="profile-image"
          />
        )}
        <input
          type="file"
          id="imageInput"
          hidden="hidden"
          onChange={(event) => {
            setCover(event.target.files[0]);
            event.target.value = "";
          }}
        />
        <IconButton onClick={handleEditPicture}>
          <MdAddAPhoto className="photo" />
        </IconButton>
        <div>{cover.name}</div>
      </div>
      {cover.name && props.path ? (
        <button className="user" onClick={() => editProfile()}>
          edit
        </button>
      ) : cover.name ? (
        <button className="user" onClick={() => createProfile()}>
          submit
        </button>
      ) : (
        <div></div>
      )}
      {props.path ? (
        <button className="trash" onClick={() => deleteProfile()}>
          <BsTrash />
        </button>
      ) : (
        <div></div>
      )}
      <div className="profile-details">
        <BsPersonCheckFill className="badge" /> {<span>{username}</span>}
      </div>
    </div>
  );
};

export default ProfileManager;

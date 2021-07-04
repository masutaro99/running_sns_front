import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { Avatar, TextField, Button } from "@material-ui/core";

const Modal = () => {
  const {
    showModal,
    setShowModal,
    editPracticePatch,
    editedtitle,
    setEditedTitle,
    editeddescription,
    setEditedDescription,
    editeddistance,
    setEditedDistance,
    editeddate,
    setEditedDate,
    path,
    setPath,
  } = useContext(ApiContext);
  const closeModal = () => {
    setShowModal(false);
    setEditedTitle("");
    setEditedDescription("");
    setEditedDistance("");
    setEditedDate("");
  };
  const editPractice = () => {
    editPracticePatch(
      editedtitle,
      editeddescription,
      editeddistance,
      editeddate
    );
    setEditedTitle("");
    setEditedDescription("");
    setEditedDistance("");
    setShowModal(false);
    setEditedDate("");
  };
  return (
    <>
      {showModal ? ( // showFlagがtrueだったらModalを表示する
        <div id="overlay">
          <div id="modalContent">
            <h2>編集画面</h2>
            <form>
              <div className="tweetBox_icon_title">
                {path ? (
                  <Avatar src={path} />
                ) : (
                  <Avatar src="https://maskenpa1001.s3.ap-northeast-1.amazonaws.com/icon_normal.png" />
                )}
                <input
                  value={editedtitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="title"
                  type="text"
                />
              </div>
              <p>description</p>
              <textarea
                value={editeddescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="tweetBox_description"
              />
              <p>distance</p>
              &nbsp; &nbsp; &nbsp;
              <input
                value={editeddistance}
                onChange={(e) => setEditedDistance(e.target.value)}
                placeholder="Distance"
                className="tweetBox_distance"
                type="number"
                step="0.1"
              />
              <p>date</p>
              <TextField
                onChange={(e) => setEditedDate(e.target.value)}
                type="date"
                defaultValue={editeddate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                onClick={editPractice}
                type="submit"
                className="tweetBox__tweetButton"
              >
                Edit
              </Button>
              <Button
                onClick={closeModal}
                type="submit"
                className="tweetBox__tweetButton"
              >
                Close
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;

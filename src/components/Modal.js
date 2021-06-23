import React, { useContext, useState } from "react";
import { ApiContext } from "../context/ApiContext";

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
  } = useContext(ApiContext);
  const closeModal = () => {
    setShowModal(false);
    setEditedTitle("");
    setEditedDescription("");
    setEditedDistance("");
  };
  const editPractice = () => {
    editPracticePatch(editedtitle, editeddescription, editeddistance);
    setEditedTitle("");
    setEditedDescription("");
    setEditedDistance("");
    setShowModal(false);
  };
  return (
    <>
      {showModal ? ( // showFlagがtrueだったらModalを表示する
        <div id="overlay">
          <div id="modalContent">
            <p>編集画面</p>
            <input
              value={editedtitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="title"
              type="text"
            />
            <input
              value={editeddescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="description"
              type="text"
            />
            <input
              value={editeddistance}
              onChange={(e) => setEditedDistance(e.target.value)}
              placeholder="Distance"
              type="number"
              step="0.1"
            />
            <button onClick={editPractice}>Edit</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;

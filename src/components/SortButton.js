import React from "react";
const dict = { distance: "距離", created_at: "投稿日", date: "練習日" };

const SortButton = ({ button, handleSort, sort }) => {
  return (
    <span>
      <button
        onClick={() => handleSort(button)}
        className={sort.key === button ? "active sort_button" : "sort_button"}
      >
        {dict[button]}
      </button>
      <span
        class={sort.key === button ? (sort.order === 1 ? "asc" : "desc") : ""}
      ></span>
    </span>
  );
};

export default SortButton;

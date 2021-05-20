import React from "react";

export default function StarRating(props) {
  let floor = Math.floor(props.avg);
  let starArr = [];
  for (let i = 0; i < 5; i++) {
    i < floor ? starArr.push("checked") : starArr.push("empty");
  }
  return (
    <div className="star-rating">
      {starArr.map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={`star ${star === "checked" ? "checked" : "empty"}`}
          ></span>
        );
      })}
    </div>
  );
}

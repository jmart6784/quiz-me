import React from "react";

const RatingCard = (props) => {
  let data = props.ratingData;

  return (
    <div>
      <p>Average: {data.average}</p>
      <p>1 Star: {data.value_1}</p>
      <p>2 Star: {data.value_2}</p>
      <p>3 Star: {data.value_3}</p>
      <p>4 Star: {data.value_4}</p>
      <p>5 Star: {data.value_5}</p>
    </div>
  );
};

export default RatingCard;
import React from "react";

const RatingCard = (props) => {
  let data = props.ratingData;

  return (
    <div className="rating-card-data">
      <p className="rating-card-average"><i className="fa-solid fa-star star"></i> {data.average}</p>
      <div>
        <p>1 <i className="fa-solid fa-star star"></i> {data.value_1}</p>
        <p>2 <i className="fa-solid fa-star star"></i> {data.value_2}</p>
        <p>3 <i className="fa-solid fa-star star"></i> {data.value_3}</p>
        <p>4 <i className="fa-solid fa-star star"></i> {data.value_4}</p>
        <p>5 <i className="fa-solid fa-star star"></i> {data.value_5}</p>
      </div>
    </div>
  );
};

export default RatingCard;
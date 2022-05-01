import React from "react";

const RatingCard = (props) => {
  let data = props.ratingData;

  return (
    <div className="rating-card-data">
      <p className="rating-card-average"><i className="fa-solid fa-star star"></i> {data.average}</p>
      <div>
        <p>
          {data.value_5 + " "}
          <i className="fa-solid fa-star star"></i>
          <i className="fa-solid fa-star star"></i>
          <i className="fa-solid fa-star star"></i>
          <i className="fa-solid fa-star star"></i>
          <i className="fa-solid fa-star star"></i>
        </p>
        <p>
          {data.value_4 + " "}
          <i className="fa-solid fa-star star"></i>
          <i className="fa-solid fa-star star"></i>
          <i className="fa-solid fa-star star"></i>
          <i className="fa-solid fa-star star"></i>
        </p>
        <p>
          {data.value_3 + " "}
          <i className="fa-solid fa-star star"></i>
          <i className="fa-solid fa-star star"></i>
          <i className="fa-solid fa-star star"></i>
        </p>
        <p>
          {data.value_2 + " "}
          <i className="fa-solid fa-star star"></i>
          <i className="fa-solid fa-star star"></i>
        </p>
        <p>{data.value_1 + " "}<i className="fa-solid fa-star star"></i></p>
      </div>
    </div>
  );
};

export default RatingCard;
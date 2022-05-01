import React from "react";

const RatingForm = (props) => {
  let stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <p onClick={() => props.submitRating(i)} key={`rate-star-${i}`}>
        {
          props.rating.value >= i ?
            <span className="user-rating-full">★</span>
          : <span className="user-rating-empty">☆</span>
        }
      </p>
    );
  }

  return (
    <div>
      <div className="rc-form-btn-div">{stars}</div>
    </div>
  );
};

export default RatingForm;
import React from "react";

const RatingForm = (props) => { 
  return (
    <div>
      <label>Rate:</label><br />
      <input
        type="number"
        name="value"
        min="1"
        max="5"
        onChange={(e) => props.onRateChange(e)}
        value={props.rating.value}
      />
      <button onClick={props.submitRating}>Rate</button>

      {
        props.rating.id === "" ?
          <p>Give a rating</p>
        :
          <p>My rating {props.rating.value} <i className="fa-solid fa-star star"></i></p>
      }
    </div>
  );
};

export default RatingForm;
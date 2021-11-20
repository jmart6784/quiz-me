import React from "react";

const Option = (props) => {
  let ques = props.question;
  let num = props.option;

  return (
    <label htmlFor={`q${ques}_option_${num}`}>
      <span>Option {num}</span>
      <textarea
        name={`q${ques}_option_${num}`}
        rows="5"
        required
        onChange={props.onChange}
      />
    </label>
  );
};

export default Option;

import React from "react";
import Option from "./Option";

const AddOptions = (props) => {
  let optionsJsx = [];

  // Creates option inputs 3-10 for a question
  for (let i = 3; i <= props.start; i++) {
    optionsJsx.push(
      <Option
        question={props.question}
        option={i}
        onChange={props.onChange}
        onQuestionChange={props.onQuestionChange}
        key={`q${props.question}_option_${i}`}
        forms={props.forms}
      />
    );
  }

  return optionsJsx;
};

export default AddOptions;

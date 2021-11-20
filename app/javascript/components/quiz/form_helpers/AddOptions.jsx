import React from "react";
import Option from "./Option";

const AddOptions = (props) => {
  let optionsJsx = [];

  // Creates inputs 3-15
  for (let i = 3; i <= props.start; i++) {
    optionsJsx.push(
      <Option
        question={props.question}
        option={i}
        onChange={props.onChange}
        key={`q${props.question}_option_${i}`}
      />
    );
  }

  return optionsJsx;
};

export default AddOptions;

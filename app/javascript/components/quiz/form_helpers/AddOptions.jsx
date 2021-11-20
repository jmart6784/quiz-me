import React from "react";

const AddOptions = (props) => {
  let optionsJsx = [];

  // Creates inputs 3-15
  for (let i = 3; i <= props.start; i++) {
    optionsJsx.push(
      <label
        htmlFor={`q${props.question}_option_${i}`}
        key={`q${props.question}_option_${i}_key`}
      >
        <span>Option {i}</span>
        <textarea
          name={`q${props.question}_option_${i}`}
          rows="5"
          required
          onChange={props.onChange}
        />
      </label>
    );
  }

  return optionsJsx;
};

export default AddOptions;

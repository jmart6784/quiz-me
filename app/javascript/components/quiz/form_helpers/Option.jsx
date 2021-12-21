import React from "react";

const Option = (props) => {
  let ques = props.question;
  let num = props.option;
  let forms = props.forms;

  let optionJsx;

  if (num > 2) {
    optionJsx = (
      <label htmlFor={`q${ques}_option_${num}`}>
        <span>Option {num}</span>
        <textarea
          name={`q${ques}_option_${num}`}
          rows="5"
          onChange={props.onChange}
          value={forms[`q${ques}_option_${num}`]}
        />
      </label>
    );
  } else {
    optionJsx = (
      <label htmlFor={`q${ques}_option_${num}`}>
        <span>Option {num}</span>
        <textarea
          name={`q${ques}_option_${num}`}
          rows="5"
          required
          onChange={props.onChange}
          value={forms[`q${ques}_option_${num}`]}
        />
      </label>
    );
  }

  return optionJsx;
};

export default Option;

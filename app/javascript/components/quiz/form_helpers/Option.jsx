import React from "react";

const Option = (props) => {
  let ques = props.question;
  let num = props.option;
  let forms = props.forms;
  let optionJsx;

  if (num > 2) {
    optionJsx = (
      <label>
        <span>Option {num}</span>
        <textarea
          name={`option_${num}`}
          rows="5"
          onChange={(e) => props.onQuestionChange(e, ques)}
          value={forms["questions"][ques][`option_${num}`]}
        />
      </label>
    );
  } else {
    optionJsx = (
      <label>
        <span>Option {num}</span>
        <textarea
          name={`option_${num}`}
          rows="5"
          required
          onChange={(e) => props.onQuestionChange(e, ques)}
          value={forms["questions"][ques][`option_${num}`]}
        />
      </label>
    );
  }

  return optionJsx;
};

export default Option;

import React from "react";

const Option = (props) => {
  let ques = props.question;
  let num = props.option;
  let forms = props.forms;
  let optionJsx;

  if (num > 2) {
    optionJsx = (
      <div className="qn-field-div">
        <p className="qn-label">Option {num}</p>
        <textarea
          name={`option_${num}`}
          rows="5"
          onChange={(e) => props.onQuestionChange(e, ques)}
          value={forms["questions"][ques][`option_${num}`]}
          className="qn-text-area"
        />
      </div>
    );
  } else {
    optionJsx = (
      <div>
        <p className="qn-label">Option {num}</p>
        <textarea
          name={`option_${num}`}
          rows="5"
          required
          onChange={(e) => props.onQuestionChange(e, ques)}
          value={forms["questions"][ques][`option_${num}`]}
          className="qn-text-area"
        />
      </div>
    );
  }

  return optionJsx;
};

export default Option;

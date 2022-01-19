import React from "react";
import Question from "../../quiz/form_helpers/Question";

const AddOption = (props) => {
  let optionsJsx = [];
  let question = props.question;

  // Creates option inputs 3-10 for a question
  for (let i = 1; i <= props.start; i++) {
    let option;

    if (i > 2) {
      option = (
        <label key={`question_${question.id}_option_${i}`}>
          <span>Option {i}</span>
          <textarea
            name={`option_${i}`}
            rows="5"
            onChange={props.onChange}
            value={question[`option_${i}`]}
          />
        </label>
      );
    } else {
      option = (
        <label key={`question_${question.id}_option_${i}`}>
          <span>Option {i}</span>
          <textarea
            name={`option_${i}`}
            rows="5"
            required
            onChange={props.onChange}
            value={question[`option_${i}`]}
          />
        </label>
      );
    }

    optionsJsx.push(option);
  }

  return optionsJsx;
};

export default AddOption;

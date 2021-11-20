import React from "react";
import Question from "./Question";

const AddQuestion = (props) => {
  let questionsJsx = [];

  let clickOptions = props.clickOptions;
  let setClickOptions = props.setClickOptions;

  for (let i = 2; i <= props.number; i++) {
    questionsJsx.push(
      <Question
        question={i}
        clickOptions={clickOptions}
        setClickOptions={setClickOptions}
        onChange={props.onChange}
        key={`question_${i}`}
      />
    );
  }

  return questionsJsx;
};

export default AddQuestion;

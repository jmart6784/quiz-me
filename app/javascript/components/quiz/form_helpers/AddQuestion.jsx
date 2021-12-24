import React from "react";
import Question from "./Question";

const AddQuestion = (props) => {
  let questionsJsx = [];

  for (let i = 2; i <= props.number; i++) {
    questionsJsx.push(
      <Question
        question={i}
        clickOptions={props.clickOptions}
        setClickOptions={props.setClickOptions}
        forms={props.forms}
        onChange={props.onChange}
        handleRadioChange={props.handleRadioChange}
        clearAnswers={props.clearAnswers}
        resetOption={props.resetOption}
        handleQuestionType={props.handleQuestionType}
        key={`question_${i}`}
      />
    );
  }

  return questionsJsx;
};

export default AddQuestion;

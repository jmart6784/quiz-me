import React from "react";
import Option from "./Option";
import AddOptions from "./AddOptions";

const Question = (props) => {
  let ques = props.question - 1;
  let clickOptions = props.clickOptions;
  let setClickOptions = props.setClickOptions;
  let forms = props.forms;

  let answerOptions = () => {
    let ary = [];

    if (forms["questions"][ques]["question_type"] === "one answer") {
      for (let i = 1; i <= clickOptions[`question_${ques + 1}`].start; i++) {
        ary.push(
          <div key={`answer_question_${ques + 1}_option_${i}`}>
            <input
              type="radio"
              value={`${i}`}
              onChange={(e) => props.handleRadioChange(e, ques)}
              checked={forms["questions"][ques]["answer"].includes(
                i.toString()
              )}
            />
            <label>{`Option ${i}`}</label>
          </div>
        );
      }
    } else {
      for (let i = 1; i <= clickOptions[`question_${ques + 1}`].start; i++) {
        ary.push(
          <div key={`answer_question_${ques + 1}_option_${i}`}>
            <input
              type="checkbox"
              value={`${i}`}
              onChange={(e) => props.handleCheckbox(e, ques)}
              checked={forms["questions"][ques]["answer"].includes(
                i.toString()
              )}
            />
            <label>{`Option ${i}`}</label>
          </div>
        );
      }
    }

    return ary;
  };

  return (
    <div>
      <h3>Question #{ques + 1}</h3>

      <div>
        <label>
          <span>Type</span>
          <select
            name="question_type"
            onChange={(e) => props.handleQuestionType(e, ques)}
            required
            value={forms["questions"][ques][`question_type`]}
          >
            <option value="one answer">Muliple choice (one answer)</option>
            <option value="multiple answers">
              Select all (multiple answers)
            </option>
          </select>
        </label>

        <br />
        <br />

        <label>
          <span>Question</span>
          <textarea
            name="question"
            rows="5"
            required
            onChange={(e) => props.onQuestionChange(e, ques)}
            value={forms["questions"][ques]["question"]}
          />
        </label>

        <br />
        <br />

        <Option
          question={ques}
          option="1"
          onChange={props.onChange}
          onQuestionChange={props.onQuestionChange}
          forms={forms}
        />

        <br />
        <br />

        <Option
          question={ques}
          option="2"
          onChange={props.onChange}
          onQuestionChange={props.onQuestionChange}
          forms={forms}
        />

        {clickOptions[`question_${ques + 1}`].isClicked ? (
          <AddOptions
            onChange={props.onChange}
            onQuestionChange={props.onQuestionChange}
            start={clickOptions[`question_${ques + 1}`].start}
            question={ques}
            forms={forms}
          />
        ) : (
          ""
        )}
      </div>

      <button
        disabled={!(clickOptions[`question_${ques + 1}`].start < 10)}
        type="button"
        onClick={() => {
          if (clickOptions[`question_${ques + 1}`].start < 10) {
            setClickOptions({
              ...clickOptions,
              [`question_${ques + 1}`]: {
                isClicked: true,
                start: clickOptions[`question_${ques + 1}`].start + 1,
                question: clickOptions[`question_${ques + 1}`].question,
              },
            });
          }
        }}
      >
        Add Option
      </button>

      {clickOptions[`question_${ques + 1}`].start != 2 ? (
        <button
          type="button"
          onClick={() => {
            if (clickOptions[`question_${ques + 1}`].start != 2) {
              setClickOptions({
                ...clickOptions,
                [`question_${ques + 1}`]: {
                  isClicked: true,
                  start: clickOptions[`question_${ques + 1}`].start - 1,
                  question: clickOptions[`question_${ques + 1}`].question,
                },
              });
            }
            props.clearAnswers(
              ques,
              clickOptions[`question_${ques + 1}`].start
            );
          }}
        >
          Remove Option
        </button>
      ) : (
        ""
      )}

      <br />
      <br />

      {answerOptions()}
    </div>
  );
};

export default Question;

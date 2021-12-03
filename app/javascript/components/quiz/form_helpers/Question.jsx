import React from "react";
import Option from "./Option";
import AddOptions from "./AddOptions";

const Question = (props) => {
  let ques = props.question;
  let clickOptions = props.clickOptions;
  let setClickOptions = props.setClickOptions;
  let forms = props.forms;
  let setForms = props.setForms;

  let answerOptions = () => {
    let ary = [];

    if (forms[`questionType_${ques}`] === "one answer") {
      for (let i = 1; i <= clickOptions[`question_${ques}`].start; i++) {
        ary.push(
          <div key={`answer_question_${ques}_option_${i}`}>
            <input
              type="radio"
              name={`answer_question_${ques}_option_${i}`}
              value={`${i}`}
              onChange={(e) => props.handleRadioChange(e, ques)}
              checked={!!forms[`answer_question_${ques}_option_${i}`]}
            />
            <label
              htmlFor={`answer_question_${ques}_option_${i}`}
            >{`Option ${i}`}</label>
          </div>
        );
      }
    } else {
      for (let i = 1; i <= clickOptions[`question_${ques}`].start; i++) {
        ary.push(
          <div key={`answer_question_${ques}_option_${i}`}>
            <input
              type="checkbox"
              name={`answer_question_${ques}_option_${i}`}
              value={`${i}`}
              onChange={props.onChange}
            />
            <label
              htmlFor={`answer_question_${ques}_option_${i}`}
            >{`Option ${i}`}</label>
          </div>
        );
      }
    }

    return ary;
  };

  return (
    <div>
      <h3>Question {ques}</h3>

      <div>
        <label htmlFor={`questionType_${ques}`}>
          <span>Type</span>
          <select
            name={`questionType_${ques}`}
            onChange={props.onChange}
            required
          >
            <option value="one answer">Muliple choice (one answer)</option>
            <option value="multiple answers">
              Select all (multiple answers)
            </option>
          </select>
        </label>

        <br />
        <br />

        <label htmlFor={`question_${ques}`}>
          <span>Question</span>
          <textarea
            name={`question_${ques}`}
            rows="5"
            required
            onChange={props.onChange}
          />
        </label>

        <br />
        <br />

        <Option question={ques} option="1" onChange={props.onChange} />

        <br />
        <br />

        <Option question={ques} option="2" onChange={props.onChange} />

        {clickOptions[`question_${ques}`].isClicked ? (
          <AddOptions
            onChange={props.onChange}
            start={clickOptions[`question_${ques}`].start}
            question={clickOptions[`question_${ques}`].question}
          />
        ) : (
          ""
        )}
      </div>

      <button
        disabled={!(clickOptions[`question_${ques}`].start < 10)}
        type="button"
        onClick={() => {
          if (clickOptions[`question_${ques}`].start < 10) {
            setClickOptions({
              ...clickOptions,
              [`question_${ques}`]: {
                isClicked: true,
                start: clickOptions[`question_${ques}`].start + 1,
                question: clickOptions[`question_${ques}`].question,
              },
            });
          }
        }}
      >
        Add Option
      </button>

      {clickOptions[`question_${ques}`].start != 2 ? (
        <button
          type="button"
          onClick={() => {
            if (clickOptions[`question_${ques}`].start != 2) {
              setClickOptions({
                ...clickOptions,
                [`question_${ques}`]: {
                  isClicked: true,
                  start: clickOptions[`question_${ques}`].start - 1,
                  question: clickOptions[`question_${ques}`].question,
                },
              });
            }
            props.clearAnswers(ques);
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

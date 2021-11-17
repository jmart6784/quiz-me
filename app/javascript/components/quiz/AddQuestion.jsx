import React from "react";
import AddOptions from "./AddOptions";

const AddQuestion = (props) => {
  let questionsJsx = [];

  let clickOptions = props.clickOptions;
  let setClickOptions = props.setClickOptions;

  for (let i = 2; i <= props.number; i++) {
    questionsJsx.push(
      <div key={`question_${i}`}>
        <h3>Question {i}</h3>

        <div>
          <label htmlFor={`questionType_${i}`}>
            <span>Type</span>
            <select
              name={`questionType_${i}`}
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

          <label htmlFor={`question_${i}`}>
            <span>Question</span>
            <textarea
              name={`question_${i}`}
              rows="5"
              required
              onChange={props.onChange}
            />
          </label>

          <br />
          <br />

          <label htmlFor={`q${i}_option_1`}>
            <span>Option 1</span>
            <textarea
              name={`q${i}_option_1`}
              rows="5"
              required
              onChange={props.onChange}
            />
          </label>

          <br />
          <br />

          <label htmlFor={`q${i}_option_2`}>
            <span>Option 2</span>
            <textarea
              name={`q${i}_option_2`}
              rows="5"
              required
              onChange={props.onChange}
            />
          </label>

          {clickOptions[`question_${i}`].isClicked ? (
            <AddOptions
              onChange={props.onChange}
              start={clickOptions[`question_${i}`].start}
              question={clickOptions[`question_${i}`].question}
            />
          ) : (
            ""
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            if (clickOptions[`question_${i}`].start < 10) {
              setClickOptions({
                ...clickOptions,
                [`question_${i}`]: {
                  isClicked: true,
                  start: clickOptions[`question_${i}`].start + 1,
                  question: clickOptions[`question_${i}`].question,
                },
              });
            }
          }}
        >
          Add Option
        </button>
      </div>
    );
  }

  return questionsJsx;
};

export default AddQuestion;

import React, { useEffect, useState } from "react";
import AddOption from "./question_form_helper/AddOption";

const QuestionEdit = (props) => {
  const [question, setQuestion] = useState({
    id: "",
    question_type: "",
    question: "",
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
    option_5: "",
    option_6: "",
    option_7: "",
    option_8: "",
    option_9: "",
    option_10: "",
    answer: "[]",
  });

  const [clickOptions, setClickOptions] = useState({
    isClicked: false,
    start: 2,
    question: 1,
  });

  const handleAnswers = (option) => {
    let answer = JSON.parse(question["answer"]);

    if (question["question_type"] === "one answer") {
      answer = [];
      answer.push(option.toString());
    } else {
      if (answer.includes(option.toString())) {
        let index = answer.indexOf(option.toString());
        if (index !== -1) {
          answer.splice(index, 1);
        }
      } else {
        answer.push(option.toString());
      }
    }
    setQuestion({ ...question, answer: JSON.stringify([...new Set(answer)]) });
  };

  let answerOptions = () => {
    let ary = [];
    let answers = JSON.parse(question["answer"]);

    if (question["question_type"] === "one answer") {
      for (let i = 1; i <= clickOptions["start"]; i++) {
        ary.push(
          <div key={`answer_option_${i}`}>
            <input
              type="radio"
              name={`answer_option_${i}`}
              value={`${i}`}
              onChange={() => handleAnswers(i)}
              checked={answers.includes(i.toString())}
            />
            <label>{`Option ${i}`}</label>
          </div>
        );
      }
    } else {
      for (let i = 1; i <= clickOptions["start"]; i++) {
        ary.push(
          <div key={`answer_option_${i}`}>
            <input
              type="checkbox"
              name={`answer_option_${i}`}
              value={`${i}`}
              onChange={() => handleAnswers(i)}
              checked={answers.includes(i.toString())}
            />
            <label>{`Option ${i}`}</label>
          </div>
        );
      }
    }

    return ary;
  };

  const handleQuestionType = (e, ques) => {
    const { name, value } = e.target;

    // let answerObj = {};

    // for (let i = 1; i <= 10; i++) {
    //   answerObj[`answer_question_${ques}_option_${i}`] = "";
    // }
    // setQuestion({ ...forms, [name]: value, ...answerObj });
    setQuestion({ ...question, [name]: value });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setQuestion({ ...question, [name]: value });
  };

  useEffect(() => {
    const url = `/api/v1/question/show/${props.match.params.id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setQuestion(response);

        let start = 0;
        let clicked = false;

        for (let i = 1; i <= 10; i++) {
          if (response[`option_${i}`] != "") {
            start += 1;
          }
        }

        start > 2 ? (clicked = !clicked) : "";

        setClickOptions({
          isClicked: clicked,
          start: start,
        });
      })
      .catch(() => props.history.push("/"));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => console.log(question), [question]);

  return (
    <div>
      <h1>Question Edit</h1>

      <form onSubmit={onSubmit}>
        <label>
          <span>Type</span>
          <select
            name="question_type"
            onChange={(e) => handleQuestionType(e, 1)}
            required
            value={question["question_type"]}
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
            onChange={onChange}
            value={question["question"]}
          />
        </label>

        <br />
        <br />

        <AddOption
          onChange={onChange}
          start={clickOptions["start"]}
          question={question}
        />

        <br />
        <br />

        <button
          disabled={!(clickOptions["start"] < 10)}
          type="button"
          onClick={() => {
            if (clickOptions["start"] < 10) {
              setClickOptions({
                isClicked: true,
                start: clickOptions["start"] + 1,
              });
            }
          }}
        >
          Add Option
        </button>

        {clickOptions["start"] != 2 ? (
          <button
            type="button"
            onClick={() => {
              if (clickOptions["start"] != 2) {
                setClickOptions({
                  isClicked: true,
                  start: clickOptions["start"] - 1,
                });
              }
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

        <br />
        <br />

        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default QuestionEdit;

import React, { useState } from "react";
import AddOption from "./question_form_helper/AddOption";

const QuestionNew = (props) => {
  const [question, setQuestion] = useState({
    id: "",
    question_type: "one answer",
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

  const handleQuestionType = (e) => {
    const { name, value } = e.target;

    setQuestion({ ...question, [name]: value, answer: "[]" });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setQuestion({ ...question, [name]: value });
  };

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
    answer = answer.sort();
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

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !question["question_type"] ||
      question["question"].length == 0 ||
      question["option_1"].length == 0 ||
      question["option_1"].length == 0 ||
      question["answer"] === "[]"
    )
      return;

    const formData = new FormData();
    formData.append("question[question_type]", question["question_type"]);
    formData.append("question[question]", question["question"]);
    for (let i = 1; i <= 10; i++) {
      formData.append(`question[option_${i}]`, question[`option_${i}`]);
    }
    formData.append("question[answer]", question["answer"]);
    formData.append("question[quiz_id]", props.match.params.id);

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(`/api/v1/questions/create`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => props.history.push(`/quizzes/edit/${props.match.params.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <h1>New Question</h1>

      <form onSubmit={onSubmit}>
        <label>
          <span>Type</span>
          <select
            name="question_type"
            onChange={(e) => handleQuestionType(e)}
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
                setQuestion({
                  ...question,
                  [`option_${clickOptions["start"]}`]: "",
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

        <button type="submit">Create Question</button>
      </form>
    </div>
  );
};

export default QuestionNew;

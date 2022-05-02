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
    setQuestion({
      ...question,
      answer: JSON.stringify([...new Set(answer.sort())]),
    });
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
            <label className="question-option-label">{`Option ${i}`}</label>
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
            <label className="question-option-label">{`Option ${i}`}</label>
          </div>
        );
      }
    }

    return ary;
  };

  const handleQuestionType = (e) => {
    const { name, value } = e.target;

    setQuestion({ ...question, [name]: value, answer: "[]" });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setQuestion({ ...question, [name]: value });
  };

  useEffect(() => {
    const url = `/api/v1/questions/show/${props.match.params.id}`;

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

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(`/api/v1/questions/update/${props.match.params.id}`, {
      method: "PUT",
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
      .then((response) => props.history.push(`/quizzes/edit/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <h1 className="question-edit-title">Question Edit</h1>

      <form onSubmit={onSubmit} className="question-edit-form">
        <div>
          <span>Type </span>
          <select
            name="question_type"
            onChange={(e) => handleQuestionType(e)}
            required
            value={question[`question_type`]}
          >
            <option value="one answer">Muliple choice (one answer)</option>
            <option value="multiple answers">
              Select all (multiple answers)
            </option>
          </select>
        </div>

        <div>
          <p className="qn-label">Question</p>
          <textarea
            name="question"
            rows="5"
            required
            onChange={onChange}
            value={question["question"]}
            className="qn-text-area"
          />
          <label className="forms-notes">{question["question"].length} of 300 characters</label>
        </div>

        <AddOption
          onChange={onChange}
          start={clickOptions["start"]}
          question={question}
        />

        {
          !(clickOptions["start"] < 10) ?
            ""
            : 
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
              className="qn-add-ques qn-toggle-btn"
            >
              Add Option
            </button>   
        }

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
            className="qn-remove-ques qn-toggle-btn"
          >
            Remove Option
          </button>
        ) : (
          ""
        )}
        <p className="question-option-label">Select answers: </p>
        {answerOptions()}

        <button type="submit" className="qn-toggle-btn qn-submit-quiz">
          <i className="fa-solid fa-pen"></i> Edit
        </button>
      </form>
    </div>
  );
};

export default QuestionEdit;

import React, { useState } from "react";
import AddQuestion from "./form_helpers/AddQuestion";
import quizFormInfo from "./form_helpers/quiz_form_info";
import Question from "./form_helpers/Question";

const QuizNew = (props) => {
  const [forms, setForms] = useState(quizFormInfo()[0]);

  const [clickOptions, setClickOptions] = useState(quizFormInfo()[1]);

  const [clickQuestions, setClickQuestions] = useState({
    question_1: {
      isClicked: false,
      number: 1,
    },
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setForms({ ...forms, [name]: value });
  };

  const onQuestionChange = (e, ques) => {
    const { name, value } = e.target;
    let questions = forms["questions"];
    questions[ques] = { ...questions[ques], [name]: value };

    setForms({ ...forms, questions: questions });
  };

  const limitNumbers = (event) => {
    const { name, value } = event.target;
    let hours = parseInt(forms["hours"]);
    let minutes = parseInt(forms["minutes"]);
    let seconds = parseInt(forms["seconds"]);
    let val = parseInt(value);
    let newTotal = hours * 3600 + minutes * 60 + val;

    if (name == "hours") {
      newTotal = val * 3600 + minutes * 60 + seconds;
    } else if (name == "minutes") {
      newTotal = hours * 3600 + val * 60 + seconds;
    }

    if (newTotal > 86400) return;

    if (val >= 0) {
      if (name === "hours" && val <= 24) {
        setForms({ ...forms, [name]: value });
      } else if (name === "minutes" && val <= 59) {
        setForms({ ...forms, [name]: value });
      } else if (name === "seconds" && val <= 59) {
        setForms({ ...forms, [name]: value });
      }
    }
  };

  const handleRadioChange = (e, ques) => {
    let questions = forms["questions"];
    questions[ques] = { ...questions[ques], answer: [e.target.value] };

    setForms({ ...forms, questions: questions });
  };

  const handleCheckbox = (e, ques) => {
    let questions = forms["questions"];
    let question = questions[ques];
    let value = e.target.value;

    if (question["answer"].includes(value)) {
      question["answer"] = question["answer"].filter((v) => v !== value);
    } else {
      question["answer"].push(value);
    }

    question["answer"] = [...new Set(question["answer"].sort((a, b) => a - b))];

    setForms({ ...forms, questions: questions });
  };

  const chooseImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setForms({ ...forms, ["cover"]: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const clearAnswers = (ques, option) => {
    let answerObj = {};

    answerObj[`q${ques}_option_${option}`] = "";
    answerObj[`answer_question_${ques}_option_${option}`] = "";

    setForms({ ...forms, ...answerObj });
  };

  const handleQuestionType = (e, ques) => {
    const { name, value } = e.target;
    let questions = forms["questions"];

    questions[ques] = {
      ...questions[ques],
      [name]: value === "one answer" ? "one answer" : "multiple answers",
      answer: [],
    };

    setForms({ ...forms, questions: questions });
  };

  const resetQuestionForm = (ques) => {
    let questionForm = {};
    questionForm[`questionType_${ques}`] = "one answer";
    questionForm[`question_${ques}`] = "";
    questionForm[`answer_string_${ques}`] = "";

    for (let i = 1; i <= 10; i++) {
      questionForm[`q${ques}_option_${i}`] = "";
      questionForm[`answer_question_${ques}_option_${i}`] = "";
    }

    setForms({ ...forms, ...questionForm });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const image_upload = document.getElementById("quizCover");

    const {
      name,
      description,
      hours,
      minutes,
      seconds,
    } = forms;

    if (name.length == 0 || description.length == 0) return;

    const formData = new FormData();
    formData.append("quiz[name]", name);
    formData.append("quiz[description]", description);
    formData.append(
      "quiz[questions_attributes][questions]",
      JSON.stringify(forms["questions"].filter((q) => q["answer"].length > 0))
    );

    formData.append(
      "quiz[time]",
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
    );

    if (image_upload.files[0]) {
      formData.append(
        "quiz[cover]",
        image_upload.files[0],
        image_upload.files[0].name
      );
    }

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch("/api/v1/quizzes/create", {
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
      .then((response) => props.history.push(`/quizzes/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="qn-parent-container">
      <h1 className="qn-title">Build Quiz</h1>

      <form onSubmit={onSubmit} className="qn-form">
        <div className="qn-quiz-form-section">

          <div className="qn-cover-image-div">
            {forms.cover != "" ? (
              <div
                style={{backgroundImage: `url(${forms.cover})`}}
                className="qn-image background-image"
              ></div>
            ) : (
              ""
            )}

            <p className="qn-label">Cover Image</p>
            <input
              type="file"
              accept="image/*"
              name="cover"
              id="quizCover"
              onChange={(e) => chooseImage(e)}
              onClick={(e) => (e.target.value = null)}
            />
            <label class="forms-notes">jpeg, jpg or png only</label>
          </div>

          <div className="qn-field-div">
            <p className="qn-label">Quiz Name</p>
            <input
              type="text"
              name="name"
              id="quizName"
              required
              onChange={onChange}
              className="qn-text-input"
            />
            <label className="forms-notes">{forms.name.length} of 50 characters</label>
          </div>

          <div className="qn-field-div">
            <p className="qn-label">Description</p>
            <textarea
              name="description"
              id="quizDescription"
              required
              onChange={onChange}
              className="qn-text-area"
              rows="5"
            />
            <label className="forms-notes">{forms.description.length} of 1000 characters</label>
          </div>

          <div>
            <span>
              <input
                type="checkbox"
                name={`isTimed`}
                value={forms["isTimed"]}
                onChange={(e) =>
                  setForms({
                    ...forms,
                    isTimed: !forms["isTimed"],
                    hours: "0",
                    minutes: "0",
                    seconds: "0",
                  })
                }
                checked={forms["isTimed"]}
              />
              Timed?
            </span>
          </div>

          {forms["isTimed"] ? (
            <div className="qn-timed-div">
              <div>
                <input
                  type="number"
                  name="hours"
                  id="quizHours"
                  onChange={limitNumbers}
                  value={forms["hours"]}
                  className="qn-time-input"
                /> Hours
              </div>

              <div>
                <input
                  type="number"
                  name="minutes"
                  id="quizMinutes"
                  onChange={limitNumbers}
                  value={forms["minutes"]}
                  className="qn-time-input"
                /> Minutes
              </div>

              <div>
                <input
                  type="number"
                  name="seconds"
                  id="quizSeconds"
                  onChange={limitNumbers}
                  value={forms["seconds"]}
                  className="qn-time-input"
                /> Seconds
              </div>

              <p>Max: 24h 0m 0s</p>
            </div>
          ) : (
            ""
          )}
        </div>
        
        <div className="qn-quiz-form-section">
          <Question
            question="1"
            clickOptions={clickOptions}
            setClickOptions={setClickOptions}
            forms={forms}
            onChange={onChange}
            onQuestionChange={onQuestionChange}
            handleRadioChange={handleRadioChange}
            handleCheckbox={handleCheckbox}
            clearAnswers={clearAnswers}
            handleQuestionType={handleQuestionType}
          />

          {clickQuestions.question_1.isClicked ? (
            <AddQuestion
              onChange={onChange}
              onQuestionChange={onQuestionChange}
              number={clickQuestions.question_1.number}
              clickOptions={clickOptions}
              setClickOptions={setClickOptions}
              forms={forms}
              handleRadioChange={handleRadioChange}
              handleCheckbox={handleCheckbox}
              clearAnswers={clearAnswers}
              handleQuestionType={handleQuestionType}
            />
          ) : (
            ""
          )}
        </div>
        
        <div className="qn-btn-section">
          {clickQuestions.question_1.number != 50 ? (
            <button
              type="button"
              onClick={() => {
                if (clickQuestions.question_1.number < 50) {
                  setClickQuestions({
                    ...clickQuestions,
                    question_1: {
                      isClicked: true,
                      number: clickQuestions.question_1.number + 1,
                    },
                  });
                }
              }}
              className="qn-toggle-btn qn-add-ques"
            >
              + Add Question
            </button>
          ) : (
            ""
          )}

          {clickQuestions.question_1.number != 1 ? (
            <button
              type="button"
              onClick={() => {
                if (clickQuestions.question_1.number < 50) {
                  setClickQuestions({
                    ...clickQuestions,
                    question_1: {
                      isClicked: true,
                      number: clickQuestions.question_1.number - 1,
                    },
                  });
                }
                resetQuestionForm(clickQuestions.question_1.number);
              }}
              className="qn-toggle-btn qn-remove-ques"
            >
              - Remove Question
            </button>
          ) : (
            ""
          )}

          <button type="submit" className="qn-toggle-btn qn-submit-quiz">
            <i className="fa-solid fa-hammer"></i> Build Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizNew;

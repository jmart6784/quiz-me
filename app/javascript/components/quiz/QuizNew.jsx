import React, { useEffect, useState } from "react";
import AddQuestion from "./form_helpers/AddQuestion";
import quizFormInfo from "./form_helpers/quiz_form_info";
import questionData from "./form_helpers/questionData";
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

    if ((name === "hours" && parseInt(value) <= 24) || value == "") {
      setForms({ ...forms, [name]: value });
    } else if ((name === "minutes" && parseInt(value) <= 59) || value == "") {
      setForms({ ...forms, [name]: value });
    } else if ((name === "seconds" && parseInt(value) <= 59) || value == "") {
      setForms({ ...forms, [name]: value });
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

    question["answer"].push(e.target.value);
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
      cover,
      name,
      description,
      hours,
      minutes,
      seconds,
      questionType_1,
      question_1,
      q1_option_1,
      q1_option_2,
    } = forms;

    if (
      name.length == 0 ||
      description.length == 0 ||
      !questionType_1 ||
      !question_1 ||
      q1_option_1.length == 0 ||
      q1_option_2.length == 0
    )
      return;

    const formData = new FormData();
    formData.append("quiz[name]", name);
    formData.append("quiz[description]", description);
    formData.append(
      "quiz[questions_attributes][questions]",
      questionData(forms)
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
    <div>
      <h1>New Quiz</h1>

      <form onSubmit={onSubmit}>
        {forms.cover != "" ? (
          <div>
            <img
              src={forms.cover}
              alt="quiz cover image"
              height="200"
              width="325"
            />

            <br />
          </div>
        ) : (
          ""
        )}

        <label htmlFor="quizCover">
          <span>Cover Image</span>
          <input
            type="file"
            accept="image/*"
            name="cover"
            id="quizCover"
            onChange={(e) => chooseImage(e)}
            onClick={(e) => (e.target.value = null)}
          />
        </label>

        <br />
        <br />

        <label htmlFor="quizName">
          <span>Quiz Name</span>
          <input
            type="text"
            name="name"
            id="quizName"
            required
            onChange={onChange}
          />
        </label>

        <br />
        <br />

        <label htmlFor="quizDescription">
          <span>Description</span>
          <input
            type="text"
            name="description"
            id="quizDescription"
            required
            onChange={onChange}
          />
        </label>

        <br />
        <br />

        <label>
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
        </label>

        <br />
        <br />

        {forms["isTimed"] ? (
          <div>
            <label>
              <span>Time</span>
              <input
                type="number"
                name="hours"
                id="quizHours"
                onChange={limitNumbers}
                value={forms["hours"]}
              />
              Hours
            </label>

            <label>
              <input
                type="number"
                name="minutes"
                id="quizMinutes"
                onChange={limitNumbers}
                value={forms["minutes"]}
              />
              Minutes
            </label>

            <label>
              <input
                type="number"
                name="seconds"
                id="quizSeconds"
                onChange={limitNumbers}
                value={forms["seconds"]}
              />
              Seconds
            </label>

            <br />
            <br />
          </div>
        ) : (
          ""
        )}

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
          >
            Add Question
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
          >
            Remove Question
          </button>
        ) : (
          ""
        )}

        <br />
        <br />

        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizNew;

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

  const handleRadioChange = (e, ques) => {
    const { name, value } = e.target;
    let changedRadios = {};

    for (let i = 1; i <= clickOptions[`question_${ques}`].start; i++) {
      if (i != parseInt(value)) {
        changedRadios[`answer_question_${ques}_option_${i}`] = "";
      }
    }

    setForms({
      ...forms,
      ...changedRadios,
      [name]: value,
    });
  };

  const clearAnswers = (ques) => {
    let answerObj = {};

    for (let i = 1; i <= 10; i++) {
      answerObj[`answer_question_${ques}_option_${i}`] = "";
    }
    setForms({ ...forms, ...answerObj });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const image_upload = document.getElementById("quizCover");

    const {
      cover,
      name,
      description,
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
      JSON.stringify(questionData(forms))
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

  useEffect(() => console.log(forms), [forms]);

  return (
    <div>
      <h1>New Quiz</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="quizCover">
          <span>Cover Image</span>
          <input
            type="file"
            accept="image/*"
            name="cover"
            id="quizCover"
            onChange={onChange}
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

        <Question
          question="1"
          clickOptions={clickOptions}
          setClickOptions={setClickOptions}
          forms={forms}
          onChange={onChange}
          handleRadioChange={handleRadioChange}
          clearAnswers={clearAnswers}
        />

        {clickQuestions.question_1.isClicked ? (
          <AddQuestion
            onChange={onChange}
            number={clickQuestions.question_1.number}
            clickOptions={clickOptions}
            setClickOptions={setClickOptions}
            forms={forms}
            handleRadioChange={handleRadioChange}
            clearAnswers={clearAnswers}
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

        <br />
        <br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default QuizNew;

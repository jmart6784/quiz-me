import React, { useEffect, useState } from "react";
import AddOptions from "./AddOptions";
import AddQuestion from "./AddQuestion";
import quizFormInfo from "./quiz_form_info";

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
      !!questionType_1 ||
      !question_1 ||
      q1_option_1.length == 0 ||
      q1_option_2.length == 0
    )
      return;

    let questions = [];

    const formData = new FormData();
    formData.append("quiz[name]", name);
    formData.append("quiz[description]", description);
    formData.append(
      "quiz[questions_attributes][questions]",
      JSON.stringify(questions)
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

        <div>
          <h3>Question 1</h3>

          <div>
            <label htmlFor="questionType_1">
              <span>Type</span>
              <select name="questionType_1" onChange={onChange} required>
                <option value="one answer">Muliple choice (one answer)</option>
                <option value="multiple answers">
                  Select all (multiple answers)
                </option>
              </select>
            </label>

            <br />
            <br />

            <label htmlFor="question_1">
              <span>Question</span>
              <textarea
                name="question_1"
                rows="5"
                required
                onChange={onChange}
              />
            </label>

            <br />
            <br />

            <label htmlFor="q1_option_1">
              <span>Option 1</span>
              <textarea
                name="q1_option_1"
                rows="5"
                required
                onChange={onChange}
              />
            </label>

            <br />
            <br />

            <label htmlFor="q1_option_2">
              <span>Option 2</span>
              <textarea
                name="q1_option_2"
                rows="5"
                required
                onChange={onChange}
              />
            </label>

            {clickOptions.question_1.isClicked ? (
              <AddOptions
                onChange={onChange}
                start={clickOptions.question_1.start}
                question={clickOptions.question_1.question}
              />
            ) : (
              ""
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              if (clickOptions.question_1.start < 10) {
                setClickOptions({
                  ...clickOptions,
                  question_1: {
                    isClicked: true,
                    start: clickOptions.question_1.start + 1,
                    question: clickOptions.question_1.question,
                  },
                });
              }
            }}
          >
            Add Option
          </button>
        </div>

        {clickQuestions.question_1.isClicked ? (
          <AddQuestion
            onChange={onChange}
            number={clickQuestions.question_1.number}
            clickOptions={clickOptions}
            setClickOptions={setClickOptions}
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

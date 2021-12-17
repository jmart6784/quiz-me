import React, { useState, useEffect } from "react";
import quizFormInfo from "./form_helpers/quiz_form_info";

const QuizEdit = (props) => {
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

  const handleQuestionType = (e, ques) => {
    const { name, value } = e.target;

    let answerObj = {};

    for (let i = 1; i <= 10; i++) {
      answerObj[`answer_question_${ques}_option_${i}`] = "";
    }
    setForms({ ...forms, [name]: value, ...answerObj });
  };

  useEffect(() => {
    const url = `/api/v1/quizzes/show/${props.match.params.id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) =>
        setForms({
          cover: response.cover.url,
          name: response.name,
          description: response.description,
        })
      )
      .catch(() => props.history.push("/"));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const image_upload = document.getElementById("quizCover");

    const { cover, name, description } = forms;

    if (name.length == 0 || description.length == 0) return;

    const formData = new FormData();
    formData.append("quiz[name]", name);
    formData.append("quiz[description]", description);

    if (image_upload.files[0]) {
      formData.append(
        "quiz[cover]",
        image_upload.files[0],
        image_upload.files[0].name
      );
    }

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(`/api/v1/quizzes/update/${props.match.params.id}`, {
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
      .then((response) => props.history.push(`/quizzes/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <h1>Edit Quiz</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="quizCover">
          <span>Cover Image</span>
          <input
            type="file"
            accept="image/*"
            name="cover"
            id="quizCover"
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
            value={forms.name}
          />
        </label>

        <label htmlFor="quizDescription">
          <span>Description</span>
          <input
            type="text"
            name="description"
            id="quizDescription"
            required
            onChange={onChange}
            value={forms.description}
          />
        </label>

        <button type="submit">Edit</button>
      </form>

      <img src={forms.cover} alt="quiz cover image" height="400" width="650" />
    </div>
  );
};

export default QuizEdit;

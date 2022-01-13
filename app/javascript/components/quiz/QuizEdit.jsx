import React, { useState, useEffect } from "react";
import quizFormInfo from "./form_helpers/quiz_form_info";
import questionData from "./form_helpers/questionData";

const QuizEdit = (props) => {
  const [forms, setForms] = useState(quizFormInfo()[0]);

  const onChange = (event) => {
    const { name, value } = event.target;

    setForms({ ...forms, [name]: value });
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
          ...forms,
          cover: response.cover.url,
          name: response.name,
          description: response.description,
        })
      )
      .catch(() => props.history.push("/"));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(forms);

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

  useEffect(() => console.log(forms), [forms]);

  return (
    <div>
      <h1>Edit Quiz</h1>

      <img src={forms.cover} alt="quiz cover image" height="200" width="325" />

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
            value={forms.name}
          />
        </label>

        <br />
        <br />

        <label htmlFor="quizDescription">
          <span>Description</span>
          <textarea
            name="description"
            id="quizDescription"
            required
            onChange={onChange}
            value={forms.description}
            rows="5"
          />
        </label>

        <br />
        <br />

        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default QuizEdit;

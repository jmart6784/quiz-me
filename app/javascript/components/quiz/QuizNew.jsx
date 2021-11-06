import React, { useState } from "react";

const QuizNew = (props) => {
  const [forms, setForms] = useState({
    cover: "",
    name: "",
    description: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setForms({ ...forms, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const image_upload = document.getElementById("quizCover");

    const { cover, name, description } = forms;

    if (!image_upload.files[0] || name.length == 0 || description.length == 0)
      return;

    const formData = new FormData();
    formData.append("quiz[name]", name);
    formData.append("quiz[description]", description);
    formData.append(
      "quiz[cover]",
      image_upload.files[0],
      image_upload.files[0].name
    );

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

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default QuizNew;

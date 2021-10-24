import React, { useState } from "react";

const QuizEdit = (props) => {
  const [forms, setForms] = useState({
    name: "",
    description: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setForms({ ...forms, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const {
      match: {
        params: { id },
      },
    } = props;
    const url = `/api/v1/quizzes/update/${id}`;
    const { name, description } = forms;

    if (name.length == 0 || description.length == 0) return;

    const body = {
      name,
      description,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => props.history.push(`/quizzes/${id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <h1>Edit Quiz</h1>

      <form onSubmit={onSubmit}>
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

export default QuizEdit;

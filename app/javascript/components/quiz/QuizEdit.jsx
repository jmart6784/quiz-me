import React, { useState } from "react";

const QuizEdit = () => {
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

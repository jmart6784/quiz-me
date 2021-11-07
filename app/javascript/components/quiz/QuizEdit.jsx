import React, { useState, useEffect } from "react";

const QuizEdit = (props) => {
  const [forms, setForms] = useState({
    cover: "",
    name: "",
    description: "",
  });

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

  const onChange = (event) => {
    const { name, value } = event.target;

    setForms({ ...forms, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const image_upload = document.getElementById("quizCover");

    const formData = new FormData();
    formData.append("quiz[name]", forms.name);
    formData.append("quiz[description]", forms.description);
    formData.append(
      "quiz[cover]",
      image_upload.files[0],
      image_upload.files[0].name
    );

    const { cover, name, description } = forms;

    if (!image_upload.files[0] || name.length == 0 || description.length == 0)
      return;

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

    fetch("/api/v1/quizzes/create", {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
      },
      body: formData,
    });
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

      <img src={forms.cover} alt="quiz cover image" height="400" width="600" />
    </div>
  );
};

export default QuizEdit;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const QuizEdit = (props) => {
  const [forms, setForms] = useState({
    cover: "",
    name: "",
    description: "",
    questions: [],
    hours: "0",
    minutes: "0",
    seconds: "0",
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setForms({ ...forms, [name]: value });
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
          questions: response.questions,
        })
      )
      .catch(() => props.history.push("/"));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const image_upload = document.getElementById("quizCover");

    const { cover, name, description, hours, minutes, seconds, questions } =
      forms;

    if (name.length == 0 || description.length == 0) return;

    const formData = new FormData();
    formData.append("quiz[name]", name);
    formData.append("quiz[description]", description);
    formData.append(
      "quiz[questions_attributes][questions]",
      JSON.stringify(questions)
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

  const deleteQuestion = (id) => {
    const url = `/api/v1/questions/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        let quesAry = forms.questions.filter((question) => {
          if (question.id != id) {
            return question;
          }
        });

        setForms({ ...forms, questions: quesAry });
      })
      .catch((error) => console.log(error.message));
  };

  let questionsJsx = (
    <div>
      <h3>No questions</h3>
    </div>
  );

  let numberLabel = 0;

  if (forms.questions.length > 0) {
    questionsJsx = forms.questions.map((question) => {
      numberLabel += 1;

      let optionsJsx = [];

      for (let i = 1; i <= 10; i++) {
        if (question[`option_${i}`] != "") {
          optionsJsx.push(
            <p key={`ques_${question.id}_option_${i}`}>
              <strong>Option {i} </strong>
              {question[`option_${i}`]}
            </p>
          );
        }
      }
      let answers = JSON.parse(question.answer);
      return (
        <div key={question.id}>
          <h3>Question #{numberLabel}</h3>
          <p>{question.question}</p>
          {optionsJsx}
          <p>
            {`Answer${answers.length > 1 ? "s" : ""}: ` + answers.join(", ")}
          </p>

          <Link to={`/question/edit/${question.id}`}>Edit</Link>

          {numberLabel === 1 ? (
            ""
          ) : (
            <button type="button" onClick={() => deleteQuestion(question.id)}>
              Delete
            </button>
          )}
        </div>
      );
    });
  }

  const chooseImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setForms({ ...forms, ["cover"]: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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

        <button type="submit">Edit</button>
      </form>

      <p>{`Questions ${forms.questions.length}/50`}</p>

      <br />

      {forms.questions.length < 50 ? (
        <Link to={`/question/new/${props.match.params.id}`}>New Question</Link>
      ) : (
        ""
      )}

      <div>{questionsJsx}</div>
    </div>
  );
};

export default QuizEdit;

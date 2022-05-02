import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import secondsToTime from "./form_helpers/secondsToTime";

const QuizEdit = (props) => {
  const [forms, setForms] = useState({
    cover: "",
    name: "",
    description: "",
    questions: [],
    isTimed: false,
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

    let hours = parseInt(forms["hours"]);
    let minutes = parseInt(forms["minutes"]);
    let seconds = parseInt(forms["seconds"]);
    let val = parseInt(value);
    let newTotal = hours * 3600 + minutes * 60 + val;

    if (name == "hours") {
      newTotal = val * 3600 + minutes * 60 + seconds;
    } else if (name == "minutes") {
      newTotal = hours * 3600 + val * 60 + seconds;
    }

    if (newTotal > 86400) return;

    if (val >= 0) {
      if (name === "hours" && val <= 24) {
        setForms({ ...forms, [name]: value });
      } else if (name === "minutes" && val <= 59) {
        setForms({ ...forms, [name]: value });
      } else if (name === "seconds" && val <= 59) {
        setForms({ ...forms, [name]: value });
      }
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
      .then((response) => {
        let time = secondsToTime(parseInt(response.time));

        setForms({
          ...forms,
          cover: response.cover.url,
          name: response.name,
          description: response.description,
          questions: response.questions,
          isTimed: parseInt(response.time) > 0,
          hours: time.hours,
          minutes: time.minutes,
          seconds: time.seconds,
        });
      })
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
            <p key={`ques_${question.id}_option_${i}`} className="qe-question-option">
              <strong>Option {i} </strong>
              {question[`option_${i}`]}
            </p>
          );
        }
      }
      let answers = JSON.parse(question.answer);
      return (
        <div key={question.id} className="qe-question-div">
          <h3 className="qe-question-question">Question #{numberLabel}</h3>
          <p className="qe-question-option">
            <strong>{question.question}</strong>
          </p>
          {optionsJsx}
          <p>
            {`Answer${answers.length > 1 ? "s" : ""}: ` + answers.join(", ")}
          </p>

          <div className="qe-question-options">
            <Link to={`/question/edit/${question.id}`} className="qe-edit-question">Edit</Link>

            {numberLabel === 1 ? (
              ""
            ) : (
              <button
                type="button"
                onClick={() => confirm("Delete question?") ? deleteQuestion(question.id) : ""}
                className="qe-delete-question"
              >
                Delete
              </button>
            )}
          </div>
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
      <h1 className="qn-title">Edit Quiz</h1>

      <form onSubmit={onSubmit} className="qn-form">
        <div className="qn-quiz-form-section">
          
          <div className="qn-cover-image-div">
            <div
              style={{backgroundImage: `url(${forms.cover})`}}
              className="qn-image background-image"
            ></div>

            <p className="qn-label">Cover Image</p>
            <input
              type="file"
              accept="image/*"
              name="cover"
              id="quizCover"
              onChange={(e) => chooseImage(e)}
              onClick={(e) => (e.target.value = null)}
            />
            <label class="forms-notes">jpeg, jpg or png only</label>
          </div>

          <div className="qn-field-div">
            <p className="qn-label">Quiz Name</p>
            <input
              type="text"
              name="name"
              id="quizName"
              required
              onChange={onChange}
              value={forms.name}
              className="qn-text-input"
            />
            <label className="forms-notes">{forms.name.length} of 50 characters</label>
          </div>

          <div className="qn-field-div">
            <p className="qn-label">Description</p>
            <textarea
              name="description"
              id="quizDescription"
              required
              onChange={onChange}
              value={forms.description}
              className="qn-text-area"
              rows="5"
            />
            <label className="forms-notes">{forms.description.length} of 1000 characters</label>
          </div>

          <div>
            <span>
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
            </span>
          </div>

          {forms["isTimed"] ? (
            <div className="qn-timed-div">
              <div>
                <input
                  type="number"
                  name="hours"
                  id="quizHours"
                  onChange={limitNumbers}
                  value={forms["hours"]}
                  className="qn-time-input"
                /> Hours
              </div>

              <div>
                <input
                  type="number"
                  name="minutes"
                  id="quizMinutes"
                  onChange={limitNumbers}
                  value={forms["minutes"]}
                  className="qn-time-input"
                /> Minutes
              </div>

              <div>
                <input
                  type="number"
                  name="seconds"
                  id="quizSeconds"
                  onChange={limitNumbers}
                  value={forms["seconds"]}
                  className="qn-time-input"
                /> Seconds
              </div>

              <p>Max: 24h 0m 0s</p>
            </div>
          ) : (
            ""
          )}

          <button type="submit" className="qn-toggle-btn qn-submit-quiz">
            <i className="fa-solid fa-pen"></i> Edit
          </button>
        </div>
      </form>

      <div className="qe-questions-div">
        <h3 className="qe-title">{`Questions ${forms.questions.length}/50`}</h3>

        {forms.questions.length < 50 ? (
          <Link to={`/question/new/${props.match.params.id}`} className="qe-new-question-btn">New Question</Link>
        ) : (
          ""
        )}

        <div className="qe-edit-list">{questionsJsx}</div>
      </div>
    </div>
  );
};

export default QuizEdit;

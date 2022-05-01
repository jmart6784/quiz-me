import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import QuizCard from "../quiz/components/QuizCard";
import secondsToTime from "../quiz/form_helpers/secondsToTime";

const UserShow = (props) => {
  const [user, setUser] = useContext(UserContext);

  const [showUser, setShowUser] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    bio: "",
    avatar: { url: "" },
  });
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;

    fetch(`/api/v1/users/show/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setShowUser(response))
      .catch(() => props.history.push("/"));
    
    fetch(`/api/v1/quizzes_by_user/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuizzes(response))
      .catch(() => props.history.push("/"));
  }, [props.match.params.id]);

  const deleteQuiz = (id) => {
    fetch(`/api/v1/quizzes/destroy/${id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => window.location.reload())
      .catch((error) => console.log(error.message));
  };
  
  let editLink = "";
  if (user.current_user) {
    if (user.current_user.id === showUser.id) {
      editLink = <a href="/users/edit" className="user-show-edit-link">
        <i className="fa-solid fa-gear"></i> Edit profile
      </a>
    }
  }

  let bio = "";
  if (showUser.bio !== null) {
    if (showUser.bio.trim() !== "") {
      bio = <p><strong>Bio: </strong><br />
        {showUser.bio}
      </p>
    }
  }

  let quizzesJsx = <div className="quiz-index-no-quiz-parent"><h1>No Quizzes yet.</h1></div>;
  if (quizzes.length > 0) {
    quizzesJsx = quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} secondsToTime={secondsToTime} deleteQuiz={deleteQuiz} />);
  }

  return (
    <div className="user-show-parent-container">
      <div className="user-show-info-div">
        <div
          style={{ backgroundImage: `url(${showUser.avatar.url})` }}
          className="user-show-avatar background-image"
        >
        </div>

        <div className="user-show-text-div">
          {editLink}
          <p className="user-show-username">{showUser.username}</p>
          <p className="user-show-full-name">{`${showUser.first_name} ${showUser.last_name}`}</p>
          {bio}
        </div>
      </div>

      <div className="quiz-index-container">{quizzesJsx}</div>
    </div>
  );
};

export default UserShow;

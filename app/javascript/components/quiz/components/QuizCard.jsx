import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const QuizCard = (props) => {
  const { quiz, secondsToTime, deleteQuiz } = props;
  const [showDesc, setShowDes] = useState(false);
  const [user, setUser] = useContext(UserContext);

  let time = secondsToTime(quiz.time);
  let hours = parseInt(time.hours) <= 9 ? `0${time.hours}` : time.hours;
  let minutes = parseInt(time.minutes) <= 9 ? `0${time.minutes}` : time.minutes;
  let seconds = parseInt(time.seconds) <= 9 ? `0${time.seconds}` : time.seconds;

  let userOptions = "";
  
  if (user.current_user) {
    if (user.current_user.id === quiz.user.id) {
      userOptions = <div className="quiz-card-options">
        <Link to={`/quizzes/edit/${quiz.id}`} className="quiz-card-edit">Edit</Link>
        <button onClick={() => confirm("Delete quiz?") ? deleteQuiz(quiz.id) : ""} className="quiz-card-delete">Delete</button>
      </div>
    }
  }

  return (
    <div
      style={
        { backgroundImage: `url(${quiz.cover.url})` }
      }
      className="quiz-cover-image background-image"
      key={quiz.id}
    >
      {userOptions}

      <p className="quiz-card-rating">
        <i className="fa-solid fa-star star"></i> {quiz.rating_data.average}
      </p>

      <div className="quiz-card-content">
        <p className="quiz-card-name">{quiz.name}</p>

        {quiz.time > 0 ? (
          <p className="quiz-card-time">
            <i className="fa-solid fa-clock"></i>{" "}
            {`${hours}:${minutes}:${seconds}`}
          </p>
        ) : (
          <p className="quiz-card-time"><i className="fa-solid fa-infinity"></i> Unlimited time</p>
        )}
        
        <Link to={`/users/${quiz.user.id}`} className="quiz-card-user">
          <i className="fa-solid fa-user"></i> {quiz.user.username}
        </Link>

        <Link to={`/quizzes/${quiz.id}`} className="quiz-card-start">Start</Link>

        <div>
          <button onClick={() => setShowDes(!showDesc)} className="quiz-card-desc-btn">
            {showDesc ? "- Description" : "+ Description"}
          </button>

          {showDesc ? <p className="quiz-card-desc">{quiz.description}</p> : ""}
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
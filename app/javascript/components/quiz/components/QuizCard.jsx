import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuizCard = (props) => {
  const { quiz, secondsToTime, deleteQuiz } = props;
  const [showDesc, setShowDes] = useState(false);

  let time = secondsToTime(quiz.time);
  let hours = parseInt(time.hours) <= 9 ? `0${time.hours}` : time.hours;
  let minutes = parseInt(time.minutes) <= 9 ? `0${time.minutes}` : time.minutes;
  let seconds = parseInt(time.seconds) <= 9 ? `0${time.seconds}` : time.seconds;

  return (
    <div style={
        { backgroundImage: `url(${quiz.cover.url})` }
      }
      className="quiz-cover-image background-image"
      key={quiz.id}
    >
      <div className="quiz-card-content">
        <p>Name: {quiz.name}</p>

        <div>
          <button onClick={() => setShowDes(!showDesc)}>
            {showDesc ? "Hide" : "Show"}
          </button>

          {showDesc ? <p>Description: {quiz.description}</p> : ""}
        </div>

        {quiz.time > 0 ? (
          <p>
            Time:{" "}
            {`${hours}:${minutes}:${seconds}`}
          </p>
        ) : (
          <p>Not Timed</p>
        )}
        <Link to={`/quizzes/${quiz.id}`}>Show</Link>
        <Link to={`/quizzes/edit/${quiz.id}`}>Edit</Link>
        <button onClick={() => deleteQuiz(quiz.id)}>Delete</button>
        <br />
        <p>
          By: <Link to={`/users/${quiz.user.id}`}>{quiz.user.username}</Link>
        </p>
      </div>
    </div>
  );
}

export default QuizCard;
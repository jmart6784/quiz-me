import React from "react";
import { Link } from "react-router-dom";

const QuizCard = (props) => {
  const { quiz, secondsToTime, deleteQuiz } = props;

  return (
    <div style={
        { backgroundImage: `url(${quiz.cover.url})` }
      }
      className="quiz-cover-image background-image"
      key={quiz.id}
    >
      <div className="quiz-card-content">
        <p>Name: {quiz.name}</p>

        <p>Description: {quiz.description}</p>
        {quiz.time > 0 ? (
          <p>
            Time:{" "}
            {`${secondsToTime(quiz.time).hours}:${
              secondsToTime(quiz.time).minutes
            }:${secondsToTime(quiz.time).seconds}`}
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
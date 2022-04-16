import React, { useEffect, useState } from "react";
import UaOptions from "./quiz_start_helper/UaOptions";
import quizStartObjects from "./quiz_start_helper/quizStartObjects";

const UnAuthQuizStart = (props) => {
  const quizObjects = quizStartObjects();

  const [quiz, setQuiz] = useState(quizObjects[0]);
  const [questionResults, setQuestionResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/v1/quizzes/show/${props.match.params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuiz(response))
      .catch(() => props.history.push("/"));
  }, []);

  const submitQuestion = (question, answer) => { 
    
  };

  let question = quiz["questions"][page - 1];

  useEffect(() => console.log(quiz), [quiz]);

  return (
    <div>
      <h1>Unauthorized Quiz start</h1>
      <p>Question {`${page}/${quiz.questions.length}`}</p>

      <div>
        <h3>Question #{page}</h3>
        <p>Question: {question["question"]}</p>

        <UaOptions question={question} submitQuestion={submitQuestion} />

        <br />
        <button
          onClick={() => {
            page > 1 ? setPage(prevState => prevState - 1) : ""
          }}
          disabled={page === 1}
        >Previous</button>

        <button
          onClick={() => { 
            quiz.questions.length >= page ? setPage(prevState => prevState + 1) : ""
          }}
          disabled={page === quiz.questions.length}
        >Next</button>
      </div>
    </div>
  );
};

export default UnAuthQuizStart;
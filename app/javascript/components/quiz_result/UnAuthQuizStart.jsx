import React, { useEffect, useState } from "react";
import UaOptions from "./quiz_start_helper/UaOptions";

const UnAuthQuizStart = (props) => {
  const [quiz, setQuiz] = useState({
    id: "",
    name: "",
    description: "",
    time: 0,
    cover: { url: "" },
    user: {
      id: "",
      username: "",
    },
    questions: [
      {
        id: "",
        question_type: "one answer",
        question: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
        option_5: "",
        option_6: "",
        option_7: "",
        option_8: "",
        option_9: "",
        option_10: "",
        answer: "[]",
        quiz_id: "",
        user_id: ""
      }
    ],
  });

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

  let question = quiz["questions"][page - 1];

  useEffect(() => console.log(quiz), [quiz]);

  return (
    <div>
      <h1>Unauthorized Quiz start</h1>
      <p>Question {`${page}/${quiz.questions.length}`}</p>

      <div>
        <h3>Question #{page}</h3>
        <p>Question: {question["question"]}</p>

        <UaOptions question={question} />
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
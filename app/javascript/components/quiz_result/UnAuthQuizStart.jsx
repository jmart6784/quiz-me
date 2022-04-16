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

  const submitQuestion = (e, question) => {
    let answer = e.target.value;
    let questionResult = {
      id: "",
      correct: "",
      answer: question['answer'],
      user_answer: "[]",
      question_id: question.id,
      quiz_id: props.match.params.id,
      quiz_result_id: "",
      user_id: ""
    };

    if (questionResults.length > 0) {
      for (let i = 0; i < questionResults.length; i++) {
        const qr = questionResults[i];
        if (qr.question_id === question.id) {
          questionResult = qr;
        }
      }
    }

    if (question["question_type"] === "one answer") {
      questionResult['user_answer'] = JSON.stringify([answer]);
    } else if (question["question_type"] === "multiple answers") { 
      let userAnswer = JSON.parse(questionResult['user_answer'])
      userAnswer.push(answer);
      userAnswer = JSON.stringify([...new Set(user_answer.sort((a, b) => a - b))]);
      questionResult['user_answer'] = userAnswer;
    }
    questionResult['correct'] = questionResult['answer'] === questionResult['user_answer'];

    setQuestionResults([...new Set([...questionResults, questionResult])]);
  };

  let question = quiz["questions"][page - 1];

  return (
    <div>
      <h1>Unauthorized Quiz start</h1>
      <p>Question {`${page}/${quiz.questions.length}`}</p>

      <div>
        <h3>Question #{page}</h3>
        <p>Question: {question["question"]}</p>

        <UaOptions
          question={question}
          questionResult={questionResults[page - 1]}
          submitQuestion={submitQuestion} 
        />

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
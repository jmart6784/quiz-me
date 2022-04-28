import React, { useEffect, useState, useContext } from "react";
import QuizResultCard from "./components/QuizResultCard";
import quizStartObjects from "./quiz_start_helper/quizStartObjects";
import UserContext from "../context/UserContext";

const QuizResultShow = (props) => { 
  const [user, setUser] = useContext(UserContext);
  user.current_user ? "" : props.history.push('/');

  const [quizResult, setQuizResult] = useState(quizStartObjects()[1]);

  useEffect(() => { 
    fetch(`/api/v1/quiz_results/show/${props.match.params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuizResult(response))
      .catch(() => props.history.push("/"));
  }, []);

  return (
    <div>
      <h1>Quiz Result Show</h1>
      <QuizResultCard quizResult={quizResult} />
    </div>
  );
}

export default QuizResultShow;
import React, { useState, useEffect, useMemo } from "react";
import secondsToTime from "./form_helpers/secondsToTime";
import Pagination from "../layouts/Pagination";
import QuizCard from "./components/QuizCard";

const QuizIndex = (props) => {
  let pageSize = 10;
  const [quizzes, setQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/api/v1/quizzes/index")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuizzes(response))
      .catch(() => console.log("Error getting quiz index"));
  }, []);

  const quizzesPage = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return quizzes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, quizzes]);

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

  let allQuizzes = quizzesPage.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} secondsToTime={secondsToTime} deleteQuiz={deleteQuiz} />);

  let noQuizzes = <h1>No Quizzes yet.</h1>;

  return (
    <div>
      <h1>Quiz Index</h1>
      {quizzes.length > 0 ? allQuizzes : noQuizzes}

      <Pagination 
        currentPage={currentPage}
        totalCount={quizzes.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
};

export default QuizIndex;

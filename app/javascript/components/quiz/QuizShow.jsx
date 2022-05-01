import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import secondsToTime from "./form_helpers/secondsToTime";
import QuizResultCard from "../quiz_result/components/QuizResultCard";
import UserContext from "../context/UserContext";
import RatingCard from "../rating/components/RatingCard";
import RatingForm from "../rating/components/RatingForm";
import Pagination from "../layouts/Pagination";

const QuizShow = (props) => {
  let pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useContext(UserContext);

  const [quiz, setQuiz] = useState({
    id: "",
    name: "",
    description: "",
    hours: "0",
    minutes: "0",
    seconds: "0",
    cover: { url: "" },
    user: {
      id: "",
      username: "",
    },
  });

  const [quizResults, setQuizResults] = useState([]);
  const [rating, setRating] = useState({ id: "", value: "", user_id: "", quiz_id: "" });
  const [ratingData, setRatingData] = useState({
    average: 0.0, 
    value_1: 0, 
    value_2: 0, 
    value_3: 0, 
    value_4: 0, 
    value_5: 0
  });

  const quizresultsPage = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return quizResults.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, quizResults]);

  useEffect(() => {
    fetch(`/api/v1/quizzes/show/${props.match.params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        let { hours, minutes, seconds } = secondsToTime(
          parseInt(response.time)
        );
        setQuiz({ ...response, hours, minutes, seconds });
      })
      .catch(() => props.history.push("/"));

    if (user.current_user) { 
      fetch(`/api/v1/quiz_results/quiz_results_by_quiz_id/${props.match.params.id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => setQuizResults(response))
        .catch(() => props.history.push("/"));
    }
    if (user.current_user) {
      fetch(`/api/v1/rating_show_by_quiz/${props.match.params.id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => response.id ? setRating(response) : undefined)
        .catch(() => props.history.push("/"));
    }

    fetch(`/api/v1/rating_data/${props.match.params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setRatingData(response))
      .catch(() => props.history.push("/"));
  }, [user]);

  const deleteQuiz = () => {
    const {
      match: {
        params: { id },
      },
    } = props;
    const url = `/api/v1/quizzes/destroy/${id}`;
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
      .then(() => props.history.push("/"))
      .catch((error) => console.log(error.message));
  };

  let quizResultsJsx = <div><p>Sign in to save results</p></div>;

  if (user.current_user) { 
    quizResultsJsx = <p>No Results Yet.</p>;

    quizResultsJsx = quizresultsPage.map((r) => <QuizResultCard key={`quiz-result-${r.id}`} quizResult={r} />);
  }

  const startQuiz = () => {
    const formData = new FormData();
    formData.append("quiz_result[quiz_id]", quiz.id);

    fetch("/api/v1/quiz_results/create", {
      method: "POST",
      headers: {
        "X-CSRF-Token":  document.querySelector('meta[name="csrf-token"]').content,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        props.history.push(`/quiz_start/${response.id}`)
      })
      .catch((error) => console.log(error.message));
  };

  const submitRating = (value) => { 
    setRating({ ...rating, value });
    const formData = new FormData();
    formData.append("rating[value]", value);
    formData.append("rating[quiz_id]", props.match.params.id);

    fetch("/api/v1/ratings/create", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      }).then((response) => setRating(response))
      .catch((error) => console.log(error.message));
  };

  let userOptions = "";

  let time = secondsToTime(quiz.time);
  let hours = parseInt(time.hours) <= 9 ? `0${time.hours}` : time.hours;
  let minutes = parseInt(time.minutes) <= 9 ? `0${time.minutes}` : time.minutes;
  let seconds = parseInt(time.seconds) <= 9 ? `0${time.seconds}` : time.seconds;

  if (user.current_user) {
    if (user.current_user.id === quiz.user.id) {
      userOptions = <div className="quiz-show-user-options">
        <Link to={`/quizzes/edit/${quiz.id}`} className="user-show-edit-btn">Edit</Link>
        <button onClick={() => confirm("Delete quiz?") ? deleteQuiz() : ""} className="user-show-delete-btn">
          Delete
        </button>
      </div>
    } 
  }

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${quiz.cover.url})` }} 
        className="background-image"
      >
        <div className="quiz-show-tint">
          <p className="quiz-show-name">{quiz.name}</p>
          <p className="quiz-show-desc"><strong>Description:</strong>
            <br />{quiz.description}
          </p>
          {
            quiz.time > 0 ?
              <p className="quiz-show-time">
                <i className="fa-solid fa-clock"></i> {`${hours}:${minutes}:${seconds}`}
              </p>
              :
              <p className="quiz-show-time">
                <i className="fa-solid fa-clock"></i> Unlimited time
              </p>
          }
          <Link to={`/users/${quiz.user.id}`} className="quiz-show-author">
            <i className="fa-solid fa-user"></i> {quiz.user.username}
          </Link>
          {
            user.current_user ?
              <button onClick={startQuiz} className="quiz-show-start">Start Quiz</button>
            : <Link to={`/ua_quiz_start/${quiz.id}`} className="quiz-show-start">Start Quiz</Link>
          }

          {userOptions}
        </div>
      </div>

      <div className="rating-parent-div">
          { 
            user.current_user ? 
              <RatingForm rating={rating} submitRating={submitRating} />
            : <p>Sign in to rate quiz</p>
          }
          <RatingCard ratingData={ratingData} />
      </div>

      <div className="quiz-result-card-parent">{quizResultsJsx}</div>

      <Pagination 
        currentPage={currentPage}
        totalCount={quizResults.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  );
};

export default QuizShow;

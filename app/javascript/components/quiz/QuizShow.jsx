import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import secondsToTime from "./form_helpers/secondsToTime";
import QuizResultCard from "../quiz_result/components/QuizResultCard";
import UserContext from "../context/UserContext";

const QuizShow = (props) => {
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

    quizResultsJsx = quizResults.map((r) => <QuizResultCard key={`quiz-result-${r.id}`} quizResult={r} />);
  }

  const onRateChange = (event) => {
    const { name, value } = event.target;
    if (parseInt(value) >= 1 && parseInt(value) <= 5) {
      setRating({ ...rating, [name]: value });
    }
  };

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

  const submitRating = () => { 
    const formData = new FormData();
    formData.append("rating[value]", rating.value);
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

  return (
    <div>
      <h1>Quiz Show</h1>
      <h3>Name: {quiz.name}</h3>
      <p>Description: {quiz.description}</p>
      {
        quiz.time > 0 ?
          <p>Time: {`${quiz.hours}:${quiz.minutes}:${quiz.seconds}`}</p>
          :
          <p>Not timed</p>
      }
      {user.current_user ? 
        <div>
          <Link to={`/quizzes/edit/${quiz.id}`}>Edit</Link>
          <button onClick={deleteQuiz}>Delete</button>
          <br />
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
        : <Link to={`/ua_quiz_start/${quiz.id}`}>Start Quiz</Link>
      }
      <p>
        Created by:{" "}
        <Link to={`/users/${quiz.user.id}`}>{quiz.user.username}</Link>
      </p>
      <br />
      <div>
        <label>Rate:</label><br />
        <input
          type="number"
          name="value"
          min="1"
          max="5"
          onChange={onRateChange}
          value={rating.value}
        />
        <button onClick={submitRating}>Rate</button>

        {rating.id === "" ? <p>Give a rating</p> : <p>My rating {rating.value}</p>}
      </div>
      <br />
      <img src={quiz.cover.url} alt="quiz cover" height="400" width="600" />

      {quizResultsJsx}
    </div>
  );
};

export default QuizShow;

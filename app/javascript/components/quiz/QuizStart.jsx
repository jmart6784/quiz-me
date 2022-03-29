import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import secondsToTime from "./form_helpers/secondsToTime";

const QuizStart = (props) => {
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

  useEffect(() => {
    const url = `/api/v1/quiz_results/show/${props.match.params.id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        console.log("QUIZ START", response)
        // let { hours, minutes, seconds } = secondsToTime(
        //   parseInt(response.time)
        // );
        // setQuiz({ ...response, hours, minutes, seconds });
      })
      .catch(() => props.history.push("/"));
  }, []);

  return (
    <div>
      <h1>Quiz Start</h1>
    </div>
  )
};

export default QuizStart;
import React, { useEffect, useState } from "react";

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
  });

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

  useEffect(() => console.log(quiz), [quiz]);

  return (
    <div>
      <h1>Unauthorized Quiz start</h1>
    </div>
  );
};

export default UnAuthQuizStart;
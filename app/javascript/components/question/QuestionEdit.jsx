import React, { useEffect, useState } from "react";

const QuestionEdit = (props) => {
  const [question, setQuestion] = useState({
    id: "",
    question_type: "",
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
  });

  useEffect(() => {
    const url = `/api/v1/question/show/${props.match.params.id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuestion(response))
      .catch(() => props.history.push("/"));
  }, []);

  return (
    <div>
      <h1>Question Edit</h1>
    </div>
  );
};

export default QuestionEdit;

import React, { useEffect, useState } from "react";

const UnAuthQuizStart = (props) => {
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

  useEffect(() => console.log(quiz), [quiz]);

  return (
    <div>
      <h1>Unauthoized Quiz start</h1>
    </div>
  );
};

export default UnAuthQuizStart;
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

  // const [clickOptions, setClickOptions] = useState({
  //   question_1: {
  //     isClicked: false,
  //     start: 2,
  //     question: 1,
  //   },
  // });

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

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Question Edit</h1>

      <form onSubmit={onSubmit}>
        <label>
          <span>Type</span>
          <select
            name="questionType"
            onChange={(e) => props.handleQuestionType(e, ques)}
            required
            value={question["questionType"]}
          >
            <option value="one answer">Muliple choice (one answer)</option>
            <option value="multiple answers">
              Select all (multiple answers)
            </option>
          </select>
        </label>

        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default QuestionEdit;

import React, { useEffect, useState } from "react";
import AddOption from "./question_form_helper/AddOption";

const QuestionNew = () => {
  const [question, setQuestion] = useState({
    id: "",
    question_type: "one answer",
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

  const [clickOptions, setClickOptions] = useState({
    isClicked: false,
    start: 2,
    question: 1,
  });

  const handleQuestionType = (e) => {
    const { name, value } = e.target;

    setQuestion({ ...question, [name]: value, answer: "[]" });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setQuestion({ ...question, [name]: value });
  };

  useEffect(() => console.log(question), [question]);

  return (
    <div>
      <h1>New Question</h1>

      <form>
        <label>
          <span>Type</span>
          <select
            name="question_type"
            onChange={(e) => handleQuestionType(e)}
            required
            value={question["question_type"]}
          >
            <option value="one answer">Muliple choice (one answer)</option>
            <option value="multiple answers">
              Select all (multiple answers)
            </option>
          </select>
        </label>

        <br />
        <br />

        <label>
          <span>Question</span>
          <textarea
            name="question"
            rows="5"
            required
            onChange={onChange}
            value={question["question"]}
          />
        </label>

        <br />
        <br />

        <AddOption
          onChange={onChange}
          start={clickOptions["start"]}
          question={question}
        />
      </form>
    </div>
  );
};

export default QuestionNew;

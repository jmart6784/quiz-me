import React, { useEffect, useState } from "react";

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
      </form>
    </div>
  );
};

export default QuestionNew;

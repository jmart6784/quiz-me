import React, { useState } from "react";

const QuestionNew = () => {
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

  return (
    <div>
      <h1>New Question</h1>

      <form>
        <label>
          <span>Type</span>
          <select
            name="question_type"
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

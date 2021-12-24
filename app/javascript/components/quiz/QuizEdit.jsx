import React, { useState, useEffect } from "react";
import quizFormInfo from "./form_helpers/quiz_form_info";
import questionData from "./form_helpers/questionData";
import Question from "./form_helpers/Question";
import AddQuestion from "./form_helpers/AddQuestion";
import adjustEditForms from "./form_helpers/adjustEditForms";

const QuizEdit = (props) => {
  const [forms, setForms] = useState(quizFormInfo()[0]);

  const [clickOptions, setClickOptions] = useState(quizFormInfo()[1]);

  const [clickQuestions, setClickQuestions] = useState({
    question_1: {
      isClicked: false,
      number: 1,
    },
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setForms({ ...forms, [name]: value });
  };

  const handleRadioChange = (e, ques) => {
    const { name, value } = e.target;
    let changedRadios = {};

    for (let i = 1; i <= clickOptions[`question_${ques}`].start; i++) {
      if (i != parseInt(value)) {
        changedRadios[`answer_question_${ques}_option_${i}`] = "";
      }
    }

    setForms({
      ...forms,
      ...changedRadios,
      [name]: value,
    });
  };

  const clearAnswers = (ques, option) => {
    let answerObj = {};

    answerObj[`q${ques}_option_${option}`] = "";

    for (let i = 1; i <= 10; i++) {
      answerObj[`answer_question_${ques}_option_${i}`] = "";
    }
    setForms({ ...forms, ...answerObj });
  };

  const handleQuestionType = (e, ques) => {
    const { name, value } = e.target;

    let answerObj = {};

    for (let i = 1; i <= 10; i++) {
      answerObj[`answer_question_${ques}_option_${i}`] = "";
    }
    setForms({ ...forms, [name]: value, ...answerObj });
  };

  const resetQuestionForm = (ques) => {
    let questionForm = {};
    questionForm[`questionType_${ques}`] = "one answer";
    questionForm[`question_${ques}`] = "";
    questionForm[`answer_string_${ques}`] = "";

    for (let i = 1; i <= 10; i++) {
      questionForm[`q${ques}_option_${i}`] = "";
      questionForm[`answer_question_${ques}_option_${i}`] = "";
    }

    setForms({ ...forms, ...questionForm });
  };

  useEffect(() => {
    const url = `/api/v1/quizzes/show/${props.match.params.id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        let obj = {};

        for (let i = 1; i <= response.questions.length; i++) {
          const question = response.questions[i - 1];
          obj[`questionType_${i}`] = question.question_type;
          obj[`question_${i}`] = question.question;

          for (let i2 = 1; i2 <= 10; i2++) {
            obj[`q${i}_option_${i2}`] = question[`option_${i2}`];

            JSON.parse(question.answer).forEach((answer) => {
              if (parseInt(answer) == i2) {
                obj[`answer_question_${i}_option_${i2}`] = answer;
              }
            });
          }
        }

        let updatedForms = {
          ...forms,
          ...obj,
          cover: response.cover.url,
          name: response.name,
          description: response.description,
        };

        setForms(updatedForms);

        setClickOptions(adjustEditForms(updatedForms, clickOptions));

        if (response.questions.length > 1) {
          setClickQuestions({
            question_1: {
              isClicked: true,
              number: response.questions.length,
            },
          });
        }
      })
      .catch(() => props.history.push("/"));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(forms);

    // const image_upload = document.getElementById("quizCover");

    // const {
    //   cover,
    //   name,
    //   description,
    //   questionType_1,
    //   question_1,
    //   q1_option_1,
    //   q1_option_2,
    // } = forms;

    // if (
    //   name.length == 0 ||
    //   description.length == 0 ||
    //   !questionType_1 ||
    //   !question_1 ||
    //   q1_option_1.length == 0 ||
    //   q1_option_2.length == 0
    // )
    //   return;

    // const formData = new FormData();
    // formData.append("quiz[name]", name);
    // formData.append("quiz[description]", description);

    // formData.append(
    //   "quiz[questions_attributes][questions]",
    //   questionData(forms)
    // );

    // if (image_upload.files[0]) {
    //   formData.append(
    //     "quiz[cover]",
    //     image_upload.files[0],
    //     image_upload.files[0].name
    //   );
    // }

    // const token = document.querySelector('meta[name="csrf-token"]').content;

    // fetch(`/api/v1/quizzes/update/${props.match.params.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "X-CSRF-Token": token,
    //   },
    //   body: formData,
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error("Network response was not ok.");
    //   })
    //   .then((response) => props.history.push(`/quizzes/${response.id}`))
    //   .catch((error) => console.log(error.message));
  };

  useEffect(() => console.log(forms), [forms]);

  return (
    <div>
      <h1>Edit Quiz</h1>

      <img src={forms.cover} alt="quiz cover image" height="200" width="325" />

      <form onSubmit={onSubmit}>
        <label htmlFor="quizCover">
          <span>Cover Image</span>
          <input
            type="file"
            accept="image/*"
            name="cover"
            id="quizCover"
            onChange={onChange}
            onClick={(e) => (e.target.value = null)}
          />
        </label>

        <br />
        <br />

        <label htmlFor="quizName">
          <span>Quiz Name</span>
          <input
            type="text"
            name="name"
            id="quizName"
            required
            onChange={onChange}
            value={forms.name}
          />
        </label>

        <br />
        <br />

        <label htmlFor="quizDescription">
          <span>Description</span>
          <textarea
            name="description"
            id="quizDescription"
            required
            onChange={onChange}
            value={forms.description}
            rows="5"
          />
        </label>

        <br />
        <br />

        <Question
          question="1"
          clickOptions={clickOptions}
          setClickOptions={setClickOptions}
          forms={forms}
          onChange={onChange}
          handleRadioChange={handleRadioChange}
          clearAnswers={clearAnswers}
          handleQuestionType={handleQuestionType}
        />

        {clickQuestions.question_1.isClicked ? (
          <AddQuestion
            onChange={onChange}
            number={clickQuestions.question_1.number}
            clickOptions={clickOptions}
            setClickOptions={setClickOptions}
            forms={forms}
            handleRadioChange={handleRadioChange}
            clearAnswers={clearAnswers}
            handleQuestionType={handleQuestionType}
          />
        ) : (
          ""
        )}

        {clickQuestions.question_1.number != 50 ? (
          <button
            type="button"
            onClick={() => {
              if (clickQuestions.question_1.number < 50) {
                setClickQuestions({
                  ...clickQuestions,
                  question_1: {
                    isClicked: true,
                    number: clickQuestions.question_1.number + 1,
                  },
                });
              }
            }}
          >
            Add Question
          </button>
        ) : (
          ""
        )}

        {clickQuestions.question_1.number != 1 ? (
          <button
            type="button"
            onClick={() => {
              if (clickQuestions.question_1.number < 50) {
                setClickQuestions({
                  ...clickQuestions,
                  question_1: {
                    isClicked: true,
                    number: clickQuestions.question_1.number - 1,
                  },
                });
              }
              resetQuestionForm(clickQuestions.question_1.number);
            }}
          >
            Remove Question
          </button>
        ) : (
          ""
        )}

        <br />
        <br />

        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default QuizEdit;

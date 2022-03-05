const quizFormInfo = () => {
  let info = [];

  let forms = {
    cover: "",
    name: "",
    description: "",
    isTimed: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    questions: [],
  };

  // create questions state info 1 - 50
  for (let i = 1; i <= 50; i++) {
    let question = {};

    question["questionType"] = "one answer";
    question["question"] = "";
    question["id"] = "";

    // Create question options for 1 - 10
    for (let i2 = 1; i2 <= 10; i2++) {
      question[`option_${i2}`] = "";
      question["answer"] = [];
    }
    forms["questions"].push(question);
  }

  info.push(forms);

  let clickOptions = {};

  // Create click options for questions 1 - 50
  for (let i = 1; i <= 50; i++) {
    clickOptions[`question_${i}`] = {
      isClicked: false,
      start: 2,
      question: i,
    };
  }

  info.push(clickOptions);

  return info;
};

export default quizFormInfo;

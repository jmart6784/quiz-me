const quizFormInfo = () => {
  let info = [];

  let forms = {
    cover: "",
    name: "",
    description: "",
  };

  // create questions state info 1 - 50
  for (let i = 1; i <= 50; i++) {
    forms[`questionType_${i}`] = "one answer";
    forms[`question_${i}_id`] = "";

    // Create question options for 1 - 10
    for (let i2 = 1; i2 <= 10; i2++) {
      forms[`q${i}_option_${i2}`] = "";
      forms[`answer_question_${i}_option_${i2}`] = "";
    }
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

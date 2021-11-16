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
    forms[`question_${i}`] = "";

    // Create question options for 1 - 10
    for (let i2 = 1; i2 <= 10; i2++) {
      forms[`q${i}_options_${i2}`] = "";
    }
  }

  info.push(forms);

  return info;
};

export default quizFormInfo;

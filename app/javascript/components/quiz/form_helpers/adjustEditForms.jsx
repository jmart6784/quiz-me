const adjustEditForms = (forms, clickOptions) => {
  let optionCount = 0;

  for (let i = 1; i <= 50; i++) {
    for (let i2 = 1; i2 <= 10; i2++) {
      if (forms[`q${i}_option_${i2}`] != "") {
        optionCount += 1;
      }
    }

    if (optionCount >= 0 && optionCount <= 2) {
      clickOptions[`question_${i}`] = {
        isClicked: false,
        start: 2,
        question: i,
      };
    } else {
      clickOptions[`question_${i}`] = {
        isClicked: true,
        start: optionCount,
        question: i,
      };
    }

    optionCount = 0;
  }

  return clickOptions;
};

export default adjustEditForms;

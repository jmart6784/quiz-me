const questionData = (forms) => {
  let questions = [];

  for (let ques = 1; ques <= 50; ques++) {
    let answer = [];

    for (let i = 1; i <= 10; i++) {
      if (forms[`answer_question_${ques}_option_${i}`] != "") {
        answer.push(forms[`answer_question_${ques}_option_${i}`]);
      }
    }

    if (
      forms[`question_${ques}`] ||
      forms[`question_${ques}`] ||
      forms[`q${ques}_option_1`] ||
      forms[`q${ques}_option_2`] ||
      answer.length > 0
    ) {
      questions.push({
        id: forms[`question_${ques}_id`],
        question_type: forms[`questionType_${ques}`],
        question: forms[`question_${ques}`],
        option_1: forms[`q${ques}_option_1`],
        option_2: forms[`q${ques}_option_2`],
        option_3: forms[`q${ques}_option_3`],
        option_4: forms[`q${ques}_option_4`],
        option_5: forms[`q${ques}_option_5`],
        option_6: forms[`q${ques}_option_6`],
        option_7: forms[`q${ques}_option_7`],
        option_8: forms[`q${ques}_option_8`],
        option_9: forms[`q${ques}_option_9`],
        option_10: forms[`q${ques}_option_10`],
        answer: answer,
      });
    }
  }

  return JSON.stringify(questions);
};

export default questionData;

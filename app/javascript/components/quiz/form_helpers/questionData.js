const questionData = (forms) => {
  let questions = [];

  for (let i = 1; i <= 50; i++) {
    if (
      forms[`question_${i}`] ||
      forms[`question_${i}`] ||
      forms[`q${i}_option_1`] ||
      forms[`q${i}_option_2`] ||
      forms[`answer_question_${i}`]
    ) {
      questions.push({
        question_type: forms[`questionType_${i}`],
        question: forms[`question_${i}`],
        option_1: forms[`q${i}_option_1`],
        option_2: forms[`q${i}_option_2`],
        option_3: forms[`q${i}_option_3`],
        option_4: forms[`q${i}_option_4`],
        option_5: forms[`q${i}_option_5`],
        option_6: forms[`q${i}_option_6`],
        option_7: forms[`q${i}_option_7`],
        option_8: forms[`q${i}_option_8`],
        option_9: forms[`q${i}_option_9`],
        option_10: forms[`q${i}_option_10`],
      });
    }
  }

  return questions;
};

export default questionData;

const quizStartObjects = () => {
  const quizObject = {
    id: "",
    name: "",
    description: "",
    time: 0,
    cover: { url: "" },
    user: {
      id: "",
      username: "",
    },
    questions: [
      {
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
        answer: "",
        quiz_id: "",
        user_id: "",
      },
    ],
  };

  const quizResultObject = {
    id: "",
    start: "",
    end: "",
    completed_at: "",
    finished: false,
    quiz_id: "",
    user_id: "",
    time: 0,
    quiz: {
      id: "",
      name: "",
      description: "",
      cover: { url: "" },
      time: 0,
    },
    user: {
      id: "",
      avatar: { url: "" },
      bio: "",
      email: "",
      first_name: "",
      last_name: "",
      username: "",
    },
  };

  return [quizObject, quizResultObject];
};

export default quizStartObjects;
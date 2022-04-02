import React from "react";

const Options = (props) => {
    let question = props.question;
  let options = [];

  for (let i = 1; i <= 10; i++) {
    if (question[`option_${i}`] != "") { 
      options.push(<p key={`option_${i}`}>{question[`option_${i}`]}</p>);
    }
  }

  return <div>{options}</div>
};

export default Options;
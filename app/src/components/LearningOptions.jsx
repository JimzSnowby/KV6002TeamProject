import React from "react";

import "./LearningOptions.css";


const LearningOptions = (props) => {
  const options = [
    {
      text: "Account issues",
      handler: props.actionProvider.handleJavascriptList,
      id: 1,
    },
    { text: "Charity", handler: () => {}, id: 2 },
    { text: "Volunteering", handler: () => {}, id: 3 },
    { text: "Participating", handler: () => {}, id: 4 },
    { text: "Donations", handler: () => {}, id: 5 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;
import React from "react";

import "./LearningOptions.css";


const LearningOptions = (props) => {
  const handleEvidenceTypesClick = () => {
    // Call the handler function provided by the action provider
    props.actionProvider.handleEvidenceTypes();
  };


  const handleDonationsClick = () => {
    // Call the handler function provided by the action provider
    props.actionProvider.handleDonations();
  };


  const options = [
    {
      text: "Account issues",
      handler: props.actionProvider.handleJavascriptList,
      id: 1,
    },
    { text: "Charity", handler: () => {}, id: 2 },
    { text: "Volunteering", handler: () => {}, id: 3 },
    { text: "Participating", handler: () => {}, id: 4 },
    { text: "Allowed evidence types", handler: handleEvidenceTypesClick, id: 7 }, // Update this option
    { text: "Donations", handler: handleDonationsClick, id: 6 },

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
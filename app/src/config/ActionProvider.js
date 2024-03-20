class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleJavascriptList = () => {
    const message = this.createChatBotMessage(
      "I am really sorry you are experiencing technical difficulties.",
      {
        widget: "javascriptLinks",
      }
    );

    this.updateChatbotState(message);
  };

  handleDonations = () => {
    const message = this.createChatBotMessage(
      "Thank you for being interested in donating to the ROSE charity. If you wish to donate please",
    );

    this.updateChatbotState(message);
  };

  handleDonations = () => {
    // Define the evidence types
    const donationMessage = "Thank you for your interest in donating! Your generosity can make a significant impact. To proceed with your donation, please visit our Sponsor page. Thank you again for your generosity and kindness. Together, we can make a difference!";

    // Create a chatbot message with the donation information
    const message = this.createChatBotMessage(donationMessage);

    // Update the chatbot state
    this.updateChatbotState(message);
  };

  handleEvidenceTypes = () => {
    // Define the evidence types
    const evidenceTypes = [
      "Please see the allowed evidence types you can submit:",
      "Payslips",
      "Employment Verification Letter",
      "Bank Statements",
      "Tax Returns",
      "Pension Statements",
      "Alimony or Child Support Documentation"
    ];

    // Iterate over the evidence types to create and update chatbot state
    evidenceTypes.forEach(evidence => {
      const message = this.createChatBotMessage(evidence);
      this.updateChatbotState(message);
    });
  };

  handleEvidence = () => {
    const message = this.createChatBotMessage(
      "To participate in the charity events you will have to provide a proof of income. This evidence is necessary to verify your eligibility for participation.",
      {
        widget: "incomeEvidence",
      }
    );

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
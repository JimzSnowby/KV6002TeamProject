class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    }

    if (lowerCaseMessage.includes("javascript")) {
      this.actionProvider.handleJavascriptList();
    }
    if (lowerCaseMessage.includes("allowed evidence types")) {
      this.actionProvider.handleEvidenceTypes();
    }
    // Check for specific queries related to evidence types
    const evidenceQueries = ["allowed evidence types", "evidence types", "what evidence",  "allowed evidence", "submit evidence", "which evidence", "evidence options", "income proofs", "income types"];
    for (const query of evidenceQueries) {
      if (lowerCaseMessage.includes(query)) {
        this.actionProvider.handleEvidenceTypes();
        break;
      }
    }

    // Check for specific queries related to evidence types
    const donationQueries = ["how to donate", "donations", "send money", "support charity", "how can I donate", "donation options"];
    for (const query of donationQueries) {
      if (lowerCaseMessage.includes(query)) {
        this.actionProvider.handleDonations();
        break;
      }
    }
  }
}

export default MessageParser;


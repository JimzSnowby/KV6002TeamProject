import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import LinkList from "../LinkList/LinkList";
import LearningOptions from "../components/LearningOptions";

const config = {
  botName: "ROSEbot",
  initialMessages: [
    createChatBotMessage("Hi, I'm here to help. What can I do for you today?", {
      widget: "learningOptions",
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#3b82f6",
    },
    chatButton: {
      backgroundColor: "#3b82f6",
    },
    // Additional styles for the floating icon
    floatingButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#3b82f6',
      color: 'white',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      zIndex: '9999',
    },
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      // Floating icon widget configuration
      widgetName: "floatingIcon",
      widgetFunc: (props) => (
        <div style={config.customStyles.floatingButton} onClick={props.onClick}>
          <span>Chat</span>
        </div>
      ),
    },
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Logging in",
            url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
            id: 1,
          },
          {
            text: "Registering",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            id: 2,
          },
          {
            text: "Frontend Masters",
            url: "https://frontendmasters.com",
            id: 3,
          },
        ],
      },
    },    

  ],
};

export default config;


import React from "react";

import "./LinkList.css";


const LinkList = ({ options, actionProvider }) => {
  const handleLinkClick = (link) => {
    if (link.action) {
      actionProvider[link.action]();
    } else {
      window.open(link.url, "_blank");
    }
  };

  const linkMarkup = options.map((link) => (
    <li key={link.id} className="link-list-item">
      <button
        onClick={() => handleLinkClick(link)}
        className="link-list-item-url"
      >
        {link.text}
      </button>
    </li>
  ));

  return <ul className="link-list">{linkMarkup}</ul>;
};

export default LinkList;
import React from "react";
import { Link } from "react-router-dom";
import "./chat.css";

const Chat = () => {
  // Sample messages array with content, time, and type (sent or received)
  const messages = [
    { content: "Hello, how are you?", time: "11:09pm", type: "received" },
    { content: "I'm good, thanks, you?", time: "11:10pm", type: "sent" },
    { content: "I'm good, thanks!", time: "11:10pm", type: "received" },
    { content: "Are you coming to work today?", time: "11:10pm", type: "sent" },
    {
      content: "No, I m taking the day off",
      time: "11:10pm",
      type: "received",
    },
    {
      content: "No, I m taking the day off",
      time: "11:10pm",
      type: "received",
    },
    {
      content:
        "No, I m taking the day off,No, I m taking the day offNo, I m taking the day offNo, I m taking the day offNo, I m taking the day off",
      time: "11:10pm",
      type: "received",
    },
    {
      content:
        "No, I m taking the day off,No, I m taking the day offNo, I m taking the day offNo, I m taking the day offNo, I m taking the day off",
      time: "11:10pm",
      type: "sent",
    },
    // Add more messages as needed
  ];

  return (
    <div className="chat-page">
      <div className="going-back">
        <img src="/assets/arrow-back.svg" alt="back" />
        <Link className="link-button" to="/finddoctor">
          back to search results
        </Link>
      </div>

      <div className="chatbox">
        <div className="chatbox-header">
          <div className="chatbox-header_left">
            <img src="/assets/avatar-fake.png" alt="" />
            <span className="chatbox-header-left">Segunmaru Faozan</span>
          </div>
          <div className="chatbox-header_right">
            <img src="/assets/phone-icon.svg" alt="phone-icon" />
            <img src="/assets/video-icon.svg" alt="video-icon" />
          </div>
        </div>
        <div className="chatbox-body">
          {messages.map((message, index) => (
            <Message
              key={index}
              content={message.content}
              time={message.time}
              type={message.type}
            />
          ))}
        </div>
        <div className="chatbox-lower">
          <img src="/assets/clip-icon.svg" alt="attach" />
          <img src="/assets/mic-icon.svg" alt="voicenote" />

          <input type="text" placeholder="Message...." />
        </div>
      </div>
    </div>
  );
};

const Message = ({ content, time, type }) => {
  const messageClass = type === "sent" ? "sent-message" : "received-message";
  return (
    <div className={messageClass}>
      <span className={`${messageClass}-text`}>{content}</span>
      <span className={`${messageClass}-time`}>{time}</span>
    </div>
  );
};

export default Chat;

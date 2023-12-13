import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./chat.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages, sendMessage } from "../../redux/chat/chatSlice";
import { formatTime } from "../../utils/helper";
import LoadingComponennt from "../../components/LoadingComponent/LoadingComponent";
import io from "socket.io-client";

const Chat = () => {
  // Sample messages array with content, time, and type (sent or received)
  const { id } = useParams();
  const chatboxBodyRef = useRef(null);
  const chat = useSelector((state) => state.chatSlice?.chat);
  const user = useSelector((state) => state.userSlice?.user);
  const loading = useSelector((state) => state.chatSlice?.loading);
  const [secondLoading, setSecondLoading] = useState(true);
  const [isCommunity, setIscommunity] = useState(false);

  const [nameToBeshown, setNameToBeShown] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [socket, setSocket] = useState(null);
  const [incomingMessage, setIncomingMessage] = useState(null);

  useEffect(() => {
    console.log(chat);
  }, [chat]);

  useEffect(() => {
    if (chat !== null) {
      const newMessages = chat.map((oneChat) => ({
        content: oneChat.content,
        time: formatTime(oneChat.createdAt),
        type: user?._id === oneChat.sender._id ? "sent" : "received",
      }));

      setMessages(newMessages);

      setSecondLoading(false);
    }
  }, [chat]);

  //CHECKS IF THE USER OR STAFF

  useEffect(() => {
    if (chat !== null) {
      setIscommunity(chat[0].chat.isCommunity);

      if (isCommunity === true) {
        setNameToBeShown(chat[0].chat?.chatName);
      } else {
        if (user._id === chat[0].chat.staffMembers[0]._id) {
          setNameToBeShown(`${chat[0].chat.users[0].nickName}`);
        } else {
          setNameToBeShown(
            `${chat[0].chat.staffMembers[0].firstName} ${chat[0].chat.staffMembers[0].lastName}`
          );
        }
      }

      if (user._id === chat[0].chat.staffMembers[0]._id) {
        setImageSrc(null);
      } else {
        setImageSrc(chat[0].chat.staffMembers[0].passportImage);
      }
    }
  }, [chat]);

  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const now = new Date();
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  useEffect(() => {
    dispatch(getAllMessages(id));
  }, []);

  useEffect(() => {
    if (chatboxBodyRef.current) {
      chatboxBodyRef.current.scrollTop = chatboxBodyRef.current.scrollHeight;
    }
  }, [messages, incomingMessage]);


  //JUST ANOTHER COMMENT
  useEffect(() => {
    if (chat !== null) {
      const chatID = chat[0].chat._id;

      const newSocket = io("https://virtual-med-backend.onrender.com");

      newSocket.emit("setup", chatID);

      newSocket.on("connected", () => {
        console.log("Connected to chat");
      });

      newSocket.on("message recieved", (newMessage) => {
        const recievedMessage = newMessage;
        recievedMessage.type = "recieved";

        const newMessageComponent = (
          <Message
            content={recievedMessage.message}
            time={recievedMessage.time}
            key={recievedMessage.time}
            type="received"
          />
        );
        setIncomingMessage(newMessageComponent);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [chat]);

  const handleSendMessage = async () => {
    if (message !== "") {
      await dispatch(sendMessage({ chatId: id, content: message }));

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: message,
          time: new Intl.DateTimeFormat("en-US", timeOptions).format(now),
          type: "sent",
        },
      ]);

      setMessage("");

      socket.emit(
        "new message",
        {
          message: message,
          time: new Intl.DateTimeFormat("en-US", timeOptions).format(now),
        },
        chat[0].chat._id
      );
    } else {
      return;
    }
  };

  const calculateRows = (text) => {
    const lines = text.split("\n").length;
    return Math.max(lines, 1); // Ensure at least one row
  };

  return (
    <>
      {loading && secondLoading ? (
        <LoadingComponennt />
      ) : (
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
                <img
                  src={imageSrc ? imageSrc : "/assets/avatar-fake.png"}
                  alt=""
                />
                <span className="chatbox-header-left">{nameToBeshown}</span>
              </div>
              <div className="chatbox-header_right">
                <img src="/assets/phone-icon.svg" alt="phone-icon" />
                <img src="/assets/video-icon.svg" alt="video-icon" />
              </div>
            </div>
            <div className="chatbox-body" ref={chatboxBodyRef}>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  content={message.content}
                  time={message.time}
                  type={message.type}
                />
              ))}
              {incomingMessage}
            </div>
            <div className="chatbox-lower">
              <div className="chatbox-lower_left">
                <img src="/assets/clip-icon.svg" alt="attach" />
                <img src="/assets/mic-icon.svg" alt="voicenote" />

                <textarea
                  type="text"
                  placeholder="Message...."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={calculateRows(message)}
                  style={{ resize: "none", overflowY: "hidden" }}
                />
              </div>

              <button className="chat-send-button" onClick={handleSendMessage}>
                send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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

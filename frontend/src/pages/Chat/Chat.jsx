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
  const { id } = useParams();
  const chatboxBodyRef = useRef(null);
  const chat = useSelector((state) => state.chatSlice?.chat) || [];
  const user = useSelector((state) => state.userSlice?.user);
  const loading = useSelector((state) => state.chatSlice?.loading);
  
  // A single array for all messages, both from server and received via socket
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  
  const dispatch = useDispatch();
  const now = new Date();
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  // Fetch messages when component mounts
  useEffect(() => {
    dispatch(getAllMessages(id));
  }, [dispatch, id]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatboxBodyRef.current) {
      chatboxBodyRef.current.scrollTop = chatboxBodyRef.current.scrollHeight;
    }
  }, [allMessages]);

  // Setup socket connection and handle initial messages
  useEffect(() => {
    if (chat && chat.length > 0) {
      const chatID = chat[0].chat._id;
      const newSocket = io("http://localhost:8000");

      newSocket.emit("setup", chatID);

      newSocket.on("connected", () => {
        console.log("Connected to chat");
      });

      newSocket.on("message recieved", (newMessage) => {
        console.log("Received message:", newMessage);
        
        // Add the incoming message to our combined messages array
        setAllMessages(prev => [...prev, {
          content: newMessage.message,
          time: newMessage.time,
          type: "received",
          timestamp: new Date().getTime() // Add timestamp for potential sorting
        }]);
      });

      setSocket(newSocket);

      // Parse messages from chat data
      if (chat.length > 0) {
        const newMessages = chat.map((oneChat) => ({
          content: oneChat.content,
          time: formatTime(oneChat.createdAt),
          type: user?._id === oneChat.sender._id ? "sent" : "received",
          timestamp: new Date(oneChat.createdAt).getTime() // Add timestamp for potential sorting
        }));
        setAllMessages(newMessages);
      }

      return () => {
        newSocket.disconnect();
      };
    }
  }, [chat, user]);

  const handleSendMessage = () => {
    if (message.trim() !== "" && chat && chat.length > 0) {
      const currentTime = new Intl.DateTimeFormat("en-US", timeOptions).format(now);
      
      // Add message to combined messages array immediately
      const newMessage = {
        content: message,
        time: currentTime,
        type: "sent",
        timestamp: now.getTime() // Add timestamp for potential sorting
      };
      
      setAllMessages(prev => [...prev, newMessage]);
      
      // Emit message through socket
      if (socket) {
        socket.emit(
          "new message",
          {
            message: message,
            time: currentTime,
          },
          chat[0].chat._id
        );
      }
      
      // Send message to backend asynchronously without awaiting
      dispatch(sendMessage({ chatId: id, content: message }));
      
      setMessage("");
    }
  };

  const calculateRows = (text) => {
    const lines = text.split("\n").length;
    return Math.max(lines, 1);
  };

  // Determine chatbox details only when we have data
  const getChatDetails = () => {
    if (!chat || chat.length === 0 || !user) return { nameToBeshown: "", imageSrc: null };
    
    const chatData = chat[0].chat;
    const isCommunity = chatData.isCommunity;
    
    let nameToBeshown = "";
    let imageSrc = null;
    
    if (isCommunity) {
      nameToBeshown = chatData?.chatName;
    } else {
      if (user._id === chatData.staffMembers[0]._id) {
        nameToBeshown = `${chatData.users[0].nickName}`;
        imageSrc = null;
      } else {
        nameToBeshown = `${chatData.staffMembers[0].firstName} ${chatData.staffMembers[0].lastName}`;
        imageSrc = chatData.staffMembers[0].passportImage;
      }
    }
    
    return { nameToBeshown, imageSrc };
  };

  // Show loading when data is being fetched
  if (loading) {
    return <LoadingComponennt />;
  }

  // Calculate chat details only when rendering
  const { nameToBeshown, imageSrc } = getChatDetails();

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
          {/* Render all messages in a single list */}
          {allMessages.map((message, index) => (
            <Message
              key={`message-${index}`}
              content={message.content}
              time={message.time}
              type={message.type}
            />
          ))}
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>

          <button className="chat-send-button" onClick={handleSendMessage}>
            send
          </button>
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
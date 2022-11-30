import "./ChatRoom.css";
import React, { useEffect, useRef, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient = null;
const ChatTest = ({ match }) => {
  const inputCursor = useRef();
  const [publicChats, setPublicChats] = useState([]);
  const [userData, setUserData] = useState({
    username: match.params.nickname,
    message: "",
  });
  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    let Sock = new SockJS(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe("/sub/public", onMessageReceived);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    publicChats.push(payloadData);
    setPublicChats([...publicChats]);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    if (stompClient && userData.message !== "") {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
      };
      console.log(chatMessage);
      stompClient.send("/pub/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
      inputCursor.current.focus();
    }
  };

  const handlerEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      sendValue();
    }
  };

  return (
    <div className="container">
      <div className="chat-box">
        <div className="member-list">
          <ul>
            <li className={`member active`}>Chatroom</li>
          </ul>
        </div>
        <div className="chat-content">
          <ul className="chat-messages">
            {publicChats.map((chat, index) => (
              <li
                className={`message ${
                  chat.senderName === userData.username && "self"
                }`}
                key={index}
              >
                {chat.senderName !== userData.username && (
                  <div className="avatar">{chat.senderName}</div>
                )}
                <div className="message-data">{chat.message}</div>

                {chat.senderName === userData.username && (
                  <div className="avatar self">{chat.senderName}</div>
                )}
              </li>
            ))}
          </ul>

          <div className="send-message">
            <input
              type="text"
              className="input-message"
              ref={inputCursor}
              placeholder="enter the message"
              value={userData.message}
              onChange={handleMessage}
              onKeyPress={handlerEnterKeyPress}
            />
            <button type="button" className="send-button" onClick={sendValue}>
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTest;

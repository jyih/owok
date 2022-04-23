import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
let socket;

const Chat = ({ messages, sendChat, chatInput, setChatInput }) => {
  // const [chatInput, setChatInput] = useState("");
  // const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);

  //When someone joins: Username has joined!
  //Every time a PLAYER (one or two) joins, send message:
  //Owok: Place 5 pieces in a row to win!

  // useEffect(() => {
  //   // open socket connection
  //   // create websocket
  //   socket = io();
  //   console.log("is this working socket chat");

  //   socket.on("chat", (chat) => {
  //     console.log("@@@", chat);
  //     // if (chat.players) {
  //     //   /**
  //     //    * logic if initial join
  //     //    */
  //     // }
  //     // if (chat.room === socketRoom) {
  //     setMessages((messages) => [...messages, chat]);
  //     // }
  //     // setMessages((messages) => [...messages, chat]);
  //   });
  //   // when component unmounts, disconnect
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // function scrollToBottom() {
  //   messages.scrollTop = messages.scrollHeight;
  // }
  // scrollToBottom();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  // const sendChat = (e) => {
  //   e.preventDefault();
  //   socket.emit("chat", {
  //     user: user.username,
  //     msg: chatInput,
  //     room: socketRoom,
  //   });
  //   setChatInput("");
  // };

  return (
    user && (
      <div className="ChatContainer">
        <div className="ChatMessages">
          {messages.map((message, ind) => (
            <div key={ind}>{`${message.user}: ${message.msg}`}</div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendChat} className="ChatInputBox">
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">
            <i className="fa-solid fa-arrow-turn-up"></i>
          </button>
        </form>
      </div>
    )
  );
};

export default Chat;

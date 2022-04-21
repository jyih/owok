import React from "react";
// import { useSelector } from "react-redux";
import Board from "./Board";
import Chat from "./Chat";

import "./GameArea.css";

// import { io } from 'socket.io-client';
// let socket;

const GameArea = () => {
  // const currentGame =
  // const sessionUser = useSelector((state) => state.session.user);
  // const sessionUserId = sessionUser.id;
  return (
    <div className="GameAreaContainer">
      <Board />
      <Chat />
    </div>
  );
};

export default GameArea;

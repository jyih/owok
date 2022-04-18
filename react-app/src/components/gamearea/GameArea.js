import React from "react";
// import { useSelector } from "react-redux";
import Board from "./Board";

import "./GameArea.css";

const GameArea = () => {
  // const sessionUser = useSelector((state) => state.session.user);
  // const sessionUserId = sessionUser.id;
  return (
    <div className="GameAreaContainer">
      <Board />
    </div>
  );
};

export default GameArea;

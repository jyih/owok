import React from "react";
import { GridData } from "./GridData";

import "./Board.css";

const Board = () => {
  // function for player one and player two placing moves taking turns
  //this function also pushes each players moves to their own moves array for win calculations
  // win calculator function

  // 3 boards, 1 main board with both moves and that the player clicks, when a player's turn clicks
  // on the main board, record the move on the corresponding player's personal board
  // every move, run checks for horizontal, vertical, and diagonal wins (bit based board so 0 and 1?)
  // for diagonal, need to shift every i-th row (have to do once left and once right?)
  // by i squares to make it all line up and be vertical.

  return (
    <div className="board_layout">
      {GridData.map((coord, index) => (
        <div key={coord} id={`${coord}`} className={`grid ${coord}`}>
          {coord}
        </div>
      ))}
    </div>
  );
};

export default Board;

import React from "react";
import { GridData } from "./GridData";

import "./Board.css";

const Board = () => {
  return (
    <div className="board_layout">
      {GridData.map((coord, index) => (
        <div key={coord} id={`${coord}`} className={`grid ${coord}`}>
          {index}
        </div>
      ))}
    </div>
  );
};

export default Board;

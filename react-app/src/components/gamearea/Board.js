import React from "react";
import { GridData } from "./GridData";

import omok_piece_mushroom from "../images/omok_piece_mushroom.png"
import omok_piece_slime from "../images/omok_piece_slime.png"

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

  let currPiece = omok_piece_mushroom;
  let oppPiece = omok_piece_slime;
  const moves = [];

  const placePiece = (e) => {
    // let r = coord.slice(0, 2)
    // let c = coord.slice(-2)
    console.log("e.target.tagName", e.target.tagName)
    console.log("e.target.id", e.target.id)
    let square = document.getElementById(e.target.id)
    console.log(square)
    if (square && !square.children.length) {
      let piece = document.createElement('img')
      piece.src = currPiece
      square.appendChild(piece)
      moves.push(`${e.target.id.slice(0,2)}${e.target.id.slice(-2)}`)
      console.log('moves',moves)
      swapPiece()
    }

  }

  const swapPiece = () => {
    console.log("Click!")
    if (currPiece === omok_piece_mushroom) {
      console.log("click 1")
      currPiece = omok_piece_slime
      oppPiece = omok_piece_mushroom
    } else {
      console.log("click 2")
      currPiece = omok_piece_mushroom
      oppPiece = omok_piece_slime
    }
  }

  return (
    <div className="board_layout">
      {GridData.map((coord, index) => (
        <div key={coord} id={`${coord}`} className={`grid ${coord}`} onClick={e => placePiece(e)}>
        </div>
      ))}
    </div>
  );
};

export default Board;

import React from "react";
import { GridData } from "./GridData";

import omok_piece_mushroom from "../images/omok_piece_mushroom.png";
import omok_piece_slime from "../images/omok_piece_slime.png";

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

  // mathmatical vectors, define array that is eight 0 and 1 and -1 combinations, calculate neighbors
  // with map of vectors added to indecies of the board grid, and then do the test. return number
  // of neighbors and do this (after doing second paragraph)

  let currPiece = 'mushroom';
  let oppPiece = 'slime';
  let gameStatus = null;
  let lastMove = null;
  const notation = [];
  const pieces = {
    mushroom: omok_piece_mushroom,
    slime: omok_piece_slime
  }
  const board = {};
  const move = {
    up: -100,
    down: 100,
    left: -1,
    right: 1,
  }
  // const board = Array(15*15).fill('');

  const placePiece = (e) => {
    // let r = coord.slice(0, 2)
    // let c = coord.slice(-2)
    console.log("e.target.tagName", e.target.tagName);
    console.log("e.target.id", e.target.id);
    let square = document.getElementById(e.target.id);
    console.log(square);
    if (square && !square.children.length) {
      let piece = document.createElement('img')
      // change style background image to the img (might be better for performance)
      // bc not adding nodes to dom, just updating the node's style
      piece.src = pieces[currPiece]
      square.appendChild(piece)

      let noHyphen = `${e.target.id.slice(0, 2)}${e.target.id.slice(-2)}`;
      lastMove = parseInt(noHyphen);

      notation.push(noHyphen)
      board[lastMove] = currPiece;

      console.log('moves:', notation)
      console.log('board:', board)
      swapPiece()
      checkGame();
      console.log('gameStatus:', gameStatus)
    }
  }

  const swapPiece = () => {
    console.log("Click!");
    let temp = currPiece;
    currPiece = oppPiece;
    oppPiece = temp;
    // if (currPiece === 'mushroom') {
    //   console.log("click 1");
    //   currPiece = omok_piece_slime;
    //   oppPiece = omok_piece_mushroom;
    // } else {
    //   console.log("click 2");
    //   currPiece = omok_piece_mushroom;
    //   oppPiece = omok_piece_slime;
    // }
  };

  const checkGame = () => {
    let lastPiece = board[lastMove];
    console.log('lastmove:', lastMove)
    console.log('piece logic check:', lastPiece === oppPiece)

    //check vertical
    let countNS = 1;
    //check up
    let countN = 0;
    let lookMove = lastMove + move.up;
    let lookPiece = board[lookMove];
    while (lookPiece === lastPiece && countN < 4 && countNS < 5) {
      countN++;
      lookMove += move.up;
      lookPiece = board[lookMove];
    }

    countNS += countN;

    //check down
    let countS = 0;
    lookMove = lastMove + move.down;
    lookPiece = board[lookMove];
    while (lookPiece === lastPiece && countS < 4 && countNS < 5) {
      countS++;
      lookMove += move.down;
      lookPiece = board[lookMove];
    }

    countNS += countS;

    //check horizontal
    let countWE = 1;
    //check left
    let countW = 0;
    lookMove = lastMove + move.left;
    lookPiece = board[lookMove];
    while (lookPiece === lastPiece && countW < 4 && countWE < 5) {
      countW++;
      lookMove += move.left;
      lookPiece = board[lookMove];
    }
    countWE += countW

    //check right
    let countE = 0;
    lookMove = lastMove + move.right;
    lookPiece = board[lookMove];
    while (lookPiece === lastPiece && countE < 4 && countWE < 5) {
      countE++;
      lookMove += move.right;
      lookPiece = board[lookMove];
    }
    countWE += countE;

    //check NESW diag
    let countNESW = 1;
    //check top right
    let countNE = 0;
    lookMove = lastMove + move.right + move.up;
    lookPiece = board[lookMove];
    while (lookPiece === lastPiece && countNE < 4 && countNESW < 5) {
      countNE++;
      lookMove = lookMove + move.right + move.up;
      lookPiece = board[lookMove];
    }
    countNESW += countNE

    //check bot left
    let countSW = 0;
    lookMove = lastMove + move.left + move.down;
    lookPiece = board[lookMove];
    while (lookPiece === lastPiece && countSW < 4 && countNESW < 5) {
      countSW++;
      lookMove = lookMove + move.left + move.down;
      lookPiece = board[lookMove];
    }
    countNESW += countSW;

    //check NESW diag
    let countNWSE = 1;
    //check top right
    let countNW = 0;
    lookMove = lastMove + move.left + move.up;
    lookPiece = board[lookMove];
    while (lookPiece === lastPiece && countNW < 4 && countNWSE < 5) {
      countNW++;
      lookMove = lookMove + move.left + move.up;
      lookPiece = board[lookMove];
    }
    countNWSE += countNW

    //check bot left
    let countSE = 0;
    lookMove = lastMove + move.right + move.down;
    lookPiece = board[lookMove];
    while (lookPiece === lastPiece && countSE < 4 && countNWSE < 5) {
      countSE++;
      lookMove = lookMove + move.right + move.down;
      lookPiece = board[lookMove];
    }
    countNWSE += countSE;


    if (
      countNS >= 5 ||
      countWE >= 5 ||
      countNESW >= 5 ||
      countNWSE >= 5
    ) gameStatus = lastPiece;
  }

  return (
    <div className="board_container">
      <div className="board_layout">
        {GridData.map((coord, index) => (
          <div
            key={coord}
            id={`${coord}`}
            className={`grid ${coord}`}
            onClick={(e) => placePiece(e)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Board;

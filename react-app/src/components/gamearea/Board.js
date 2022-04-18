import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as replayActions from "../../store/replays";
import { GridData } from "./GridData";

import omok_piece_mushroom from "../images/omok_piece_mushroom.png";
import omok_piece_slime from "../images/omok_piece_slime.png";

import "./Board.css";

const Board = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // function for player one and player two placing moves taking turns
  // this function also pushes each players moves to their own moves array for win calculations
  // win calculator function

  // 3 boards, 1 main board with both moves and that the player clicks, when a player's turn clicks
  // on the main board, record the move on the corresponding player's personal board
  // every move, run checks for horizontal, vertical, and diagonal wins (bit based board so 0 and 1?)
  // for diagonal, need to shift every i-th row (have to do once left and once right?)
  // by i squares to make it all line up and be vertical.

  // mathmatical vectors, define array that is eight 0 and 1 and -1 combinations, calculate neighbors
  // with map of vectors added to indecies of the board grid, and then do the test. return number
  // of neighbors and do this (after doing second paragraph)

  let currPiece = "mushroom";
  let oppPiece = "slime";
  let gameOver = false;
  let lastMove = null;
  const notation = [];
  const pieces = {
    mushroom: omok_piece_mushroom,
    slime: omok_piece_slime,
  };
  const board = {};
  const move = {
    up: -100,
    down: 100,
    left: -1,
    right: 1,
  };
  // const board = Array(15*15).fill('');

  const placePiece = (coord) => {
    if (!gameOver) {
      console.log("Place!");
      // let r = coord.slice(0, 2)
      // let c = coord.slice(-2)
      let square = document.getElementById(coord);
      if (square && !square.children.length) {
        let piece = document.createElement("img");
        // change style background image to the img (might be better for performance)
        // bc not adding nodes to dom, just updating the node's style
        piece.src = pieces[currPiece];
        square.appendChild(piece);

        lastMove = parseInt(coord);

        notation.push(coord);
        board[lastMove] = currPiece;

        console.log("moves:", notation);
        console.log("board:", board);
        swapPiece();
        checkGame();
        console.log("gameStatus:", gameOver);
      }
    } else {
      console.log("Game has finished!");
    }
  };

  const swapPiece = () => {
    console.log("Swap!");
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
    //check if piece is same piece
    let lastPiece = board[lastMove];
    console.log("lastmove:", lastMove);
    console.log("piece logic check:", lastPiece === oppPiece);

    /**
     * 1. refactor/DRY checks
     * 2. implement short circuit boolean to skip lower checks
     *    if 5 in row has been found
     */

    //check vertical
    let countNS = 1;
    //check up
    let countN = 0;
    //lookMove: looking ahead to see what the piece placed is
    let lookMove = lastMove + move.up;
    let lookPiece = board[lookMove];
    //as soon as hit 4, the piece placed will be 5th one
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
    countWE += countW;

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
    countNESW += countNE;

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
    countNWSE += countNW;

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

    //check if there's 5 anywhere
    if (countNS >= 5 || countWE >= 5 || countNESW >= 5 || countNWSE >= 5) {
      endGame(lastPiece);
    }
  };

  const endGame = (winningPiece) => {
    //need to get player_two data
    //increment winner win count
    //increment loser loss count
    //if draw, increment both players' draw count
    gameOver = true;

    const gameData = {
      player_one_id: user.id,
      player_two_id: user.id,
      winner_id: user.id,
      moves: notation,
    };

    const data = dispatch(replayActions.saveGame(gameData));

    if (data?.errors) {
      console.log(data.errors);
    }
  };

  return (
    <div className="board_container">
      <div className="board_layout">
        {GridData.map((coord, index) => (
          <div
            key={coord}
            id={`${coord}`}
            className={`grid ${coord}`}
            onClick={(e) => placePiece(e.target.id)}
          ></div>
        ))}
      </div>
      <img src={user.sprite_url} className="board_player_one" alt="player one sprite" />
      {/* <img src={user.sprite_url} className="board_player_two" alt="player two sprite" /> */}
      <div className="board_stats">
        <p>{user.wins}</p>
        <p>{user.losses}</p>
        <p>{user.draws}</p>
      </div>
    </div>
  );
};

export default Board;

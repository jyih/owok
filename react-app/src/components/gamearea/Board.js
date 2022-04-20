import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as replayActions from "../../store/replays";
import { GridData } from "./GridData";

import omok_piece_mushroom from "../images/omok_piece_mushroom.png";
import omok_piece_slime from "../images/omok_piece_slime.png";

import "./Board.css";

import { io } from 'socket.io-client';

let socket;

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
  let isTurn = true;
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
    if (!gameOver && isTurn) {
      console.log("Place!");
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
  };

  const checkGame = (n = 5) => {
    let vertical = checkLine(move.up, n)
    let horizontal = checkLine(move.right, n)
    let forwardDiag = checkLine(move.up + move.right, n)
    let backwardDiag = checkLine(move.up + move.left, n)
    console.log(vertical, horizontal, forwardDiag, backwardDiag)

    if (vertical >= n || horizontal >= n || forwardDiag >= n || backwardDiag >= n) endGame();
  }

  const checkLine = (displace, n = 5) => {
    let countPos = checkVector(displace, n);
    let countNeg = checkVector(-displace, n);
    return countPos + countNeg - 1;
  }

  const checkVector = (displace, n = 5) => {
    let lookPiece = board[lastMove];
    let count = 0;

    while (lookPiece === board[lastMove] && count < n) {
      count++;
      let lookMove = lastMove + (displace * count);
      lookPiece = board[lookMove];
      console.log(`pos:${count}, ${lookMove}: ${lookPiece}`)
    }

    return count;
  }

  const endGame = () => {
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
      <img
        src={user.sprite_url}
        className="board_player_one"
        alt="player one sprite"
      />
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

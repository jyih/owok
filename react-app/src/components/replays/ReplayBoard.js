import React from "react";
import { GridData } from "../gamearea/GridData";
import omok_piece_mushroom from "../images/omok_piece_mushroom.png";
import omok_piece_slime from "../images/omok_piece_slime.png";

const ReplayBoard = ({ game }) => {
  let currPiece = omok_piece_mushroom;
  let oppPiece = omok_piece_slime;

  const movesArr = game?.moves?.slice(1, -1).split(",");

  const swapPiece = () => {
    let temp = currPiece;
    currPiece = oppPiece;
    oppPiece = temp;
    // if (currPiece === omok_piece_mushroom) {
    //   currPiece = omok_piece_slime;
    //   oppPiece = omok_piece_mushroom;
    // } else {
    //   currPiece = omok_piece_mushroom;
    //   oppPiece = omok_piece_slime;
    // }
  };

  let moveNumber = 0;
  const replayClick = (e) => {
    e.preventDefault();
    let coord = movesArr[moveNumber];
    // console.log("ReplayClick Coord", coord);
    let square = document.getElementById(coord);
    // console.log("ReplayClick Square", square);
    if (square && !square.children.length) {
      let piece = document.createElement("img");

      piece.src = currPiece;
      square.appendChild(piece);

      swapPiece();
    }
    if (moveNumber < movesArr.length) moveNumber++;
  };

  // onclick if move = square id, place piece
  return (
    <div className="replay_board_wrapper">
      <h1>
        Replay of {game?.user_player_one?.username} vs.{" "}
        {game?.user_player_two?.username}
      </h1>
      <div className="replay_board_container">
        <div className="replay_board_layout">
          {GridData.map((coord, index) => (
            <div
              key={coord}
              id={`${coord}`}
              className={`replay_grid ${coord}`}
            ></div>
          ))}
        </div>
        <div className="replay_player_one">
          <img
            src={game?.user_player_one?.sprite_url}
            // className="replay_player_one"
            alt="player one sprite"
          />
        </div>
        <div className="replay_player_two">
          <img
            src={game?.user_player_two?.sprite_url}
            // className="replay_player_two"
            alt="player two sprite"
          />
        </div>
        <div className="replay_board_stats_one">
          <p>{game?.user_player_one?.wins}</p>
          <p>{game?.user_player_one?.losses}</p>
          <p>{game?.user_player_one?.draws}</p>
        </div>
        <div className="replay_board_stats_two">
          <p>{game?.user_player_two?.wins}</p>
          <p>{game?.user_player_two?.losses}</p>
          <p>{game?.user_player_two?.draws}</p>
        </div>
      </div>
      <div className="replay_button_container">
        <button onClick={(e) => replayClick(e)} className="replay_next_button">
          Next Move
        </button>
      </div>
    </div>
  );
};

export default ReplayBoard;

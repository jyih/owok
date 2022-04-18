import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GridData } from "../gamearea/GridData";
import omok_piece_mushroom from "../images/omok_piece_mushroom.png";
import omok_piece_slime from "../images/omok_piece_slime.png";
import * as replayActions from "../../store/replays";

const ReplayBoard = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const game = useSelector((state) => state.current_game);

  let privateButton = <></>;

  //game.is_private_one

  //game.is_private_two
  //if sessionUser.id === game.player_one_id
  //if sessionUser.id === game.player_two_id

  //button one

  //button two
  const handlePrivateClick = async (e) => {
    e.preventDefault();

    let privateData = {
      id: game.id,
    };

    if (sessionUser.id === game.player_one_id) {
      privateData.change = "is_private_one";
    }

    if (sessionUser.id === game.player_two_id) {
      privateData.change = "is_private_two";
    }
    dispatch(replayActions.editGame(privateData));
    console.log("PrivateData", privateData);
  };

  //display button
  if (
    sessionUser.id === game.player_one_id ||
    sessionUser.id === game.player_two_id
  ) {
    if (game.is_private_one === false || game.is_private_two === false) {
      privateButton = (
        // <button onClick={(e) => handlePrivateClick(e)}>Private</button>
        <i
          className="fa-solid fa-unlock"
          onClick={(e) => handlePrivateClick(e)}
          id="privateButton"
          title="click to private"
        ></i>
      );
    }
    if (game.is_private_one === true || game.is_private_two === true) {
      privateButton = (
        // <button onClick={(e) => handlePrivateClick(e)}>un-Private</button>
        <i
          className="fa-solid fa-lock"
          onClick={(e) => handlePrivateClick(e)}
          id="privateButton"
          title="click to unprivate"
        ></i>
      );
    }
  }

  //replay
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
        {privateButton}
      </div>
    </div>
  );
};

export default ReplayBoard;

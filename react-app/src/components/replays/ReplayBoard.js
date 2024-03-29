import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GridData } from "../gamearea/GridData";
import omok_piece_mushroom from "../images/omok_piece_mushroom.png";
import omok_piece_slime from "../images/omok_piece_slime.png";
import * as replayActions from "../../store/replays";
import { NavLink } from "react-router-dom";

const ReplayBoard = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const game = useSelector((state) => state.current_replay);

  //privacy
  let privateButton = <></>;
  //game.is_private_one
  //game.is_private_two
  //if sessionUser.id === game.player_one_id
  //if sessionUser.id === game.player_two_id
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
    dispatch(replayActions.editReplay(privateData));
    window.alert(`Privacy was changed! 😊`);
  };

  //display button
  if (sessionUser.id === game.player_one_id) {
    if (game.is_private_one === false) {
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
    if (game.is_private_one === true) {
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

  if (sessionUser.id === game.player_two_id) {
    if (game.is_private_two === false) {
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
    if (game.is_private_two === true) {
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

  const movesArr = game?.moves?.split(",");

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
    let square = document.getElementById(coord);
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
        Replay of{" "}
        {sessionUser.id === game.player_one_id ||
        sessionUser.id === game.player_two_id ||
        !game?.is_private_one
          ? game?.user_player_one?.username
          : "???"}{" "}
        vs.{" "}
        {sessionUser.id === game.player_one_id ||
        sessionUser.id === game.player_two_id ||
        !game?.is_private_two
          ? game?.user_player_two?.username
          : "???"}
      </h1>
      <div className="replay_board_container">
        <div className="replay_board_layout">
          {GridData.map((obj, index) => (
            <div
              key={obj.coord}
              id={`${obj.coord}`}
              className={`replay_grid ${obj.coord}`}
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

        <div className="replay_player_one_username">
          <p>
            {sessionUser.id === game.player_one_id ||
            sessionUser.id === game.player_two_id ||
            !game?.is_private_one ? (
              <NavLink to={`/profile/${game.player_one_id}`}>
                {game?.user_player_one?.username}
              </NavLink>
            ) : (
              "???"
            )}
          </p>
        </div>

        <div className="replay_player_two_username">
          <p>
            {sessionUser.id === game.player_one_id ||
            sessionUser.id === game.player_two_id ||
            !game?.is_private_two ? (
              <NavLink to={`/profile/${game.player_two_id}`}>
                {game?.user_player_two?.username}
              </NavLink>
            ) : (
              "???"
            )}
          </p>
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

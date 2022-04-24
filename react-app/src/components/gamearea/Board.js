import { React, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as replayActions from "../../store/replays";
import * as gameActions from "../../store/game";
import { GridData } from "./GridData";
import Chat from "./Chat";

import omok_piece_mushroom from "../images/omok_piece_mushroom.png";
import omok_piece_slime from "../images/omok_piece_slime.png";

import "./Board.css";

import { io } from "socket.io-client";
let socket;

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

const Board = () => {
  const dispatch = useDispatch();
  const { gameId, playerOneId, playerTwoId } = useParams();

  const user = useSelector((state) => state.session.user);
  const game = useSelector((state) => state.current_games[gameId])
  // const board = useSelector((state) => Object.values(state.current_games[gameId].board))
  // const board = Object.values(game?.board)
  const [board, setBoard] = useState([])

  const [socketRoom, setSocketRoom] = useState(`${playerOneId}${playerTwoId}`);
  const [players, setPlayers] = useState({});
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const [lastMove, setLastMove] = useState(null);

  const pieces = {
    0: omok_piece_mushroom,
    1: omok_piece_slime,
  };

  useEffect(() => {
    setSocketRoom(`${playerOneId}${playerTwoId}`);
  }, [playerOneId, playerTwoId]);

  useEffect(() => {
    dispatch(gameActions.fetchGame(gameId))
  }, []);

  useDidMountEffect(() => {
    setBoard(Object.values(game.board))
  }, [game])

  useEffect(() => {
    socket = io();

    socket.on("open_room", (data) => {
      console.log("useEffect, join_room", data);
      console.log(data.players);
      setPlayers(data.players);
    });

    socket.on("leave_room", (data) => {
      console.log("useEffect, leave_room", data);
      console.log(data.players);
      // console.log(
      //   "initial check",
      //   !gameOver && !notation.length && !Object.keys(board).length
      // );

      setPlayers(data.players);
    });

    socket.on("place_piece", (move) => {
      console.log("socket place piece, move:", move);
      setLastMove(parseInt(move.coord));
      console.log("socket place piece, players:", players);
    });

    socket.on("chat", (chat) => {
      console.log("@@@", chat);
      setMessages((messages) => [...messages, chat]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      user: user.username,
      msg: chatInput,
      room: socketRoom,
    });
    setChatInput("");
  };

  useEffect(() => {
    joinRoom(socketRoom);
  }, [socketRoom]);

  useEffect(() => { }, [players]);

  //make sure lastMove updates/persists before setBoard
  // useDidMountEffect(() => {
  //   console.log("didMount (dep lastMove):", lastMove);
  //   placePiece(lastMove);
  // }, [lastMove]);

  // //make sure board updates/persists before checkGame
  // useDidMountEffect(() => {
  //   console.log("notation:", notation);
  //   console.log("board:", board);
  //   checkGame();
  //   console.log("gameStatus:", gameOver);
  // }, [board]);

  const joinRoom = (newRoom) => {
    socket.emit("join_room", { user: user, room: newRoom });
  };

  // const leaveRoom = (room = socketRoom) => {
  //   socket.emit('leave_room', {user: user, room: room})
  // }

  const sendMove = (e) => {
    e.preventDefault()
    console.log('inside sendMove', game.turn, user.id, playerOneId, playerTwoId)
    console.log(game.turn ? user.id === parseInt(playerTwoId) : user.id === parseInt(playerOneId))
    if (game.turn ? user.id === parseInt(playerTwoId) : user.id === parseInt(playerOneId)) {
      console.log("Try movee")
      const game_move = {
        id: gameId,
        move: e.target.id,
        player_id: user.id
      }
      dispatch(gameActions.updateGame(game_move))
    }
  }


  return (
    <div className="board_container">
      <div className="board_layout">
        {board?.map((obj) => (
          <div
            key={obj.coord}
            id={`${obj.coord}`}
            className={`grid ${obj.coord}`}
            onClick={(e) => sendMove(e)}
          >
            <img id={`img-${obj.coord}`} src={pieces[obj?.piece]} />
          </div>
        ))}
      </div>
      <img
        src={players[playerOneId]?.sprite_url}
        className="board_player_one"
        alt={players[playerOneId]}
      />
      {/* <img src={user.sprite_url} className="board_player_two" alt="player two sprite" /> */}
      <p className="board_player_one_username">
        {players[playerOneId]?.username}
      </p>
      <div className="board_stats_one">
        <p>{players[playerOneId]?.wins}</p>
        <p>{players[playerOneId]?.losses}</p>
        <p>{players[playerOneId]?.draws}</p>
      </div>
      <img
        src={players[playerTwoId]?.sprite_url}
        className="board_player_two"
        alt={players[playerTwoId]}
      />
      <p className="board_player_two_username">
        {players[playerTwoId]?.username}
      </p>
      <div className="board_stats_two">
        <p>{players[playerTwoId]?.wins}</p>
        <p>{players[playerTwoId]?.losses}</p>
        <p>{players[playerTwoId]?.draws}</p>
      </div>
      <Chat
        socketRoom={socketRoom}
        messages={messages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        sendChat={sendChat}
      />
    </div>
  );
};

export default Board;

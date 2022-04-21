import { React, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import * as replayActions from "../../store/replays";
import { GridData } from "./GridData";

import omok_piece_mushroom from "../images/omok_piece_mushroom.png";
import omok_piece_slime from "../images/omok_piece_slime.png";

import "./Board.css";

import { io } from 'socket.io-client';
let socket;

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false)
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps)
}

const Board = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { userId } = useParams()
  const [socketRoom, setSocketRoom] = useState(parseInt(userId));
  const [currPiece, setCurrPiece] = useState("mushroom");
  const [oppPiece, setOppPiece] = useState("slime");
  const [gameOver, setGameOver] = useState(false)
  const [notation, setNotation] = useState([])
  const [board, setBoard] = useState({})
  const [lastMove, setLastMove] = useState(null)
  const [isTurn, setIsTurn] = useState(parseInt(userId) === parseInt(user.id))

  const [players, setPlayers] = useState({})

  const pieces = {
    mushroom: omok_piece_mushroom,
    slime: omok_piece_slime,
  };

  const displace = {
    up: -100,
    down: 100,
    left: -1,
    right: 1,
  };

  useEffect(() => {
    socket = io();

    socket.on("place_piece", (move) => {
      console.log("socket place piece, move:", move)
      setLastMove(parseInt(move.coord))
      console.log("socket place piece, players:", players)
    })

    return (() => {
      socket.disconnect()
    })
  }, [])

  useEffect(() => {
    // leaveRoom(prevRoom);
    joinRoom(socketRoom);

  }, [socketRoom]);

  useEffect(() => {
    socket.on('open_room', (data) => {
      console.log('useEffect, join_room, data.user.id', data)
      if (data.user?.id === parseInt(userId)) {
        let addPlayer = { 0: data.user }
        setPlayers({
          ...players,
          ...addPlayer
        })
      } else if (data.user?.id && !players[1]) {
        let addPlayer = { 1: data.user }
        setPlayers({
          ...players,
          ...addPlayer
        })
      }
      console.log("PLAYERS PLEASE WORK:", players)
    })

  }, [user])

  const joinRoom = (newRoom) => {
    socket.emit('join_room', { user: user, room: newRoom });
  };

  const sendMove = (e) => {
    if (isTurn && e.target.nodeName === 'DIV') {
      console.log('sendMove', e)
      socket.emit("place_piece", { user: user.id, coord: e.target.id, room: parseInt(userId) })
    }
  }

  // const leaveRoom = (oldRoom) => {
  //   socket.emit("leave_room", { room: oldRoom });
  // };


  //make sure lastMove updates/persists before setBoard
  useDidMountEffect(() => {
    placePiece(lastMove)
    setNotation([...notation, lastMove])
    let addMove = {};
    addMove[lastMove] = currPiece;
    setBoard({ ...board, ...addMove });
    swapPiece()
  }, [lastMove])

  //make sure board updates/persists before checkGame
  useDidMountEffect(() => {
    console.log("notation:", notation);
    console.log("board:", board);
    checkGame()
    console.log("gameStatus:", gameOver);
  }, [board])

  // let currPiece = "mushroom";
  // let oppPiece = "slime";
  // let gameOver = false;
  // const notation = [];
  // const board = {};
  // let lastMove = null;
  // let isTurn = true;

  // const board = Array(15*15).fill('');

  const placePiece = (coordNum) => {
    if (!gameOver) {
      console.log("Place!");
      // let square = document.getElementById(coord);
      let img = document.getElementById(`img-${('0' + coordNum).slice(-4)}`)
      console.log(coordNum, img)
      if (img != null && !img.getAttribute('src')) {
        // let piece = document.createElement("img");
        // change style background image to the img (might be better for performance)
        // bc not adding nodes to dom, just updating the node's style
        console.log('currPiece', currPiece)
        img.setAttribute('src', pieces[currPiece])

        // square.appendChild(piece);

        // lastMove = parseInt(coord);
        // notation.push(coord);
        // board[lastMove] = currPiece;

        // setLastMove(parseInt(coord))
        // setNotation([...notation, coord])
        // let addMove = {};
        // addMove[lastMove] = currPiece;
        // setBoard({ ...board, ...addMove });
        // console.log("addMove+Board", addMove, board)

        // console.log("notation:", notation);
        // console.log("board:", board);
        // swapPiece();
        // checkGame();
        // console.log("gameStatus:", gameOver);
      }
    } else {
      console.log("Game has finished!");
    }
  };

  const swapPiece = () => {
    console.log("Swap!");
    let temp = currPiece;
    setCurrPiece(oppPiece);
    setOppPiece(temp);
    setIsTurn(!isTurn);
  };

  const checkGame = (n = 5) => {
    let vertical = checkLine(displace.up, n)
    let horizontal = checkLine(displace.right, n)
    let forwardDiag = checkLine(displace.up + displace.right, n)
    let backwardDiag = checkLine(displace.up + displace.left, n)
    console.log('checkGame:', vertical, horizontal, forwardDiag, backwardDiag)

    if (vertical >= n || horizontal >= n || forwardDiag >= n || backwardDiag >= n) endGame();
  }

  const checkLine = (displacement, n = 5) => {
    let countPos = checkVector(displacement, n);
    let countNeg = checkVector(-displacement, n);
    return countPos + countNeg - 1;
  }

  const checkVector = (displacement, n = 5) => {
    let lookPiece = board[lastMove];
    let count = 0;
    console.log('inside checkVector', lastMove, lookPiece, board,)
    while (board[lastMove] && lookPiece === board[lastMove] && count < n) {
      count++;
      let lookMove = lastMove + (displacement * count);
      lookPiece = board[lookMove];
      console.log(`count:${count}, ${lookMove}: ${lookPiece}, ${lastMove}: ${board[lastMove]}, ${board}`)
    }

    return count;
  }

  const endGame = () => {
    //need to get player_two data
    //increment winner win count
    //increment loser loss count
    //if draw, increment both players' draw count
    setGameOver(true);
    // gameOver = true;

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
        {GridData.map((obj, index) => (
          <div
            key={obj.coord}
            id={`${obj.coord}`}
            className={`grid ${obj.coord}`}
            onClick={(e) => sendMove(e)}
          >
            <img id={`img-${obj.coord}`} src={obj?.src} />
          </div>
        ))}
      </div>
      <img
        src={players[0]?.sprite_url}
        className="board_player_one"
        alt="player one sprite"
      />
      {/* <img src={user.sprite_url} className="board_player_two" alt="player two sprite" /> */}
      <div className="board_stats">
        <p>{players[0]?.wins}</p>
        <p>{players[0]?.losses}</p>
        <p>{players[0]?.draws}</p>
      </div>
    </div>
  );
};

export default Board;

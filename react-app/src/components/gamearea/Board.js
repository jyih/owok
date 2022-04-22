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
  // const { roomId } = useParams()
  const params = useParams();
  const roomId = parseInt(params.roomId)
  const [socketRoom, setSocketRoom] = useState(parseInt(roomId));
  // const [currPiece, setCurrPiece] = useState("mushroom");
  // const [oppPiece, setOppPiece] = useState("slime");
  // const [currTurn, setCurrTurn] = useState(0)
  const [turn, setTurn] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [notation, setNotation] = useState([])
  const [board, setBoard] = useState({})
  const [lastMove, setLastMove] = useState(null)
  // const [isTurn, setIsTurn] = useState(parseInt(roomId) === parseInt(user.id))

  const [players, setPlayers] = useState({ 0: null, 1: null })

  const pieces = {
    0: omok_piece_mushroom,
    1: omok_piece_slime,
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
  })

  useEffect(() => {
    // leaveRoom(prevRoom);
    joinRoom(socketRoom);

  }, [socketRoom]);

  useEffect(() => {
    socket.on('open_room', (data) => {
      console.log('useEffect, join_room, data.user.id', data)
      // if (data.user?.id === parseInt(roomId)) {
      console.log('conditional check:', players[0], players[1])
      if (data.user?.id && !players[0]) {
        console.log('open_room: user.id matches roomId')
        let addPlayer = { 0: { ...data.user } }
        let temp = {
          ...players,
          ...addPlayer
        }
        console.log("temp players obj", temp)
        setPlayers(temp
        )
      } else if (data.user?.id && !players[1]) {
        console.log('open_room: user.id !matches roomId')
        let addPlayer = { 1: { ...data.user } }
        setPlayers({
          ...players,
          ...addPlayer
        })
      }
      console.log("PLAYERS PLEASE WORK:", players)
    })

  })

  //make sure lastMove updates/persists before setBoard
  useDidMountEffect(() => {
    console.log('didMount (dep lastMove)')
    placePiece(lastMove)
    setNotation([...notation, lastMove])
    let addMove = {};
    addMove[lastMove] = turn;
    setBoard({ ...board, ...addMove });
  }, [lastMove])
  
  //make sure board updates/persists before checkGame
  useDidMountEffect(() => {
    console.log("notation:", notation);
    console.log("board:", board);
    checkGame()
    swapPiece()
    console.log("gameStatus:", gameOver);
  }, [board])

  const joinRoom = (newRoom) => {
    socket.emit('join_room', { user: user, room: newRoom });
  };

  const sendMove = (e) => {
    console.log('sendMove outside if', players, turn, players[turn], user.id, e.target.nodeName)
    console.log('sendMove if cond', players[turn]?.id === user.id && e.target.nodeName === 'DIV')
    if (players[turn]?.id === user.id && e.target.nodeName === 'DIV') {
      console.log('sendMove', e)
      socket.emit("place_piece", { user: user.id, coord: e.target.id, room: roomId })
    }
  }

  // const leaveRoom = (oldRoom) => {
  //   socket.emit("leave_room", { room: oldRoom });
  // };


  const placePiece = (coordNum) => {
    console.log("Can Place?")
    if (!gameOver) {
      console.log("Place!");
      let img = document.getElementById(`img-${('0' + coordNum).slice(-4)}`)
      console.log(coordNum, img)
      if (img != null && !img.getAttribute('src')) {
        console.log('current turn:', turn)
        img.setAttribute('src', pieces[turn])

      }
    } else {
      console.log("Game has finished!");
    }
  };

  const swapPiece = () => {
    console.log("Swap!");
    // let temp = currPiece;
    // setCurrPiece(oppPiece);
    // setOppPiece(temp);
    // setIsTurn(!isTurn);
    setTurn((turn + 1) % 2)
  };

  const checkGame = (n = 5) => {
    let vertical = checkLine(displace.up, n)
    let horizontal = checkLine(displace.right, n)
    let forwardDiag = checkLine(displace.up + displace.right, n)
    let backwardDiag = checkLine(displace.up + displace.left, n)
    console.log('checkGame:', vertical, horizontal, forwardDiag, backwardDiag)

    if (vertical >= n || horizontal >= n || forwardDiag >= n || backwardDiag >= n) endGame(turn);
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

  const endGame = (winner) => {
    //need to get player_two data
    //increment winner win count
    //increment loser loss count
    //if draw, increment both players' draw count
    setGameOver(true);

    const gameData = {
      player_one_id: players[0]?.id,
      player_two_id: players[1]?.id,
      winner_id: players[winner],
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
        alt={players[0]}
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

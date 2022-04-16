import React from "react";
import { GridData } from "../gamearea/GridData";
import omok_piece_mushroom from "../images/omok_piece_mushroom.png";
import omok_piece_slime from "../images/omok_piece_slime.png";

const ReplayBoard = ({ game }) => {
  let currPiece = omok_piece_mushroom;
  let oppPiece = omok_piece_slime;

  const movesArr = game?.moves?.slice(1, -1).split(",");
  console.log('movesArr', movesArr)

  const swapPiece = () => {
    // console.log("Click!");
    if (currPiece === omok_piece_mushroom) {
      //   console.log("click 1");
      currPiece = omok_piece_slime;
      oppPiece = omok_piece_mushroom;
    } else {
      //   console.log("click 2");
      currPiece = omok_piece_mushroom;
      oppPiece = omok_piece_slime;
    }
  };

  let moveNumber = 0;
  const replayClick = (e) => {
    e.preventDefault();
    let coord = movesArr[moveNumber];
    console.log("ReplayClick Coord", coord);
    let square = document.getElementById(coord);
    console.log("ReplayClick Square", square);
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
    <div>
      <div className="board_container">
        <div className="board_layout">
          {GridData.map((coord, index) => (
            <div key={coord} id={`${coord}`} className={`grid ${coord}`}></div>
          ))}
        </div>
      </div>
      <button onClick={(e) => replayClick(e)} className="TestButton">
        Next Move
      </button>
    </div>
  );
};

export default ReplayBoard;

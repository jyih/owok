import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGame } from "../../store/replays";
import ReplayBoard from "./ReplayBoard";

const SingleReplay = () => {
  const dispatch = useDispatch();
  const { gameId } = useParams();

  const game = useSelector((state) => state.current_game);

  useEffect(() => {
    dispatch(fetchGame(gameId));
  }, [dispatch, gameId]);

  return (
    <div className="SingleReplayContainer">
      <ReplayBoard />
      <h1>{gameId}</h1>
    </div>
  );
};

export default SingleReplay;

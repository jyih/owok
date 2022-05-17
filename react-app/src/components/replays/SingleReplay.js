import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReplay } from "../../store/replays";
import ReplayBoard from "./ReplayBoard";
import Comments from "../comments/Comments";
import InfoModal from "../info/InfoModal";

import "./SingleReplay.css";

const SingleReplay = () => {
  const dispatch = useDispatch();
  const { gameId } = useParams();

  useEffect(() => {
    dispatch(fetchReplay(gameId));
  }, [dispatch, gameId]);

  return (
    <div className="SingleReplayWrapper">
      <div className="SingleReplayBody">
        <div className="ReplayBoardArea">
          <ReplayBoard />
        </div>
        <Comments />
      </div>
      <InfoModal />
    </div>
  );
};

export default SingleReplay;

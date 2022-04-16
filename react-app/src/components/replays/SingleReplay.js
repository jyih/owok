import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGame } from "../../store/replays";
import ReplayBoard from "./ReplayBoard";

const SingleReplay = () => {
  const dispatch = useDispatch();
  const { gameId } = useParams();

  const game = useSelector((state) => state.current_game);
  const commentsObj = game?.comments;
  const comments = commentsObj && Object.values(commentsObj);

  useEffect(() => {
    dispatch(fetchGame(gameId));
  }, [dispatch, gameId]);

  return (
    <div className="SingleReplayContainer">
      <div className="ReplayBoardArea">
        <ReplayBoard game={game} />
      </div>
      <div className="CommentsAreaContainer">
        {comments?.map((comment) => (
          <div key={comment.id}>
            {comment.username}
            {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleReplay;

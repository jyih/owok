import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGame } from "../../store/replays";
import ReplayBoard from "./ReplayBoard";

import "./SingleReplay.css";

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
    <div className="SingleReplayWrapper">
      <div className="SingleReplayBody">
        <div className="ReplayBoardArea">
          <ReplayBoard game={game} />
        </div>
        <div className="CommentsAreaContainer">
          <div className="CommentsContainer">
            {comments?.map((comment) => (
              <div key={comment.id} className="SingleComment">
                <h3>{comment.username}</h3>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
          <div className="CommentBox"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleReplay;

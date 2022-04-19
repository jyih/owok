import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateCommentForm from "./CreateCommentForm";

const Comments = () => {
  const dispatch = useDispatch();

  const game = useSelector((state) => state.current_game);
  const commentsObj = game?.comments;
  const comments = commentsObj && Object.values(commentsObj);

  return (
    <div className="CommentsAreaContainer">
      <div className="CommentsContainer">
        {comments?.map((comment) => (
          <div key={comment.id} className="SingleComment">
            <h3>{comment.username}</h3>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <CreateCommentForm />
    </div>
  );
};

export default Comments;

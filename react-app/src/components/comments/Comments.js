import React from "react";
import { useSelector } from "react-redux";
import CreateCommentForm from "./CreateCommentForm";

const Comments = () => {
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

import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreateCommentForm from "./CreateCommentForm";
import EditCommentForm from "./EditCommentForm";

const Comments = () => {
  //state = formVisible true and false onclick change state to true or false
  const sessionUser = useSelector((state) => state.session.user);
  const game = useSelector((state) => state.current_game);
  const commentsObj = game?.comments;
  const comments = commentsObj && Object.values(commentsObj);

  const [editId, setEditId] = useState(0);

  const handleClick = (id) => {
    setEditId(id);
  };

  return (
    <div className="CommentsAreaContainer">
      <div className="CommentsContainer">
        {comments?.map((comment) => (
          <div key={comment.id} className="SingleComment">
            <h3>{comment.username}</h3>
            <p>{comment.content}</p>
            {sessionUser.id === comment.player_id && (
              <button onClick={() => handleClick(comment.id)}>
                Edit Comment
              </button>
            )}
            {editId === comment.id && (
              <>
                <EditCommentForm commentId={comment.id} />
                <button onClick={() => setEditId(0)}>Cancel</button>
              </>
            )}
          </div>
        ))}
      </div>
      <CreateCommentForm />
    </div>
  );
};

export default Comments;

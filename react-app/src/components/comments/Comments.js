import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreateCommentForm from "./CreateCommentForm";
import EditCommentForm from "./EditCommentForm";

import "./Comments.css";

const Comments = () => {
  //state = formVisible true and false onclick change state to true or false
  const sessionUser = useSelector((state) => state.session.user);
  const game = useSelector((state) => state.current_game);
  const commentsObj = game?.comments;
  const comments = commentsObj && Object.values(commentsObj);

  // const [content, setContent] = useState("");

  const [editId, setEditId] = useState(0);

  const handleClick = (id) => {
    if (id !== editId) {
      setEditId(id);
    } else {
      setEditId(0);
    }
  };

  const resetId = () => {
    setEditId(0);
  };

  //index of map, if index is odd, classname left, if index is even, classname right
  const leftRight = (index) => {
    if (index % 2 === 0) return "CommentLeft";
    if (index % 2 === 1) return "CommentRight";
  };

  function formatTime(string) {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(string).toLocaleTimeString([], options);
  }

  function formatDate(string) {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <div className="CommentsAreaContainer">
      <CreateCommentForm />
      <div className="CommentsContainer">
        {comments &&
          comments
            .sort((a, b) => b.id - a.id)
            .map((comment, index) => (
              <div
                key={comment.id}
                className={`SingleComment CommentBottomLeft ${leftRight(
                  index
                )}`}
              >
                <h3>{comment.username}</h3>
                <div
                  className="CommentTime"
                  title={formatDate(comment.created_at)}
                >
                  {formatTime(comment.created_at)}{" "}
                </div>
                <p
                // contentEditable={sessionUser.id === comment.player_id}
                // onInput={(e) => setContent(e.currentTarget.textContent)}
                // className="content"
                >
                  {comment.content}
                </p>
                {sessionUser.id === comment.player_id && (
                  <i
                    className="fa-solid fa-ellipsis-vertical"
                    onClick={() => handleClick(comment.id)}
                    title="Edit/delete uwu"
                  ></i>
                )}
                {editId === comment.id && (
                  <>
                    <EditCommentForm commentId={comment.id} resetId={resetId} />
                    <button onClick={() => setEditId(0)}>Cancel</button>
                  </>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;

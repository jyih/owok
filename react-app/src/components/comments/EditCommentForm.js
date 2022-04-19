import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as replayActions from "../../store/replays";

const EditCommentForm = ({ commentId }) => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.current_game?.comments);
  const commentToEdit = game[commentId];

  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState(commentToEdit?.content);

  const updateContent = (e) => setContent(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (content.length === 0) validationErrors.push("");

    if (content.length > 12000)
      validationErrors.push("s-senpai.. it's too long.. uwu");

    setErrors(validationErrors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let editedComment = {
      id: commentId,
      content,
    };

    if (editedComment) {
      dispatch(replayActions.editComment(editedComment));
    }
    setErrors([]);
    setContent("");
  };

  return (
    <div className="EditCommentBox">
      <form onSubmit={handleSubmit}>
        <div className="EditCommentErrors">{errors}</div>
        <div className="EditCommentTextBoxArea">
          <textarea
            type="text"
            required
            placeholder="Edit Comment"
            value={content}
            onChange={updateContent}
          />
          <button type="submit" disabled={errors.length > 0}>
            Edit
          </button>
        </div>
      </form>
      <button
        onClick={async (e) => {
          e.preventDefault();
          if (window.confirm("Are you sure you want to delete this? uwu")) {
            await dispatch(replayActions.deleteComment(commentId));
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default EditCommentForm;

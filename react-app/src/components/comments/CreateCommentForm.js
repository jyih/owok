import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as replayActions from "../../store/replays";

import "./CreateCommentForm.css";

const CreateCommentForm = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.session.user);
  const game = useSelector((state) => state.current_game);

  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState("");

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

    let newComment = {
      game_id: game.id,
      player_id: player.id,
      username: player.username,
      content,
    };

    if (newComment) {
      dispatch(replayActions.addComment(newComment));
    }
    setErrors([]);
    setContent("");
  };

  return (
    <div className="CommentBox">
      <form onSubmit={handleSubmit}>
        <div className="CreateCommentErrors">{errors}</div>
        <div className="CommentTextBoxArea">
          <textarea
            type="text"
            required
            placeholder="Comment"
            value={content}
            onChange={updateContent}
          />
          <button type="submit" disabled={errors.length > 0}>
            <i className="fa-solid fa-angles-down"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCommentForm;

import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentForm from "./EditCommentForm";

function EditCommentModal({ commentId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <p onClick={() => setShowModal(true)} className="postCommentBtn">
        <i className="fa-solid fa-comment-dots"></i>
      </p>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm
            onClose={() => setShowModal(false)}
            commentId={commentId}
          />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;

import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Challenge from "./Challenge";

function ChallengeModal({ sessionUser, user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="ProfileChallengeButton">
      <button onClick={() => setShowModal(true)}>Challenge</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Challenge
            onClose={() => setShowModal(false)}
            sessionUser={sessionUser}
            user={user}
          />
        </Modal>
      )}
    </div>
  );
}

export default ChallengeModal;

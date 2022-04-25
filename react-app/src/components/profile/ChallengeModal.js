import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import Challenge from "./Challenge";
import { createGame } from "../../store/game";

function ChallengeModal({ sessionUser, user }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [gameId, setGameId] = useState();

  const handleClick = async (e) => {
    e.preventDefault();

    const payload = {
      player_one_id: sessionUser.id,
      player_two_id: user.id,
    };

    let newGame;
    newGame = await dispatch(createGame(payload));

    if (newGame) {
      setGameId(newGame.id);
      setShowModal(true);
    }
  };

  return (
    <div className="ProfileChallengeButton">
      <button onClick={handleClick}>Challenge</button>
      {gameId && showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Challenge
            onClose={() => setShowModal(false)}
            sessionUser={sessionUser}
            user={user}
            gameId={gameId}
          />
        </Modal>
      )}
    </div>
  );
}

export default ChallengeModal;

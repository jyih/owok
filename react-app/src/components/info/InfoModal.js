import React, { useState } from "react";
import { ModalTwo } from "../../context/Modal";
import Info from "./Info";
import MapleAdministrator from "../images/NPC_Maple_Administrator.png";

import "./Info.css";

function InfoModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="InfoButton">
      <img
        src={MapleAdministrator}
        alt="Maple Administrator"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <ModalTwo onClose={() => setShowModal(false)}>
          <Info onClose={() => setShowModal(false)} />
        </ModalTwo>
      )}
      <h1>Need help?</h1>
    </div>
  );
}

export default InfoModal;

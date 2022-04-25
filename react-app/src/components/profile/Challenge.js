import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Challenge = ({ sessionUser, user, gameId }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  let linkToCopy = `${window.location.origin}/play/${gameId}/${sessionUser.id}/${user.id}`;

  useEffect(() => {
    copyNotify();
  });

  const updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip).then(
      () => {
        setCopySuccess(true);
      },
      () => {
        setCopySuccess(false);
      }
    );
  };

  //boolean show div if true, "Copied!"
  const copyNotify = () => {
    if (copySuccess === true) {
      setTimeout(() => {
        setCopySuccess(false);
      }, 1500);
    }
  };

  const copyLink = () => {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        updateClipboard(linkToCopy);
      }
    });
  };

  return (
    <div className="ChallengeModal">
      <h1>Challenge {user.username}</h1>
      <p className="ChallengeText">
        Send the following link to your chosen opponent to play:
      </p>
      {copySuccess && <div className="CopiedText">Copied!</div>}
      <p className="ChallengeLink" id="newClip">
        {window.location.origin}/play/{gameId}/{sessionUser.id}/{user.id}
        <i
          className="fa-regular fa-copy"
          onClick={copyLink}
          title="Copy to clipboard"
        ></i>
      </p>
      <p className="ChallengeText">
        When you're ready, click the button to go to the room!
      </p>
      <NavLink to={`/play/${gameId}/${sessionUser.id}/${user.id}`}>
        Let's play!
      </NavLink>
    </div>
  );
};

export default Challenge;

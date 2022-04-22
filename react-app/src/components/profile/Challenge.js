import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Challenge = ({ sessionUser, user }) => {
  const [copySuccess, setCopySuccess] = useState("");

  let linkToCopy = `${window.location.origin}/play/${sessionUser.id}/${user.id}`;

  const updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip).then(
      () => {
        setCopySuccess("Copied!");
      },
      () => {
        setCopySuccess("copy failed!");
      }
    );
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
      <p>Send the following link to your chosen opponent to play!</p>
      <p id="newClip">
        {window.location.origin}/play/{sessionUser.id}/{user.id}
      </p>
      <button onClick={copyLink}>Copy</button>
      <p>When you're ready, click the button to go to the room</p>
      <NavLink to={`/play/${sessionUser.id}/${user.id}`}>Let's play!</NavLink>
    </div>
  );
};

export default Challenge;

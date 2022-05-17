import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./Info.css";

const Info = () => {
  return (
    <div className="InfoModal">
      <h1>
        <img
          src="https://owok.s3.us-west-1.amazonaws.com/teeheenoob.png"
          alt="noob teehee face"
          style={{ transform: "scaleX(-1)" }}
        />
        Owok Help Page{" "}
        <img
          src="https://owok.s3.us-west-1.amazonaws.com/teeheenoob.png"
          alt="noob teehee face"
        />
      </h1>
      <h2 className="HowToStart">
        How do I start a game?{" "}
        <img
          src="https://owok.s3.us-west-1.amazonaws.com/glitternoob.png"
          alt="noob glitter face"
        />
      </h2>
      <p>
        1. Begin by asking a friend if they would like to play, and make sure
        they have an account! <br />
        <br />
        2. Click "Browse" and select your friend's character to go to their
        profile page. <br />
        <br />
        3. Once you're there, click the "Challenge" button and send the provided
        link to the chosen friend. <br /> <br />
        4. Press the "Let's Play!" button to go to the game lobby and wait for
        your friend join to begin! <br />
        <br />
        <br />
        Once you complete a game, you must make a new game to play again. <br />
        <br />
      </p>
      <p style={{ color: "red" }}>
        **IMPORTANT** Only you and the chosen friend (the person's profile that
        you clicked the challenge button on) can play with this link! Anyone
        else who joins will not be able to play! <br />
        <br />
      </p>
      <h2>
        <img
          src="https://owok.s3.us-west-1.amazonaws.com/wtfnoob.png"
          alt="noob f6"
          style={{ transform: "scaleX(-1)", margin: "0 10px 0 0" }}
        />{" "}
        How do I play Owok?
      </h2>
      <p>
        Owok is a connect 5 game. You and your opponent will take turns placing
        pieces, and the first person to place 5 pieces in a row wins, whether it
        be horizontally, vertically, or even diagonally! <br />
        <br />
        Since you and your opponent are both trying to place 5 of your own
        pieces in a row, make sure you keep an eye out and block your opponent
        to prevent them from winning! ( •̀ ω •́ )✧ <br /> <br />
      </p>
      <h2>
        Privating Replays{" "}
        <img
          src="https://owok.s3.us-west-1.amazonaws.com/ehehnoob.png"
          alt="noob smolder face"
          style={{ margin: "0 0 0 10px" }}
        />
      </h2>
      <p>
        Every match will be displayed under "Replays" for people to view! You
        have the ability to "private" a match that you participated in on your
        match replay's page. <br /> <br />
        To private a replay that you participated in, locate the lock icon on
        the top right of the replay board!{" "}
        <i className="fa-solid fa-unlock"></i>{" "}
        <i className="fa-solid fa-lock"></i> <br /> <br />
        The lock icon will only be available on replays of games that you
        played! <br /> <br />
        All replays begin as public <i className="fa-solid fa-unlock"></i> ,
        which means that your username will show on the replay for everyone to
        see!
        <br /> <br />
        Once you click the lock, the replay will be privated{" "}
        <i className="fa-solid fa-lock"></i> , which means that your name will
        show as "???" to all other users on both the "Replays" page and the
        actual replay, except for your opponent and yourself. <br /> <br />
        You will still be able to see privated replays on your profile page,
        although they will not show up on your profile page when another user
        views your profile.
      </p>
    </div>
  );
};

export default Info;

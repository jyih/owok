import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import InfoModal from "../info/InfoModal";

import "./BrowseReplays.css";

const BrowseReplays = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const res = await fetch("/api/replays/");
      const resData = await res.json();
      const replays = Object.values(resData);
      setGames(replays);
    }
    fetchGames();
  }, []);

  const gamesComponents = games
    .sort((a, b) => b.id - a.id)
    .map((game) => {
      return (
        <section key={game.id}>
          {game.winner_id !== null && (
            <div className="SingleGameContainer">
              <NavLink to={`/replays/${game.id}`}>
                <div className="BrowsePlayerImages">
                  <div className="BrowseSprites">
                    <div className="BrowsePlayerOne">
                      <img
                        src={game.user_player_one.sprite_url}
                        className="player_one_rotate"
                        alt="player one sprite"
                      />
                      <p>
                        {sessionUser.id === game.player_one_id ||
                        sessionUser.id === game.player_two_id ||
                        !game?.is_private_one
                          ? game?.user_player_one?.username
                          : "???"}
                      </p>
                    </div>
                    <p className="BrowseVsP">vs.</p>
                    <div className="BrowsePlayerTwo">
                      <img
                        src={game.user_player_two.sprite_url}
                        alt="player two sprite"
                      />
                      <p>
                        {sessionUser.id === game.player_one_id ||
                        sessionUser.id === game.player_two_id ||
                        !game?.is_private_two
                          ? game?.user_player_two?.username
                          : "???"}
                      </p>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          )}
        </section>
      );
    });

  return (
    <div className="BrowseReplaysContainer">
      <div className="BrowseReplaysBody">
        <h1> Browse Replays</h1>
        <div className="GamesContainer">{gamesComponents}</div>
      </div>
      <InfoModal />
    </div>
  );
};

export default BrowseReplays;

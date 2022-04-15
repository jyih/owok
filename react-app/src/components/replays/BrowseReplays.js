import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./BrowseReplays.css";

const BrowseReplays = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const res = await fetch("/api/games/");
      const resData = await res.json();
      const replays = Object.values(resData);
      setGames(replays);
    }
    fetchGames();
  }, []);

  const gamesComponents = games.map((game) => {
    return (
      <div key={game.id} className="SingleGameContainer">
        <NavLink to={`/replays/${game.id}`}>
          <h1>
            {game.user_player_one.username} vs. {game.user_player_two.username}
          </h1>
          <img
            src={game.user_player_one.sprite_url}
            className="player_one_rotate"
          />
          <img src={game.user_player_two.sprite_url} />
        </NavLink>
      </div>
    );
  });

  return (
    <div className="BrowseReplaysContainer">
      <div className="BrowseReplaysBody">
        <h1> Browse Replays</h1>
        <div className="GamesContainer">{gamesComponents}</div>
      </div>
    </div>
  );
};

export default BrowseReplays;

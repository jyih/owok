import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const BrowseReplays = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const res = await fetch("/api/games/");
      const resData = await res.json();
      const replays = Object.values(resData);
      console.log(replays);
      setGames(replays);
    }
    fetchGames();
  }, []);

  const gamesComponents = games.map((game) => {
    return (
      <div key={game.id}>
        <NavLink to={`/replays/${game.id}`}>
          {game.player_one_id} vs. {game.player_two_id}
        </NavLink>
      </div>
    );
  });

  return (
    <>
      <h1> Browse Replays</h1>
      <ul>{gamesComponents}</ul>
    </>
  );
};

export default BrowseReplays;

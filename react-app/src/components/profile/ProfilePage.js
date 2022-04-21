// basically a profile page, shows sprite, stats, and a list of replays
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "./ProfilePage.css";

const ProfilePage = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const [games, setGames] = useState([]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const res = await fetch(`/api/users/${userId}`);
      if (res.ok) {
        const user = await res.json();
        setUser(user);
      } else {
        setTimeout(() => {
          history.push("/browse");
        }, 2000);
      }
    })();
  }, [userId, history]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    async function fetchUsersGames() {
      const res = await fetch(`/api/games/user/${userId}`);
      if (res.ok) {
        const resData = await res.json();
        const replays = Object.values(resData);
        setGames(replays);
      } else {
        setTimeout(() => {
          history.push("/browse");
        }, 2000);
      }
    }
    fetchUsersGames();
  }, [userId, history]);

  if (!user) {
    return null;
  }

  // if user = session user, show all games
  const sessionUsersGamesComponent = games
    ?.sort((a, b) => b.id - a.id)
    .map((game) => {
      return (
        <div key={game.id} className="SingleGameContainer">
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
      );
    });

  // if user != session user, don't show privated games of user
  // if is_private_one is true, player_one_id is user, don't show game
  // if is_private_two is true, player_two_id is user, don't show game
  // if ((game.is_private_one && game.player_one_id === user.id) || (game.is_private_two && game.player_two_id === user.id)) <></>

  // if is_private_one is false, player_one_id is user, show game
  // if is_private_two is false, player_two_id is user, show game
  // if ((!game.is_private_one && game.player_one_id === user.id) || (!game.is_private_two && game.player_two_id === user.id)) show game
  const usersGamesComponent = games
    ?.sort((a, b) => b.id - a.id)
    .map((game) => {
      return (
        <section key={game.id}>
          {(!game.is_private_one && game.player_one_id === user.id) ||
          (!game.is_private_two && game.player_two_id === user.id) ? (
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
          ) : (
            <></>
          )}
        </section>
      );
    });

  return (
    <>
      <div className="ProfilePageContainer">
        {user?.username ? (
          <div className="ProfilePageBody">
            <h1>{user.username}</h1>
            <div className="ProfileWrapper">
              <div className="ProfileCard">
                <div className="ProfileCardLeft">
                  <img src={user.sprite_url} alt={`${user.username} sprite`} />
                  <p>{user.username}</p>
                </div>
                <div className="ProfileCardRight">
                  <p>wins: {user.wins}</p>
                  <p>losses: {user.losses}</p>
                  <p>draws: {user.draws}</p>
                </div>
              </div>
              <div className="ProfileGames">
                {sessionUser.id === user.id
                  ? sessionUsersGamesComponent
                  : usersGamesComponent}
              </div>
            </div>
          </div>
        ) : (
          <h1 className="ProfileSearchingText">Searching..</h1>
        )}
      </div>
    </>
  );
};

export default ProfilePage;

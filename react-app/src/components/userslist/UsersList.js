import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import InfoModal from "../info/InfoModal";

import "./UsersList.css";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users
    .sort(function (a, b) {
      if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
      if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
      return 0;
    })
    .map((user) => {
      return (
        <div key={user.id} className="SinglePlayerContainer">
          <NavLink to={`/profile/${user.id}`}>
            <img src={user.sprite_url} alt="sprite" />
            <p>{user.username}</p>
          </NavLink>
        </div>
      );
    });

  return (
    <div className="PlayContainer">
      <div className="PlayBody">
        <h1>Players</h1>
        <div className="PlayPlayersWrapper">{userComponents}</div>
      </div>
      <InfoModal />
    </div>
  );
}

export default UsersList;

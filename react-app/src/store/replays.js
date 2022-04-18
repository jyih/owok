const GET_GAME = "games/GET_GAME";

const loadGame = (game) => ({
  type: GET_GAME,
  game,
});

export const fetchGame = (game_id) => async (dispatch) => {
  const res = await fetch(`/api/games/${game_id}`);

  if (res.ok) {
    const game = await res.json();

    dispatch(loadGame(game));
    return game;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const editGame = (privateData) => async (dispatch) => {
  const res = await fetch(`/api/games/${privateData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(privateData),
  });

  if (!res.ok) {
    return res.errors;
  }
  const updatedGame = await res.json();
  console.log("thunk privateData", privateData);
  console.log("thunk updatedGame", updatedGame);

  dispatch(loadGame(updatedGame));
  return updatedGame;
};

export const saveGame = (payload) => async (dispatch) => {
  const res = await fetch(`/api/games/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    /**
     *player_one_id = data['player_one_id'],
      player_two_id = data['player_one_id'],
      winner_id = data['winner_id'],
      moves = data['moves'],
     */
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(loadGame(data));
  } else {
    const errors = await res.json();
    return errors;
  }
};

let initialState = {};

const replaysReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_GAME:
      newState = action.game;
      return newState;
    default:
      return state;
  }
};

export default replaysReducer;

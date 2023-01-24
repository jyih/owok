const GET_GAME = "games/GET_GAME";
// const UPDATE_GAME = "games/UPDATE_GAME";

// NOTE: save game is in replay reducer as saveReplay currently
// in state, this is called current_games because what if player is participating
// in multiple games.. ?
// maybe have to change model for moves to be nullable (?) since
// creating game without moves

const loadGame = (game) => ({
  type: GET_GAME,
  game,
});

// const updateGame = (game) => ({
//   type: UPDATE_GAME,
//   game,
// });

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

export const createGame = (game) => async (dispatch) => {
  const res = await fetch(`/api/games/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });

  if (res.ok) {
    const game = await res.json();
    dispatch(loadGame(game));
    return game;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const updateGame = (game) => async (dispatch) => {
  const res = await fetch(`/api/games/${game.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(loadGame(data));
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

let initialState = {};

const gamesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_GAME:
      newState[action.game.id] = action.game;
      return newState
    default:
      return state;
  }
};

export default gamesReducer;

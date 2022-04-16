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

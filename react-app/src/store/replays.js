const GET_GAME = "games/GET_GAME";
const GET_COMMENT = "games/GET_COMMENT";
const DELETE_COMMENT = "games/DELETE_COMMENT";

const loadGame = (game) => ({
  type: GET_GAME,
  game,
});

const loadComment = (comment) => ({
  type: GET_COMMENT,
  comment,
});

const removeComment = (comment_id) => ({
  type: DELETE_COMMENT,
  comment_id,
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

  dispatch(loadGame(updatedGame));
  return updatedGame;
};

export const saveGame = (payload) => async (dispatch) => {
  const res = await fetch(`/api/games/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(loadGame(data));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const addComment = (payload) => async (dispatch) => {
  const res = await fetch(`/api/comments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(loadComment(data));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const editComment = (payload) => async (dispatch) => {
  const res = await fetch(`/api/comments/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const data = await res.json(); //returns comment obj
    dispatch(loadComment(data));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteComment = (comment_id) => async (dispatch) => {
  const res = await fetch(`/api/comments/${comment_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json(); //returns comment id
    dispatch(removeComment(data));
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
    case GET_COMMENT:
      newState.comments[action.comment.id] = action.comment;
      return newState;
    case DELETE_COMMENT:
      delete newState.comments[action.comment_id];
      return newState;
    default:
      return state;
  }
};

export default replaysReducer;

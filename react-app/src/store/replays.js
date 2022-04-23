const GET_REPLAY = "replays/GET_REPLAY";
const GET_COMMENT = "replays/GET_COMMENT";
const DELETE_COMMENT = "replays/DELETE_COMMENT";

const loadReplay = (replay) => ({
  type: GET_REPLAY,
  replay,
});

const loadComment = (comment) => ({
  type: GET_COMMENT,
  comment,
});

const removeComment = (comment_id) => ({
  type: DELETE_COMMENT,
  comment_id,
});

export const fetchReplay = (replay_id) => async (dispatch) => {
  const res = await fetch(`/api/replays/${replay_id}`);

  if (res.ok) {
    const replay = await res.json();

    dispatch(loadReplay(replay));
    return replay;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const editReplay = (privateData) => async (dispatch) => {
  const res = await fetch(`/api/replays/${privateData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(privateData),
  });

  if (!res.ok) {
    return res.errors;
  }
  const updatedReplay = await res.json();

  dispatch(loadReplay(updatedReplay));
  return updatedReplay;
};

export const saveReplay = (payload) => async (dispatch) => {
  const res = await fetch(`/api/replays/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(loadReplay(data));
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
    case GET_REPLAY:
      newState = action.replay;
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

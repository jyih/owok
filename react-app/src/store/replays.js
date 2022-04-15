// const GET_ALL_GAMES = "games/GET_ALL_GAMES";

// const loadAllGames = (games) => ({
//   type: GET_ALL_GAMES,
//   games,
// });

// export const fetchGames = () => async (dispatch) => {
//   const res = await fetch("/api/games");
//   const games = await res.json();

//   dispatch(loadAllGames(games));
//   return games;
// };

// let initialState = {};

// const replaysReducer = (state = initialState, action) => {
//   let newState = { ...state };
//   switch (action.type) {
//     case GET_ALL_GAMES:
//       action.games.forEach((game) => (newState[game.id] = game));
//       return newState;
//     default:
//       return state;
//   }
// };

// export default replaysReducer;

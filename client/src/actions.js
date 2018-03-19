// game
export const NEW_GAME = 'NEW_GAME';
export const TERMINATE_GAME = 'TERMINATE_GAME';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const CHANGE_MODAL_INPUT = 'CHANGE_MODAL_INPUT';
export const SUBMIT_RESULT = 'SUBMIT_RESULT';
export const SUBMIT_RESULT_SUCCESS = 'SUBMIT_RESULT_SUCCESS';
export const SUBMIT_RESULT_FAILED = 'SUBMIT_RESULT_FAILED';
// timer
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
// ranking
export const FETCH_RANKING = 'FETCH_RANKING';
export const FETCH_RANKING_SUCCESS = 'FETCH_RANKING_SUCCESS';
export const FETCH_RANKING_FAILED = 'FETCH_RANKING_FAILED';


// game
export const newGame = () => ({
  type: NEW_GAME,
});
export const terminateGame = () => ({
  type: TERMINATE_GAME,
});
export const closeModal = () => ({
  type: CLOSE_MODAL,
});
export const changeModalInput = value => ({
  type: CHANGE_MODAL_INPUT,
  payload: value,
});
export const submitResult = () => ({
  type: SUBMIT_RESULT,
});
export const submitResultSuccess = () => ({
  type: SUBMIT_RESULT_SUCCESS,
});
export const submitResultFailed = () => ({
  type: SUBMIT_RESULT_FAILED,
});
// timer
export const startTimer = now => ({
  type: START_TIMER,
  payload: now,
});
export const stopTimer = now => ({
  type: STOP_TIMER,
  payload: now,
});
// ranking
export const fetchRanking = () => ({
  type: FETCH_RANKING,
})
export const fetchRankingSuccess = rankingArray => ({
  type: FETCH_RANKING_SUCCESS,
  payload: rankingArray,
})
export const fetchRankingFailed = () => ({
  type: FETCH_RANKING_FAILED,
})

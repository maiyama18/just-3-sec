import { combineReducers } from "redux";

import {
  NEW_GAME, TERMINATE_GAME, SUBMIT_RESULT, CLOSE_MODAL, SUBMIT_RESULT_FAILED, SUBMIT_RESULT_SUCCESS,
  START_TIMER, STOP_TIMER,
  FETCH_RANKING, FETCH_RANKING_SUCCESS, FETCH_RANKING_FAILED, CHANGE_MODAL_INPUT,
} from "./actions";
import { FINAL_ROUND, INITIAL_POWER } from "./helpers/constants";
import { calcNextPower } from './helpers/utils';

const initialState = {
  game: {
    isTerminated: false,
    showModal: false,
    isSubmitting: false,
    modalInput: '',
  },
  timer: {
    round: 1,
    power: INITIAL_POWER,
    isStarted: false,
    startedAt: undefined,
    stoppedAt: undefined,
    sumAbsError: 0,
  },
  ranking: {
    array: [],
    isFetching: false,
  }
};

const gameReducer = (state = initialState.game, action) => {
  switch (action.type) {
    case TERMINATE_GAME:
      return {
        ...state,
        isTerminated: true,
        showModal: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
      }
    case CHANGE_MODAL_INPUT:
      return {
        ...state,
        modalInput: action.payload,
      }
    case SUBMIT_RESULT:
      return {
        ...state,
        isSubmitting: true,
      }
    case SUBMIT_RESULT_FAILED:
      return {
        ...state,
        isSubmitting: false,
      }
    case SUBMIT_RESULT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        showModal: false,
      }
    case NEW_GAME:
      return initialState.game;
    default:
      return state;
  }
};

const timerReducer = (state = initialState.timer, action) => {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        isStarted: true,
        startedAt: action.payload,
      };
    case STOP_TIMER:
      const now = action.payload;
      const error = (now - state.startedAt) - 3000;
      return {
        ...state,
        round: Math.min(state.round + 1, FINAL_ROUND),
        isStarted: false,
        stoppedAt: now,
        power: calcNextPower(state.power, error),
        sumAbsError: state.sumAbsError + Math.abs(error),
      };
    case NEW_GAME:
      return initialState.timer;
    default:
      return state;
  }
};

const rankingReducer = (state = initialState.ranking, action) => {
  switch (action.type) {
    case FETCH_RANKING:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_RANKING_SUCCESS:
      return {
        ...state,
        array: action.payload,
        isFetching: false,
      };
    case FETCH_RANKING_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  game: gameReducer,
  timer: timerReducer,
  ranking: rankingReducer,
});
export default rootReducer;
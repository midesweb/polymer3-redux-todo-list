import {
  INCREASE_COUNTER,
  DECREASE_COUNTER
} from '../actions/counter_actions.js';

const INITIAL_STATE = {
  clicks: 0,
  value: 0
};

const counterReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case INCREASE_COUNTER:
      return {
        clicks: state.clicks + 1,
        value: state.value + 1
      }
    case DECREASE_COUNTER:
    return {
      clicks: state.clicks + 1,
      value: state.value - 1
    }
    default:
      return state;
  }
}

export default counterReducer;
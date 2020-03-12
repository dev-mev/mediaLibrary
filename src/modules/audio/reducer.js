import { handleActions } from 'redux-actions';
import R from 'ramda';
import { ADD_AUDIO, REMOVE_AUDIO } from './types';

import { mergeIn } from '../../utils/stateHelpers';

const INITIAL_STATE = {
  audioItemsIds: [],
  audioItems: {
    // [id]: {
    //    id: string,
    //    title: string,
    //    recordDate: string date,
    //    duration: number,
    //    audioUrl: string,
    // }
  },

};

export default handleActions({
  [ADD_AUDIO]: mergeIn((action, state) => ({
    audioItemsIds: [action.payload.id].concat(state.audioItemsIds),
    audioItems: {
      ...state.audioItems,
      [action.payload.id]: action.payload,
    },
  })),

  [REMOVE_AUDIO]: mergeIn((action, state) => ({
    audioItemsIds: state.audioItemsIds.filter(i => action.payload !== i),
    audioItems: R.omit([action.payload], state.audioItems),
  })),
}, INITIAL_STATE);

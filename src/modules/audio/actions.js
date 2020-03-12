import { createAction } from 'redux-actions';
import { ADD_AUDIO, REMOVE_AUDIO } from './types';

export const addAudio = createAction(ADD_AUDIO);
export const removeAudio = createAction(REMOVE_AUDIO);


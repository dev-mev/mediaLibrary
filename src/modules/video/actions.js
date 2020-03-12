import { createAction } from 'redux-actions';
import { ADD_VIDEO, REMOVE_VIDEO } from './types';

export const addVideo = createAction(ADD_VIDEO);
export const removeVideo = createAction(REMOVE_VIDEO);


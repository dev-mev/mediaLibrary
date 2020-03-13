import * as actions from './actions';

export const addAudioOp = audioUri => actions.addAudio(audioUri);

export const removeAudioOp = audioId => actions.removeAudio(audioId);


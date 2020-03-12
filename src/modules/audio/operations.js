import { addAudio, removeAudio } from './actions';

export const _addAudio = audioUri => addAudio(audioUri);

export const _removeAudio = audioId => removeAudio(audioId);


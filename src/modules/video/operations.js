import { addVideo, removeVideo } from './actions';

export const _addVideo = videoUri => addVideo(videoUri);

export const _removeVideo = videoId => removeVideo(videoId);


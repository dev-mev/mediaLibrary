import reducer from './reducer';

export { _addVideo, _removeVideo } from './operations';
export { addVideo, removeVideo } from './actions';
export { ADD_VIDEO, REMOVE_VIDEO } from './types';
export { getAllVideoItems } from './selectors';

export default reducer;

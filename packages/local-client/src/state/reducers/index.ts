import { combineReducers } from 'redux';
import cellsReducer from './cellReducer';
import bundleReducer from './bundleReducer';

const reducers = combineReducers({
	cells: cellsReducer,
	bundles: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

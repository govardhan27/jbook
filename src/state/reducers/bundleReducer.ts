import produce from 'immer';

import { Action } from '../actions';
import { ActionType } from '../action-types';

interface BundelState {
	[key: string]:
		| {
				loading: boolean;
				code: string;
				err: string;
		  }
		| undefined;
}

const initialState: BundelState = {};

const reducer = produce((state: BundelState, action: Action): BundelState => {
	switch (action.type) {
		case ActionType.BUNDLE_START:
			state[action.payload.cellId] = {
				loading: true,
				code: '',
				err: '',
			};
			return state;

		case ActionType.BUNDLE_COMPLETE:
			state[action.payload.cellId] = {
				loading: false,
				code: action.payload.bundle.code,
				err: action.payload.bundle.err,
			};
			return state;

		default:
			return state;
	}
}, initialState);

export default reducer;

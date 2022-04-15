import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = createStore(
	reducers,
	{},
	applyMiddleware(persistMiddleware, thunk)
);

// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		type: 'code',
// 		id: '',
// 	},
// });

// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		type: 'text',
// 		id: '',
// 	},
// });
// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		type: 'code',
// 		id: '',
// 	},
// });

// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		type: 'text',
// 		id: '',
// 	},
// });

console.log(store.getState());

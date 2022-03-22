import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../state';

export const useActions = () => {
	const dispatch = useDispatch();
	// run the bindActionCreators only when the dispatch changes.
	return useMemo(
		() => bindActionCreators(actionCreators, dispatch),
		[dispatch]
	);
};

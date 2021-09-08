import './resizable.css';

import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps;

	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [width, setWidth] = useState(window.innerWidth * 0.75);

	useEffect(() => {
		let timer: any;
		const listener = () => {
			// debounce
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				setInnerWidth(window.innerWidth);
				setInnerHeight(window.innerHeight);
				if (window.innerWidth < width) {
					setWidth(window.innerWidth * 0.75);
				}
			}, 100);
		};
		window.addEventListener('resize', listener);
		return () => {
			window.removeEventListener('resize', listener);
		};
	}, [width]);

	if (direction === 'horizontal') {
		resizableProps = {
			className: 'resize-horizontal',
			minConstraints: [innerWidth * 0.2, Infinity],
			maxConstraints: [innerWidth * 0.75, Infinity],
			height: Infinity,
			width,
			resizeHandles: ['e'],
			onResizeStop: (e, data) => {
				setWidth(data.size.width);
			},
		};
	} else {
		resizableProps = {
			minConstraints: [Infinity, 24],
			maxConstraints: [Infinity, innerHeight * 0.9],
			height: 300,
			width: Infinity,
			resizeHandles: ['s'],
		};
	}

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;

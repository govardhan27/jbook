import { useState, useEffect } from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');
	const [err, setErr] = useState('');

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundle(input);
			setCode(output.code);
			setErr(output.err);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue='const a = 1;'
						onChange={(val) => setInput(val)}
					/>
				</Resizable>
				<Preview code={code} bundlingStatus={err} />
			</div>
		</Resizable>
	);
};

export default CodeCell;

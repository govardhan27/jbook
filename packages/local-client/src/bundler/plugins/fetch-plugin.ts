import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
	name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			// attempt to load up the index.js file
			build.onLoad({ filter: /(^index.js$)/ }, () => {
				return {
					loader: 'jsx',
					contents: inputCode,
				};
			});
			// check if the files are cached
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				// check if a file is cached
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				);
				// return immediately if a file is cached
				if (cachedResult) return cachedResult;
			});

			// attempt to load up the css files
			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path);
				const escaped = data
					.replace(/\n/g, '')
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'");

				const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
            `;

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents,
					resolveDir: new URL('./', request.responseURL).pathname,
				};
				// store response in cache
				await fileCache.setItem(args.path, result);

				return result;
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path);

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};
				// store response in cache
				await fileCache.setItem(args.path, result);

				return result;
			});
		},
	};
};

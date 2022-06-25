import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import path from 'path';
import { imagetools } from "vite-imagetools"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({ edge: true }),
		vite: {
			plugins: [
				imagetools()
			],
			resolve: {
				alias: {
					$style: path.resolve('./src/style'),
					$static: path.resolve('./src/static')
				}
			}
		}
	}
};

export default config;

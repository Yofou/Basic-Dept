import type { Action } from 'svelte/action';
import { isDark } from '$lib/store';

const isInView: Action = (node) => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				isDark.set(entry.isIntersecting);
			});
		},
		{ threshold: 0.3 }
	);

	observer.observe(node);

	return {
		destroy: () => {
			observer.disconnect();
		}
	};
};

export default isInView;

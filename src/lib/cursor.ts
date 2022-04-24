import type { Action } from 'svelte/action';
import type { Writable } from 'svelte/store';

interface CursorOptions {
	store: Writable<{ x: number; y: number }>;
}

const cursor: Action<HTMLElement, CursorOptions> = (node, options) => {
	if (options === undefined) throw Error('A Writable store must be passed in');
	const { store } = options;

	const onMouseMove = (event: MouseEvent) => {
		store.set({ x: event.pageX, y: event.pageY });
	};

	const onMouseEnter = () => {
		node.addEventListener('mousemove', onMouseMove);
	};

	const onMouseLeave = () => {
		node.removeEventListener('mousemove', onMouseMove);
	};

	node.addEventListener('mouseenter', onMouseEnter);
	node.addEventListener('mouseleave', onMouseLeave);

	return {
		destroy: () => {
			node.removeEventListener('mouseenter', onMouseEnter);
			node.removeEventListener('mouseleave', onMouseLeave);
		}
	};
};

export default cursor;

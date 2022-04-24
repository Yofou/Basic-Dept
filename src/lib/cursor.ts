import type { Action } from 'svelte/action';
import type { Writable } from 'svelte/store';

interface CursorOptions {
	pos: Writable<{ x: number; y: number }>;
	isMouseOver: Writable<boolean>;
}

const cursor: Action<HTMLElement, CursorOptions> = (node, options) => {
	if (options === undefined) throw Error('Options must be passed in');
	const { pos, isMouseOver } = options;

	const onMouseMove = (event: MouseEvent) => {
		pos.set({ x: event.pageX, y: event.pageY });
	};

	const onMouseEnter = () => {
		node.addEventListener('mousemove', onMouseMove);
		isMouseOver.set(true);
	};

	const onMouseLeave = () => {
		node.removeEventListener('mousemove', onMouseMove);
		isMouseOver.set(false);
	};

	node.addEventListener('mouseenter', onMouseEnter);
	node.addEventListener('mouseleave', onMouseLeave);

	return {
		destroy: () => {
			node.removeEventListener('mouseenter', onMouseEnter);
			node.removeEventListener('mouseleave', onMouseLeave);
			isMouseOver.set(false);
		}
	};
};

export default cursor;

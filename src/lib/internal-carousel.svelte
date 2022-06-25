<script>
	import embla from 'svelte-embla';
	import { spring, tweened } from 'svelte/motion';
	import { writable } from 'svelte/store';
	import cursor from './actions/cursor';
	import InternalCard from './internal-card.svelte';
	import InternalCulture from '$static/internal-culture.png?webp';
	import InternalMoves from '$static/internal-moves.png?webp';
	import InternalCrafted from '$static/internal-crafted.png?webp';
	import InternalBrandBeats from '$static/internal-brandbeats.png?webp';
	import InternalApplied from '$static/internal-applied.png?webp';

	export const pos = spring({ x: 0, y: 0 }, { stiffness: 0.4, damping: 1 });
	const isMouseOver = writable(false);
	export const opacity = tweened(1, { duration: 150 });

	export const scale = tweened(1, { duration: 150 });
	let isMouseDown = false;
	const onMouseDown = () => {
		isMouseDown = true;
		$scale = 0.6;
	};
	const onMouseUp = () => {
		isMouseDown = false;
		$scale = 1;
	};

	$: if ($isMouseOver) {
		$opacity = 1;
	} else {
		$opacity = 0;
	}
</script>

<div
	class="h-full w-full cursor-none overflow-hidden px-20"
	use:embla={{ align: 'start', dragFree: true, containScroll: 'trimSnaps' }}
	use:cursor={{ pos, isMouseOver }}
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
>
	<div class="grid h-full w-full auto-cols-[540px] grid-flow-col grid-rows-[100%]">
		<InternalCard
			src={InternalCulture}
			title="culture manual"
			under="agency culture & onboarding"
			year={2018}
			description="To help strengthen our culture and attract world class talent, we created the Culture Manual – an online guide for new hires that differentiates the employee onboarding process and builds alignment for our collective future."
			{isMouseDown}
		/>
		<InternalCard
			src={InternalMoves}
			title="Moves"
			under="our new hq"
			year={2019}
			description="To help strengthen our culture and attract world class talent, we created the Culture Manual – an online guide for new hires that differentiates the employee onboarding process and builds alignment for our collective future."
			{isMouseDown}
		/>
		<InternalCard
			src={InternalCrafted}
			title="Crafted"
			under="creative community"
			year={2019}
			description="To help strengthen our culture and attract world class talent, we created the Culture Manual – an online guide for new hires that differentiates the employee onboarding process and builds alignment for our collective future."
			{isMouseDown}
		/>
		<InternalCard
			src={InternalBrandBeats}
			title="BrandBeats"
			under="podcast series"
			year={2017}
			description="To help strengthen our culture and attract world class talent, we created the Culture Manual – an online guide for new hires that differentiates the employee onboarding process and builds alignment for our collective future."
			{isMouseDown}
		/>
		<InternalCard
			src={InternalApplied}
			title="applied"
			under="thoughts & perspectives"
			year={2020}
			description="To help strengthen our culture and attract world class talent, we created the Culture Manual – an online guide for new hires that differentiates the employee onboarding process and builds alignment for our collective future."
			{isMouseDown}
		/>
	</div>
</div>

<script lang="ts">
	import cursor from './cursor';
	import { spring, tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';

	const pos = spring({ x: 0, y: 0 }, { damping: 1, stiffness: 0.3 });
	const scale = tweened(1, { duration: 250 });
	const isMouseOver = writable(false);

	const onMouseDown = () => ($scale = 0.75);
	const onMouseUp = () => ($scale = 1);
</script>

<header
	class="relative overflow-hidden w-full h-screen cursor-none z-10"
	use:cursor={{ pos, isMouseOver }}
	style:--pos-x="{$pos.x}px"
	style:--pos-y="{$pos.y}px"
	style:--scale={$scale}
	style:--dim="120px"
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
>
	{#if $isMouseOver}
		<div transition:fade={{ duration: 250 }} class="cursor">
			<div class="circle">
				<p
					class="uppercase max-w-[4ch] font-medium text-[14px] tracking-tight leading-[1.1] text-center"
				>
					Play Reel
				</p>
			</div>
			<p
				class="font-medium text-[14px] tracking-tight leading-[1.1] text-center max-w-[11ch] uppercase"
			>
				basic/depts 2010-22
			</p>
		</div>
	{/if}
	<video class="w-full h-full object-cover z-10" loop preload="auto" autoplay muted>
		<source src="/header.mp4" type="video/mp4" />
		<track kind="captions" />
	</video>
</header>

<style>
	.cursor {
		@apply absolute pointer-events-none top-0 will-change-transform left-0 z-20 grid gap-2;
		transform: translate3d(
			calc(var(--pos-x, 0) - 50%),
			calc(var(--pos-y, 0) - (var(--dim) / 2)),
			0
		);
	}

	.cursor .circle {
		@apply w-[var(--dim)] h-[var(--dim)] bg-white-full rounded-full grid place-items-center scale-[var(--scale,1)];
	}
</style>

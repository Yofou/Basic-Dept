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
	class="relative z-10 h-screen w-full cursor-none overflow-hidden"
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
					class="max-w-[4ch] text-center text-[14px] font-medium uppercase leading-[1.1] tracking-tight"
				>
					Play Reel
				</p>
			</div>
			<p
				class="max-w-[11ch] text-center text-[14px] font-medium uppercase leading-[1.1] tracking-tight"
			>
				basic/depts 2010-22
			</p>
		</div>
	{/if}
	<video class="z-10 h-full w-full object-cover" loop preload="auto" autoplay muted>
		<source src="/header.mp4" type="video/mp4" />
		<track kind="captions" />
	</video>
</header>

<style>
	.cursor {
		@apply pointer-events-none absolute top-0 left-0 z-20 grid gap-2 will-change-transform;
		transform: translate3d(
			calc(var(--pos-x, 0) - 50%),
			calc(var(--pos-y, 0) - (var(--dim) / 2)),
			0
		);
	}

	.cursor .circle {
		@apply grid h-[var(--dim)] w-[var(--dim)] scale-[var(--scale,1)] place-items-center rounded-full bg-white-full;
	}
</style>

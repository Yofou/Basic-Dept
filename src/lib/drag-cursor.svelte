<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	export let pos: Writable<{ x: number; y: number }>;
	export let opacity: Writable<number>;
	export let scale: Writable<number>;
	export let zIndex = 1;
</script>

<div
	class="pointer-events-none absolute top-0 left-0 z-[var(--z-index,1)] hidden h-[120px] w-[120px] scale-[var(--scale,1)] place-items-center rounded-full bg-pink-300/[var(--opacitiy,1)] will-change-transform md:grid"
	style:--x="{$pos.x}px"
	style:--y="{$pos.y}px"
	style:--scale={$scale}
	style:--opacitiy={$opacity}
	style:--z-index={zIndex}
>
	{#if $scale === 1 && $opacity === 1}
		<p
			transition:fade={{ duration: 100 }}
			class="text-[14px] font-medium uppercase tracking-tighter"
		>
			drag
		</p>
	{/if}
</div>

<style>
	div {
		transform: translate3d(calc(var(--x, 0) - 50%), calc(var(--y, 0) - 50%), 0)
			scale(var(--scale, 1));
	}
</style>

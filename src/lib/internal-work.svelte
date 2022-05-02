<script lang="ts">
	import { isInternalWorkOpen } from './store';
	import { fade } from 'svelte/transition';
	import InternalWorkXicon from './internal-work-xicon.svelte';
	import InternalCarousel from './internal-carousel.svelte';
	import DragCursor from './drag-cursor.svelte';
	import type { Spring, Tweened } from 'svelte/motion';

	const onClose = () => ($isInternalWorkOpen = false);
	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key !== 'Escape') return;
		$isInternalWorkOpen = false;
	};

	let pos: Spring<{ x: number; y: number }>;
	let scale: Tweened<number>;
	let opacity: Tweened<number>;

	let shouldShowCursor = false
	$: if ($isInternalWorkOpen) {
		setTimeout( () => {
			shouldShowCursor = true
		}, 800 )
	} else {
		shouldShowCursor = false
	}
</script>

<svelte:window on:keyup={onKeyUp} />

{#if $isInternalWorkOpen}
	{#if shouldShowCursor && pos && opacity && scale}
		<DragCursor zIndex={30} {pos} {opacity} {scale} />
	{/if}

	<section
		transition:fade={{ duration: 250 }}
		class="fixed top-0 left-0 z-20 grid h-full w-full grid-rows-[max-content,1fr,50px] gap-8 bg-black-300 text-pink-300"
	>
		<nav
			class="grid w-full grid-cols-[repeat(2,max-content),1fr,max-content] grid-rows-1 gap-x-10 px-20 pt-[50px] pb-[10px]"
		>
			<div class="h-[14px] w-[14px] translate-y-1/2 rounded-full bg-pink-300" />
			<h1 class="max-w-[17ch] text-[13px] font-medium uppercase">
				(6) Internal works ©2022 <small>c/o</small> BASIC/DEPT®
			</h1>
			<p class="max-w-[474px] text-[14px] font-medium uppercase">
				A collection of internal project and initiatives under the BASIC® brand.
			</p>
			<button
				class="z-40 grid h-10 w-10 place-content-center rounded-full border border-pink-300 bg-black-300"
				on:click={onClose}
			>
				<InternalWorkXicon />
			</button>
		</nav>

		<InternalCarousel bind:pos bind:scale bind:opacity />

		<footer class="flex px-20 justify-between w-full font-medium tracking-tight text-[14px] text-[#5e5e5e]">
			<h1>BASIC/DEPT®, inc</h1>
			<p>10 - 22©</p>
		</footer>
	</section>
{/if}

<style>
	section::before {
		content: '';
		animation: slide-x-out 500ms ease-in-out 300ms forwards;
		@apply fixed top-0 left-0 z-30 h-full w-full bg-black-300;
	}

	@keyframes slide-x-out {
		from {
			transform: translateX(0%);
		}

		to {
			transform: translateX(-100%);
		}
	}
</style>

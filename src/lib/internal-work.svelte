<script lang="ts">
	import { isInternalWorkOpen } from './store';
	import { fade } from 'svelte/transition';
	import DragCursor from './drag-cursor.svelte';
	import type { Spring, Tweened } from 'svelte/motion';
	import InternalDesktop from './internal-desktop.svelte';
	import InternalMobile from './internal-mobile.svelte';

	const onClose = () => ($isInternalWorkOpen = false);
	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key !== 'Escape') return;
		$isInternalWorkOpen = false;
	};

	let pos: Spring<{ x: number; y: number }>;
	let scale: Tweened<number>;
	let opacity: Tweened<number>;

	let shouldShowCursor = false;
	$: if ($isInternalWorkOpen) {
		setTimeout(() => {
			shouldShowCursor = true;
		}, 800);
	} else {
		shouldShowCursor = false;
	}

	let windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} on:keyup={onKeyUp} />

{#if $isInternalWorkOpen}
	{#if shouldShowCursor && pos && opacity && scale}
		<DragCursor zIndex={30} {pos} {opacity} {scale} />
	{/if}

	<section
		transition:fade={{ duration: 250 }}
		class="fixed top-0 left-0 z-20 grid h-full w-full grid-rows-[max-content,1fr,max-content] gap-8 overflow-y-auto bg-black-300 text-pink-300 md:grid-rows-[max-content,1fr,50px]"
	>
		{#if windowWidth > 768}
			<InternalDesktop bind:pos bind:scale bind:opacity on:click={onClose} />
		{:else}
			<InternalMobile on:click={onClose} />
		{/if}
	</section>
{/if}

<style>
	section::before {
		content: '';
		animation: slide-x-out 500ms ease-in-out 300ms forwards;
		@apply fixed top-0 left-0 z-30 hidden h-full w-full bg-black-300;
	}

	@media (min-width: 768px) {
		section::before {
			display: block;
		}
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

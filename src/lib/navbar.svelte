<script lang="ts">
	import NavbarLogo from './navbar-logo.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { isInternalWorkOpen } from './store';

	let direction: 'up' | 'down' = 'up';
	let previouseScrollValue = 0;
	let isTop = true;

	const onButonClick = () => {
		$isInternalWorkOpen = true;
	};

	const onScroll = () => {
		isTop = window.scrollY === 0;
		direction = previouseScrollValue > window.scrollY ? 'up' : 'down';
		previouseScrollValue = window.scrollY;
	};

	onMount(() => {
		previouseScrollValue = window.scrollY;
	});
</script>

<svelte:window on:scroll={onScroll} />

{#if direction === 'up'}
	<nav
		transition:fly={{ y: -120 }}
		class="fixed top-0 left-0 z-20 grid w-full grid-cols-[1fr,1fr] gap-[60px] px-5 py-6 text-white-full transition-colors duration-[250ms] md:grid-cols-[max-content,1fr,repeat(6,max-content),1fr] md:px-20 md:py-[50px]"
		class:scrolled-nav={!isTop}
	>
		<NavbarLogo --width="" --height="" />

		<a class="hidden justify-self-end md:block" href="/">Work</a>
		<a class="hidden md:block" href="/">About</a>
		<a class="hidden md:block" href="/">News</a>
		<a class="hidden md:block" href="/">Thinking</a>
		<a class="hidden md:block" href="/">Pledge</a>
		<a class="hidden md:block" href="/">Careers</a>
		<a class="hidden md:block" href="/">Contact</a>

		<button on:click={onButonClick} class="col-start-[-2] col-end-[-1] justify-self-end">
			<p class="uppercase md:hidden">menu</p>
			<svg
				class="hidden w-[22px] md:block"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 21 5"
			>
				<circle cx="2.5" cy="2.5" r="2.5" />
				<circle cx="10.5" cy="2.5" r="2.5" />
				<circle cx="18.5" cy="2.5" r="2.5" />
			</svg>
		</button>
	</nav>
{/if}

<style>
	a {
		@apply text-[14px] font-medium uppercase;
		background-image: linear-gradient(white, white);
		background-position: left bottom;
		background-size: 0% 1px;
		background-repeat: no-repeat;
		background-size: 0% 1px;
		background-position: right bottom;
		transition: background-size 250ms ease-in-out;
	}

	a:hover {
		background-size: 100% 1px;
		background-position: left bottom;
	}

	a::selection {
		@apply bg-white-full;
	}

	.scrolled-nav {
		@apply noise-bg text-black-full;
	}

	:global(.dark) .scrolled-nav {
		background: url(/noise.png) theme('colors.black.300');
		@apply text-white-full;
	}

	.scrolled-nav a {
		background-image: linear-gradient(theme('colors.black.full'), theme('colors.black.full'));
	}
</style>

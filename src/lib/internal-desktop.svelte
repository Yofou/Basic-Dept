<script lang="ts">
	import type { Spring, Tweened } from 'svelte/motion';
	import InternalWorkXicon from './internal-work-xicon.svelte';
	import InternalCarousel from './internal-carousel.svelte';

	export let pos: Spring<{ x: number; y: number }>;
	export let scale: Tweened<number>;
	export let opacity: Tweened<number>;
</script>

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
		on:click
	>
		<InternalWorkXicon />
	</button>
</nav>

<InternalCarousel bind:pos bind:scale bind:opacity />

<footer
	class="flex w-full justify-between px-20 text-[14px] font-medium tracking-tight text-[#5e5e5e]"
>
	<h1>BASIC/DEPT®, inc</h1>
	<p>10 - 22©</p>
</footer>

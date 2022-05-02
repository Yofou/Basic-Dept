<script lang="ts">
	import { fade } from 'svelte/transition';

	export let src: string;
	export let href = '/';
	export let title: string;
	export let under: string;
	export let year: number;
	export let description = '';

	const fadeOptions = { duration: 250 };
	let isHovering = false;
	const onMouseEnter = () => (isHovering = true);
	const onMouseLeave = () => (isHovering = false);
</script>

<div
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	class="group relative px-[10px] border-l border-pink-300 last-of-type:border-x"
>
	<div class="w-full overflow-hidden">
		<img
			class="h-full w-full scale-110 object-cover object-center transition-transform group-hover:scale-100"
			{src}
			alt=""
		/>
	</div>

	<div class="grid overflow-hidden grid-cols-2 grid-flow-row font-bold auto-rows-[max-content] duration-[250ms] w-full h-[150px] group-hover:h-[250px] absolute bottom-0 left-0 transition-[height] bg-black-300 p-5 px-[30px]">
		<h1 class="uppercase text-[22px] tracking-tight">{title}</h1>
		<p class="justify-self-end mb-1 uppercase tracking-tight text-[22px]">{year}</p>
		<p class="mb-5 col-span-2 uppercase text-[12px] font-normal">{under}</p>

		{#if isHovering}
			<p transition:fade={fadeOptions} class="col-span-2 mb-2 text-[12px] font-normal">{description}</p>
			<a transition:fade={fadeOptions} class="col-span-2 cursor-none text-[14px] font-medium underline" {href}>Visit the site</a>
		{/if}
	</div>
</div>

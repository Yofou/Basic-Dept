<script lang="ts">
	import { fade } from "svelte/transition";

	export let src: string;
	export let href = '/';
	export let title: string;
	export let under: string;
	export let year: number;
	export let description = '';

	const id = title.split(' ').join('');
	const fadeOptions = { duration: 250 };
	let isHovering = false;
	const onMouseEnter = () => (isHovering = true);
	const onMouseLeave = () => (isHovering = false);
</script>

<div
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	class="group relative border-l border-pink-300 px-[10px] last-of-type:border-x"
>
	<div class="w-full overflow-hidden">
		<img
			class="h-full w-full scale-110 object-cover object-center transition-transform group-hover:scale-100"
			{src}
			alt=""
		/>
	</div>

	<div
		class="absolute bottom-0 left-0 grid h-[250px] w-full grid-flow-row auto-rows-[max-content] translate-y-[100px] group-hover:translate-y-0 duration-[250ms] transition-transform grid-cols-2 overflow-hidden bg-black-300 p-5 px-[30px] font-bold"
	>
		<h1 class="text-[22px] uppercase tracking-tight">{title}</h1>
		<p class="mb-1 justify-self-end text-[22px] uppercase tracking-tight">
			{year}
		</p>
		<p class="col-span-2 mb-5 text-[12px] font-normal uppercase">{under}</p>

		{#if isHovering}
			<p transition:fade={fadeOptions} class="col-span-2 mb-2 text-[12px] font-normal">
				{description}
			</p>
			<a transition:fade={fadeOptions} class="col-span-2 cursor-none text-[14px] font-medium underline" {href}>Visit the site</a>
		{/if}
	</div>
</div>

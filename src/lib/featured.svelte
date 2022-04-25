<script lang="ts">
	import embla from 'svelte-embla';
	import cursor from '$lib/cursor';
	import FeatureCard from './feature-card.svelte';
	import { spring, tweened } from 'svelte/motion';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let resting = { x: 0, y: 0 };
	let carousel: HTMLDivElement;
	const pos = spring(resting, { damping: 1, stiffness: 0.4 });
	const scale = tweened(1, { duration: 100 });
	const isMouseOver = writable(false);

	const onMouseDown = () => ($scale = 0.6);
	const onMouseUp = () => ($scale = 1);

	onMount(() => {
		const rect = carousel.getBoundingClientRect();
		resting.x = carousel.offsetLeft + rect.width - 60;
		resting.y = carousel.offsetTop + 60 + 375
	});

	$: if (!$isMouseOver) {
		$pos = resting;
	}
</script>

<section class="mt-[188px]">
	<h1
		class="max-w-[8ch] text-[42px] font-bold uppercase leading-[1.1] tracking-tighter text-black-300"
	>
		Featured Engagements
	</h1>

	<div
		class="w-full cursor-none overflow-hidden py-[180px]"
		bind:this={carousel}
		use:cursor={{ pos, isMouseOver }}
		use:embla={{ skipSnaps: false, dragFree: true, align: 'start', containScroll: 'keepSnaps' }}
		on:mousedown={onMouseDown}
		on:mouseup={onMouseUp}
	>
		<div class="height-[445px] grid auto-cols-[432px] grid-flow-col gap-[144px] pl-[144px]">
			<FeatureCard company="google" src="/google.svg" imgWidth="120px">
				Our embedded partnership with Google is as deep as it gets. We’re the lead creative
				agency for Google Store and provide strategy, design, and prototyping to other
				divisions. Learn more about our partnership
				<a class="underline" href="/">here</a>.
			</FeatureCard>

			<FeatureCard company="KFC" src="/kfc.svg" imgWidth="120px">
				An award-winning global, digital transformation engagement spanning eCommerce,
				mobile app, and new drive thru experiences. Bringing KFC’s brand story to life while
				making it easier for customers to buy chicken. Learn more about our partnership
				<a class="underline" href="/">here</a>.
			</FeatureCard>

			<FeatureCard company="wilson" src="/wilson.svg" imgWidth="162px">
				A reimagining of Wilson’s brand visual identity, and brand campaign, to support a
				new product drop and the launch of the first brick and mortar retail location in the
				brand’s 108-year history. Read our full case study
				<a class="underline" href="/">here</a>.
			</FeatureCard>

			<FeatureCard company="at&t" src="/at.svg" imgWidth="40px">
				Redesigning the digital flagship for the largest telecommunications company in the
				world. Creating frictionless paths to purchase for a wide range of consumers across
				a vast portfolio of products and services.
				<a class="underline" href="/">here</a>.
			</FeatureCard>

			<FeatureCard company="patagonia" src="/patagonia.svg" imgWidth="180px">
				Our embedded partnership with Google is as deep as it gets. We’re the lead creative
				agency for Google Store and provide strategy, design, and prototyping to other
				divisions. Learn more about our partnership
				<a class="underline" href="/">here</a>.
			</FeatureCard>
		</div>
	</div>

	<div
		class="pointer-events-none absolute top-0 left-0 grid h-[120px] w-[120px] translate-y-[calc(var(--y,0)-50%)] translate-x-[calc(var(--x,0)-50%)] scale-[var(--scale,1)] place-items-center rounded-full bg-pink-300"
		style:--x="{$pos.x}px"
		style:--y="{$pos.y}px"
		style:--scale={$scale}
	>
		{#if $scale === 1}
			<p
				transition:fade={{ duration: 150 }}
				class="text-[14px] font-medium uppercase tracking-tighter"
			>
				drag
			</p>
		{/if}
	</div>
</section>

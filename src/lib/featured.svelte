<script lang="ts">
	import embla from 'svelte-embla';
	import cursor from '$lib/actions/cursor';
	import FeatureCard from './feature-card.svelte';
	import { spring, tweened } from 'svelte/motion';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	import DragCursor from './drag-cursor.svelte';

	let resting = { x: 0, y: 0 };
	let carousel: HTMLDivElement;
	const pos = spring(resting, { damping: 1, stiffness: 0.4 });
	const scale = tweened(1, { duration: 100 });
	const opacity = tweened(1, { duration: 100 });
	const isMouseOver = writable(false);
	const scroll = writable<EmblaCarouselType>();

	const onMouseDown = () => ($scale = 0.6);
	const onMouseUp = () => ($scale = 1);

	const onHyperOver = (event: MouseEvent) => {
		if (event.target instanceof HTMLAnchorElement) {
			$opacity = 0.85;
		} else {
			$opacity = 1;
		}
	};

	let scrollprogress = 0;
	const onScroll = () => {
		scrollprogress = $scroll?.scrollProgress() ?? 0;
	};

	let scrollbar = { width: 0 };
	onMount(() => {
		const rect = carousel.getBoundingClientRect();
		resting.x = rect.left + rect.width - 60;
		resting.y = rect.top + document.documentElement.scrollTop + 60 + 375;

		scrollbar.width = (rect.width / carousel.scrollWidth) * rect.width;
	});

	const onSettle = () => ($scale = 1);
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
		class="w-full cursor-none overflow-hidden pt-[180px] pb-[120px]"
		bind:this={carousel}
		use:cursor={{ pos, isMouseOver }}
		use:embla={{
			skipSnaps: false,
			dragFree: true,
			align: 'start',
			containScroll: 'keepSnaps',
			store: scroll
		}}
		on:mousedown={onMouseDown}
		on:mouseup={onMouseUp}
		on:e-settle={onSettle}
		on:e-scroll={onScroll}
	>
		<div
			on:focus
			on:mouseover={onHyperOver}
			class="height-[445px] grid auto-cols-[432px] grid-flow-col gap-[144px] pl-[144px]"
		>
			<FeatureCard company="google" src="/google.svg" imgWidth="120px">
				Our embedded partnership with Google is as deep as it gets. We’re the lead creative agency
				for Google Store and provide strategy, design, and prototyping to other divisions. Learn
				more about our partnership
				<a class="cursor-none underline" href="/">here</a>.
			</FeatureCard>

			<FeatureCard company="KFC" src="/kfc.svg" imgWidth="120px">
				An award-winning global, digital transformation engagement spanning eCommerce, mobile app,
				and new drive thru experiences. Bringing KFC’s brand story to life while making it easier
				for customers to buy chicken. Learn more about our partnership
				<a class="underline" href="/">here</a>.
			</FeatureCard>

			<FeatureCard company="wilson" src="/wilson.svg" imgWidth="162px">
				A reimagining of Wilson’s brand visual identity, and brand campaign, to support a new
				product drop and the launch of the first brick and mortar retail location in the brand’s
				108-year history. Read our full case study
				<a class="cursor-none underline" href="/">here</a>.
			</FeatureCard>

			<FeatureCard company="at&t" src="/at.svg" imgWidth="40px">
				Redesigning the digital flagship for the largest telecommunications company in the world.
				Creating frictionless paths to purchase for a wide range of consumers across a vast
				portfolio of products and services.
				<a class="cursor-none underline" href="/">here</a>.
			</FeatureCard>

			<FeatureCard company="patagonia" src="/patagonia.svg" imgWidth="180px">
				Our embedded partnership with Google is as deep as it gets. We’re the lead creative agency
				for Google Store and provide strategy, design, and prototyping to other divisions. Learn
				more about our partnership
				<a class="cursor-none underline" href="/">here</a>.
			</FeatureCard>
		</div>
	</div>

	<DragCursor {pos} {opacity} {scale} />

	<div class="h-[2px] w-full overflow-hidden bg-[#b1b1b1]">
		<div
			class="h-full w-[var(--scroll-width,0px)] translate-x-[var(--scroll-progress,0)] bg-black-full dark:bg-pink-300"
			style:--scroll-width="{scrollbar.width}px"
			style:--scroll-progress="{scrollprogress * (carousel?.clientWidth - scrollbar.width)}px"
		/>
	</div>
</section>

<script>
	import Button from '$lib/button.svelte';
	import isInView from '$lib/actions/is-in-view';
	import { isDark } from '$lib/store';
</script>

<section
	class="mt-[60px] grid grid-cols-1 grid-rows-[repeat(2,max-content)] gap-y-[50px] md:mt-[180px] md:grid-cols-2 md:grid-rows-[1181px]"
	use:isInView
>
	<h1 class="sr-only">BASIC/DEPT® HELPS BRANDS ●CONNECT W/ CULTURE</h1>

	<div class="relative h-full w-full dark:text-pink-300">
		<div class="flex w-full flex-col items-start gap-2 md:sticky md:top-[120px] md:left-0">
			<h1 class="text-[6.25vw] font-bold leading-[1.01]">
				BASIC/DEPT® HELPS BRANDS ●CONNECT W/ CULTURE
			</h1>

			<p>
				ADWEEK <span class="font-medium">(AGENCY SPOTLIGHT)</span>
			</p>
			<Button class="mt-5 md:mt-20" --color={$isDark ? '#f9cdcd' : 'black'} --hover-color="white"
				>About Us</Button
			>
		</div>
	</div>

	<video class="row-start-1 h-full object-cover md:row-start-auto" autoplay muted loop>
		<source src="/Culture-Loop_v1.mp4" type="video/mp4" />
	</video>
</section>

<script>
	import Button from './button.svelte';
	import isInView from './is-in-view';
	import { isDark } from './store';
</script>

<section class="mt-[180px] grid grid-cols-2 grid-rows-[1181px]" use:isInView>
	<h1 class="sr-only">BASIC/DEPT® HELPS BRANDS ●CONNECT W/ CULTURE</h1>

	<div class="relative h-full w-full dark:text-pink-300">
		<div class="sticky top-[120px] left-0 flex w-full flex-col items-start gap-2">
			<h1 class="text-[6.25vw] font-bold leading-[1.01]">
				BASIC/DEPT® HELPS BRANDS ●CONNECT W/ CULTURE
			</h1>

			<p>
				ADWEEK <span class="font-medium">(AGENCY SPOTLIGHT)</span>
			</p>
			<Button class="mt-20" --color={$isDark ? '#f9cdcd' : 'black'} --hover-color="white"
				>About Us</Button
			>
		</div>
	</div>

	<video autoplay muted loop>
		<source src="/Culture-Loop_v1.mp4" type="video/mp4" />
	</video>
</section>

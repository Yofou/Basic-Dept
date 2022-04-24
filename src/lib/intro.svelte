<script>
	import IntroLogo from './intro-logo.svelte';
</script>

<header class="fixed grid place-items-center top-0 left-0 w-full h-full z-[999] bg-white-full noise-bg slide-out" style:--animation-delay="1s">
	<div class="slide-out" style:--slide-height="243px" style:--animation-delay="0s">
		<IntroLogo />
	</div>
</header>

<style>
	.slide-out {
		overflow: hidden;
		animation: slide-out 0.5s ease-in-out;
		animation-fill-mode: forwards;
		animation-delay: var(--animation-delay, 0s);
	}

	@keyframes slide-out {
		from {
			height: var(--slide-height, 100%);
		}
		to {
			height: 0px;
		}
	}
</style>

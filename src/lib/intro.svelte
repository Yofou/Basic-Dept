<script>
	import IntroLogo from './intro-logo.svelte';
</script>

<header
	class="slide-out noise-bg fixed top-0 left-0 z-[999] grid h-full w-full place-items-center text-3xl"
	style:--animation-delay="1s"
>
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

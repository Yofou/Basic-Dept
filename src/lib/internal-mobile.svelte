<script lang="ts">
	import { onMount } from 'svelte';
	import InternalWorkXicon from './internal-work-xicon.svelte';
	import NavbarLogo from './navbar-logo.svelte';

	onMount(() => {
		document.body.classList.add('overflow-y-hidden');
		return () => {
			document.body.classList.remove('overflow-y-hidden');
		};
	});
</script>

<nav class="flex items-center justify-between px-5 py-5">
	<NavbarLogo />
	<button on:click class="grid place-content-center rounded-full border border-pink-300 p-2">
		<InternalWorkXicon />
	</button>
</nav>

<div class="mt-1 flex flex-col gap-4 px-5">
	<a href="/">work</a>
	<a href="/">about</a>
	<a href="/">news</a>
	<a href="/">thinking</a>
	<a href="/">pledge</a>
	<a href="/">careers</a>
	<a href="/">contact</a>
</div>

<footer
	class="flex w-full justify-between px-5 py-5 text-[14px] font-medium tracking-tight text-[#5e5e5e]"
>
	<h1>BASIC/DEPT®, inc</h1>
	<p>10 - 22©</p>
</footer>

<style>
	div a {
		@apply text-[1.4rem] font-bold uppercase tracking-tighter;
	}
</style>

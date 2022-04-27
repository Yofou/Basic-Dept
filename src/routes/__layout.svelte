<script>
	import { browser } from '$app/env';
	import Intro from '$lib/intro.svelte';
	import Navbar from '$lib/navbar.svelte';
	import '$style/global.css';
	import { isDark } from '$lib/store';

	$: if (browser) {
		if ($isDark) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}
</script>

<svelte:head>
	<title>BASIC | Digital Branding & Experience Design Agency</title>
</svelte:head>

<Intro />
<Navbar />
<slot />

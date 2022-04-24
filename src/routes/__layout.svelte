<script>
	import Intro from '$lib/intro.svelte';
	import Navbar from '$lib/navbar.svelte';
	import '$lib/shared/global.css';
</script>

<svelte:head>
	<title>BASIC | Digital Branding & Experience Design Agency</title>
</svelte:head>

<Intro />
<Navbar />
<slot />
